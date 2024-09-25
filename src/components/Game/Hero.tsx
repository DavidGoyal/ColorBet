"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import axios, { AxiosError } from "axios";
import { Princess_Sofia } from "next/font/google";
import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const PrincessSofia = Princess_Sofia({
	subsets: ["latin"],
	weight: ["400"],
});

const Hero = () => {
	const [bet, setBet] = useState("2X");
	const [amount, setAmount] = useState("");
	const [color, setColor] = useState("");
	const [paying, setPaying] = useState(false);
	const [solPrice, setSolPrice] = useState(0);

	const { connection } = useConnection();
	const wallet = useWallet();
	const { toast } = useToast();

	const handleClick = async () => {
		if (!color) {
			return toast({ variant: "destructive", title: "Please select a color" });
		}
		if (!amount) {
			return toast({ variant: "destructive", title: "Please enter an amount" });
		}
		if (amount < (1 / solPrice).toPrecision(4).toString()) {
			return toast({
				variant: "destructive",
				title: `Amount must be greater than ${(1 / solPrice)
					.toPrecision(4)
					.toString()} SOL`,
			});
		}
		if (!wallet.publicKey) {
			return toast({
				variant: "destructive",
				title: "Please connect your wallet",
			});
		}

		setPaying(true);

		try {
			const balance = await connection.getBalance(wallet.publicKey);
			const requiredLamports = Number(amount) * LAMPORTS_PER_SOL;

			if (balance < requiredLamports) {
				return toast({
					variant: "destructive",
					title: "Insufficient funds in the wallet",
				});
			}

			const transaction = new Transaction();
			transaction.add(
				SystemProgram.transfer({
					fromPubkey: wallet.publicKey,
					toPubkey: new PublicKey(process.env.NEXT_PUBLIC_PUBLIC_KEY as string),
					lamports: requiredLamports,
				})
			);

			const {
				context: { slot: minContextSlot },
				value: { blockhash, lastValidBlockHeight },
			} = await connection.getLatestBlockhashAndContext();

			const signature = await wallet.sendTransaction(transaction, connection, {
				minContextSlot,
			});

			await connection.confirmTransaction({
				blockhash,
				lastValidBlockHeight,
				signature,
			});

			const senderPublicKey = wallet.publicKey.toString();
			const response = await axios.post("/api/getResult", {
				color,
				bet,
				amount,
				wallet: senderPublicKey,
				signature,
				solPrice,
			});

			const won = response.data.won;
			setPaying(false);

			return toast({
				variant: won ? "default" : "destructive",
				title: won ? "Congratulations you have won" : "You have lost",
			});
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				if (error.message.includes("Insufficient funds")) {
					return toast({
						variant: "destructive",
						title: "Transaction failed: Insufficient funds in the wallet",
					});
				} else {
					return toast({
						variant: "destructive",
						title: `Transaction failed: ${error.response!.data.message}`,
					});
				}
			} else {
				return toast({
					variant: "destructive",
					title: `Transaction failed due to an unknown error. ${error}`,
				});
			}
		} finally {
			setPaying(false);
			setColor("");
			setAmount("");
		}
	};

	useEffect(() => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
			)
			.then((res) => setSolPrice(res.data.solana.usd))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="bg-[url('../assets/HeroImage.png')] min-h-screen w-full bg-center bg-auto bg-no-repeat flex justify-center items-center flex-col p-4 gap-16 relative">
			<h1 className="text-4xl sm:text-6xl font-bold text-white text-center mt-[10rem]">
				<span
					className={`${PrincessSofia.className} princess-sofia-regular text-6xl sm:text-7xl`}
				>
					Choose
				</span>{" "}
				Your Color
			</h1>
			<div className="flex flex-col md:flex-row gap-16 items-center">
				<div className="flex flex-col items-center gap-4">
					<div
						className="h-[8rem] w-[12rem] rounded-xl bg-red-600 cursor-pointer"
						style={{
							border: color === "red" ? "4px solid" : "none",
							borderColor: color === "red" ? "white" : "initial",
						}}
						onClick={() => setColor("red")}
					/>
					<p>Red</p>
				</div>
				<div className="flex flex-col items-center gap-4">
					<div
						className="h-[8rem] w-[12rem] rounded-xl bg-blue-600 cursor-pointer"
						style={{
							border: color === "blue" ? "4px solid" : "none",
							borderColor: color === "blue" ? "white" : "initial",
						}}
						onClick={() => setColor("blue")}
					/>
					<p>Blue</p>
				</div>
				<div className="flex flex-col items-center gap-4">
					<div
						className="h-[8rem] w-[12rem] rounded-xl bg-purple-600 cursor-pointer"
						style={{
							border: color === "purple" ? "4px solid" : "none",
							borderColor: color === "purple" ? "white" : "initial",
						}}
						onClick={() => setColor("purple")}
					/>
					<p>Purple</p>
				</div>
			</div>

			<div className="flex  gap-16 items-center w-[80%] md:w-[30%] justify-between">
				<select
					name="Bet"
					id="bet"
					className="w-[8rem] h-[4rem] rounded-xl bg-gradient-to-r from-[#3B3B2C] to-[#422E2C] flex justify-center items-center border-[2px] border-white text-center"
					value={bet}
					onChange={(e) => setBet(e.target.value)}
				>
					<option value="2X" className="text-black">
						2X
					</option>
					<option value="3X" className="text-black">
						3X
					</option>
					<option value="5X" className="text-black">
						5X
					</option>
					<option value="7X" className="text-black">
						7X
					</option>
					<option value="10X" className="text-black">
						10X
					</option>
				</select>

				<input
					className="w-[8rem] h-[4rem] rounded-xl bg-gradient-to-r from-[#3B3B2C] to-[#422E2C] flex justify-center items-center border-[2px] border-white text-center"
					value={amount}
					placeholder="Amount"
					type="number"
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>

			<button
				className="w-[12rem] h-[4rem] place-bet rounded-xl"
				onClick={handleClick}
				disabled={paying}
			>
				Place Your Bet
			</button>

			<Dialog open={paying}>
				<DialogContent className="bg-black h-[40%] w-[80%] md:w-[40%] rounded-xl">
					<DialogHeader className="flex flex-col justify-between items-center">
						<DialogTitle>Processing Transaction</DialogTitle>
						<DialogDescription className="flex justify-center items-center">
							{/* Use relative units for the loader */}
							<div className="loader border-t-transparent border-white border-4 rounded-full h-[15vw] w-[15vw] max-h-[200px] max-w-[200px] md:h-[10vw] md:w-[10vw] animate-spin" />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Hero;
