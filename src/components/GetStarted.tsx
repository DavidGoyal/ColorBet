"use client";

import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React from "react";

const GetStarted = () => {
	const wallet = useWallet();
	const { toast } = useToast();
	const router = useRouter();
	return (
		<button
			className="bg-white text-black px-4 py-3 rounded-lg font-semibold"
			onClick={() => {
				if (!wallet.connected) {
					return toast({
						variant: "destructive",
						title: "Connect your wallet to play",
					});
				}
				router.push("/game");
			}}
		>
			Get Started <span>→</span>
		</button>
	);
};

export default GetStarted;
