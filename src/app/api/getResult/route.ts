import prisma from "@/lib/db";
import { getTransactionDetails } from "@/lib/getTransactionDetails";
import {
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	sendAndConfirmTransaction,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { color, bet, amount, wallet, signature, solPrice } =
			await req.json();

		if (!color || !bet || !amount || !wallet || !signature || !solPrice) {
			return Response.json(
				{
					success: false,
					message: "Missing Parameters",
				},
				{ status: 400 }
			);
		}

		const { receiver, sender, transactionAmount } = await getTransactionDetails(
			signature
		);

		console.log(receiver, sender, transactionAmount);
		console.log(solPrice);

		if (
			sender !== wallet ||
			receiver !== process.env.NEXT_PUBLIC_PUBLIC_KEY ||
			!transactionAmount ||
			transactionAmount < Number((1 / solPrice).toPrecision(4))
		) {
			return Response.json(
				{
					success: false,
					message: "Invalid Signature",
				},
				{ status: 400 }
			);
		}

		const colorArr = ["red", "blue", "purple"];

		let UserWon = false;

		const firstAnswer = Math.round(Math.random() * 2);
		const secondAnswer = Math.round(Math.random() * 1);
		const thirdAnswer = Math.round(Math.random() * 1);
		const fourthAnswer = Math.round(Math.random() * 1);
		const fifthAnswer = Math.round(Math.random() * 1);
		console.log(
			firstAnswer,
			secondAnswer,
			thirdAnswer,
			fourthAnswer,
			fifthAnswer
		);

		if (colorArr[firstAnswer] !== color) {
			UserWon = false;
		} else if (bet === "2X" && secondAnswer === 0) {
			UserWon = true;
		} else if (secondAnswer === 0) {
		} else if (bet === "3X") {
			if (thirdAnswer === 0) {
				UserWon = true;
			}
		} else if (bet === "5X") {
			if (thirdAnswer === 0 || fourthAnswer === 1) {
			} else {
				UserWon = true;
			}
		} else if (bet === "7X") {
			if (thirdAnswer === 0 || fourthAnswer === 0 || fifthAnswer === 1) {
			} else {
				UserWon = true;
			}
		} else if (bet === "10X") {
			if (thirdAnswer === 0 || fourthAnswer === 0 || fifthAnswer === 0) {
			} else {
				UserWon = true;
			}
		}

		await prisma.transaction.create({
			data: {
				transactionID: signature,
				walletAddress: wallet,
				betColor: color,
				won: UserWon,
			},
		});
		if (UserWon) {
			const fromKeypair = Keypair.fromSecretKey(
				bs58.decode(process.env.PRIVATE_KEY as string)
			);
			const connection = new Connection(
				process.env.NEXT_PUBLIC_RPC_URL as string,
				"confirmed"
			);
			const transferTransaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: fromKeypair.publicKey,
					toPubkey: wallet,
					lamports:
						Number(amount) * Number(bet.split("X")[0]) * LAMPORTS_PER_SOL,
				})
			);
			await sendAndConfirmTransaction(connection, transferTransaction, [
				fromKeypair,
			]);

			return Response.json({
				success: true,
				won: true,
			});
		} else {
			return Response.json({
				success: true,
				won: false,
			});
		}
	} catch (error: unknown) {
		console.log(error);
		return Response.json(
			{
				success: false,
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
