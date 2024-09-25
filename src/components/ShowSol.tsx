"use client";
import img from "@/assets/Vector.png";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ShowSol = () => {
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(true);
	const { connection } = useConnection();
	const { publicKey, connected } = useWallet();
	const router = useRouter();

	useEffect(() => {
		const delayBeforeRedirect = setTimeout(async () => {
			if (!publicKey && !connected) {
				router.replace("/");
			}
		}, 2000);

		async function getSolBalance() {
			if (publicKey && connection) {
				try {
					const solBalance = await connection.getBalance(publicKey);
					setBalance(solBalance / LAMPORTS_PER_SOL);
				} catch (error) {
					console.error("Failed to fetch balance", error);
				} finally {
					setLoading(false);
				}
			}
		}

		if (publicKey) {
			getSolBalance();
		}

		return () => clearTimeout(delayBeforeRedirect);
	}, [connection, publicKey, connected, router]);

	if (!publicKey) {
		return null;
	}

	return loading ? (
		<Skeleton className="w-[120px] h-[40px] rounded-full bg-gray-200" />
	) : (
		<div className="flex gap-2 items-center rounded-full border-[1px] border-white px-6 py-2">
			<Image src={img} alt="logo" className="w-6 h-6" />
			<p className="text-xl">{balance.toFixed(5)} SOL</p>
		</div>
	);
};

export default ShowSol;
