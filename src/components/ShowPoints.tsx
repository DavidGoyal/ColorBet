"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import img from "@/assets/points.png";
import { getUser } from "@/app/action/getPoints";

export default function ShowPoints() {
	const { publicKey } = useWallet();
	const { connection } = useConnection();
	const [points, setPoints] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const delayBeforeRedirect = setTimeout(async () => {}, 2000);
		async function getPoints() {
			try {
				const user = await getUser(publicKey!.toString());
				setPoints(user?.points || 0);
			} catch (error) {
				console.error("Failed to fetch points", error);
			} finally {
				setLoading(false);
			}
		}

		if (publicKey) {
			getPoints();
		}

		return () => clearTimeout(delayBeforeRedirect);
	}, [connection, publicKey]);

	return loading ? (
		<Skeleton className="w-[120px] h-[40px] rounded-full bg-gray-200" />
	) : (
		<div className="flex items-center rounded-full border-[1px] border-white px-4 py-1">
			<Image src={img} alt="logo" className="w-10 h-10 pt-[0.2rem]" />
			<p className="text-xl">{points}</p>
		</div>
	);
}
