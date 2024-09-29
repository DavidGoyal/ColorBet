"use client";

import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";

const WalletAdapterProvider = ({ children }: { children: React.ReactNode }) => {
	// You can also provide a custom RPC endpoint
	const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL as string, []);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={[]} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default WalletAdapterProvider;
