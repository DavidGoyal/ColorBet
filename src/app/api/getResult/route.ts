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

		let UserWon = false;
		let outputColor;

		const colorArr = ["red", "blue", "purple", "green"];

		const transactions = await prisma.transaction.findMany({
			where: {
				walletAddress: wallet,
				createdAt: {
					gte: new Date(Date.now() - 1000 * 60 * 10),
				},
				won: true,
			},
		});

		if (transactions.length == 3) {
			UserWon = false;
			outputColor = colorArr[colorArr.findIndex((colors) => colors !== color)];
		} else {
			if (
				amount <= Number((1 / solPrice).toPrecision(4)) * 3 &&
				(bet === "2X" || bet === "3X")
			) {
				const firstAnswer = Math.round(Math.random() * 1);

				if (firstAnswer === 0) {
					UserWon = true;
					outputColor = color;
				} else {
					UserWon = false;
					outputColor =
						colorArr[colorArr.findIndex((colors) => colors !== color)];
				}
			} else if (amount <= Number((1 / solPrice).toPrecision(4)) * 5) {
				const firstAnswer = Math.round(Math.random() * 3);
				const index = colorArr.findIndex((colors) => colors === color);

				if (firstAnswer === index) {
					UserWon = true;
					outputColor = color;
				} else {
					UserWon = false;
					outputColor = colorArr[firstAnswer];
				}
			} else if (amount <= Number((1 / solPrice).toPrecision(4)) * 10) {
				const firstAnswer = Math.round(Math.random() * 1);
				const secondAnswer = Math.round(Math.random() * 1);
				const thirdAnswer = Math.round(Math.random() * 1);

				const index = colorArr.findIndex((colors) => colors === color);

				if (index === 0) {
					if (firstAnswer === 0) {
						UserWon = true;
						outputColor = color;
					} else {
						UserWon = false;
						if (secondAnswer === 0) {
							outputColor = colorArr[1];
						} else if (secondAnswer === 1 && thirdAnswer === 0) {
							outputColor = colorArr[2];
						} else {
							outputColor = colorArr[3];
						}
					}
				} else if (index === 1) {
					if (firstAnswer === 1 && secondAnswer === 0) {
						UserWon = true;
						outputColor = color;
					} else {
						UserWon = false;
						if (firstAnswer === 0) {
							outputColor = colorArr[0];
						} else if (secondAnswer === 1 && thirdAnswer === 0) {
							outputColor = colorArr[2];
						} else {
							outputColor = colorArr[3];
						}
					}
				} else if (index === 2) {
					if (firstAnswer === 1 && secondAnswer === 1 && thirdAnswer === 0) {
						UserWon = true;
						outputColor = color;
					} else {
						UserWon = false;
						if (firstAnswer === 0) {
							outputColor = colorArr[0];
						} else if (firstAnswer === 1 && secondAnswer === 0) {
							outputColor = colorArr[1];
						} else {
							outputColor = colorArr[3];
						}
					}
				} else if (index === 3) {
					if (firstAnswer === 1 && secondAnswer === 1 && thirdAnswer === 1) {
						UserWon = true;
						outputColor = color;
					} else {
						UserWon = false;
						if (firstAnswer === 0) {
							outputColor = colorArr[0];
						} else if (firstAnswer === 1 && secondAnswer === 0) {
							outputColor = colorArr[1];
						} else {
							outputColor = colorArr[2];
						}
					}
				}
			} else if (
				amount > Number((1 / solPrice).toPrecision(4)) * 10 &&
				amount <= Number((1 / solPrice).toPrecision(4)) * 20
			) {
				const initialCheck = Math.round(Math.random() * 1);
				const firstAnswer = Math.round(Math.random() * 1);
				const secondAnswer = Math.round(Math.random() * 1);
				const thirdAnswer = Math.round(Math.random() * 1);

				const index = colorArr.findIndex((colors) => colors === color);

				if (initialCheck === 0) {
					UserWon = false;
					outputColor =
						colorArr[colorArr.findIndex((colors) => colors !== color)];
				} else {
					if (index === 0) {
						if (firstAnswer === 0) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (secondAnswer === 0) {
								outputColor = colorArr[1];
							} else if (secondAnswer === 1 && thirdAnswer === 0) {
								outputColor = colorArr[2];
							} else {
								outputColor = colorArr[3];
							}
						}
					} else if (index === 1) {
						if (firstAnswer === 1 && secondAnswer === 0) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (firstAnswer === 0) {
								outputColor = colorArr[0];
							} else if (secondAnswer === 1 && thirdAnswer === 0) {
								outputColor = colorArr[2];
							} else {
								outputColor = colorArr[3];
							}
						}
					} else if (index === 2) {
						if (firstAnswer === 1 && secondAnswer === 1 && thirdAnswer === 0) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (firstAnswer === 0) {
								outputColor = colorArr[0];
							} else if (firstAnswer === 1 && secondAnswer === 0) {
								outputColor = colorArr[1];
							} else {
								outputColor = colorArr[3];
							}
						}
					} else if (index === 3) {
						if (firstAnswer === 1 && secondAnswer === 1 && thirdAnswer === 1) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (firstAnswer === 0) {
								outputColor = colorArr[0];
							} else if (firstAnswer === 1 && secondAnswer === 0) {
								outputColor = colorArr[1];
							} else {
								outputColor = colorArr[2];
							}
						}
					}
				}
			} else {
				const initialCheck = Math.round(Math.random() * 1);
				const secondCheck = Math.round(Math.random() * 1);
				const firstAnswer = Math.round(Math.random() * 1);
				const secondAnswer = Math.round(Math.random() * 1);
				const thirdAnswer = Math.round(Math.random() * 1);

				const index = colorArr.findIndex((colors) => colors === color);

				if (initialCheck === 0 || secondCheck === 0) {
					UserWon = false;
					outputColor =
						colorArr[colorArr.findIndex((colors) => colors !== color)];
				} else {
					if (index === 0) {
						if (firstAnswer === 0) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (secondAnswer === 0) {
								outputColor = colorArr[1];
							} else if (secondAnswer === 1 && thirdAnswer === 0) {
								outputColor = colorArr[2];
							} else {
								outputColor = colorArr[3];
							}
						}
					} else if (index === 1) {
						if (firstAnswer === 1 && secondAnswer === 0) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (firstAnswer === 0) {
								outputColor = colorArr[0];
							} else if (secondAnswer === 1 && thirdAnswer === 0) {
								outputColor = colorArr[2];
							} else {
								outputColor = colorArr[3];
							}
						}
					} else if (index === 2) {
						if (firstAnswer === 1 && secondAnswer === 1 && thirdAnswer === 0) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (firstAnswer === 0) {
								outputColor = colorArr[0];
							} else if (firstAnswer === 1 && secondAnswer === 0) {
								outputColor = colorArr[1];
							} else {
								outputColor = colorArr[3];
							}
						}
					} else if (index === 3) {
						if (firstAnswer === 1 && secondAnswer === 1 && thirdAnswer === 1) {
							UserWon = true;
							outputColor = color;
						} else {
							UserWon = false;
							if (firstAnswer === 0) {
								outputColor = colorArr[0];
							} else if (firstAnswer === 1 && secondAnswer === 0) {
								outputColor = colorArr[1];
							} else {
								outputColor = colorArr[2];
							}
						}
					}
				}
			}
		}

		await prisma.transaction.create({
			data: {
				transactionID: signature,
				walletAddress: wallet,
				betColor: color,
				won: UserWon,
				outcomeColor: outputColor,
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
				outcomeColor: outputColor,
			});
		} else {
			return Response.json({
				success: true,
				won: false,
				outcomeColor: outputColor,
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
