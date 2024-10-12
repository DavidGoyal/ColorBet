"use client";

import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getTransactions } from "@/app/action/getTransactions";

type Transaction = {
	transactionID: string;
	walletAddress: string;
	betColor: string;
	outcomeColor: string;
	won: boolean;
	id: number;
};

const PreviousTransactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const { toast } = useToast();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const transactions = await getTransactions();

				setTransactions(transactions);
			} catch {
				return toast({
					variant: "destructive",
					title: `Transactions fetching failed`,
				});
			}
		};
		fetchData();
	}, [toast]);

	return (
		<div className="w-full flex flex-col gap-16 p-4 sm:px-20">
			<h1 className="text-5xl font-bold text-center pt-40 mr-2">
				Previous Transactions
			</h1>

			<div className="previous-transactions w-full rounded-xl p-4">
				<Table className="overflow-x-auto">
					<TableHeader>
						<TableRow className="bg-black text-white hover:bg-black rounded-xl">
							<TableHead className="text-white font-semibold text-xl text-center">
								Record Number
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center w-[100px] text-wrap">
								Transaction ID
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center">
								Wallet Address
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center">
								Color Choosen
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center">
								Outcome Color
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center">
								Outcome
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.map((transaction) => (
							<TableRow key={transaction.id}>
								<TableCell className="font-medium text-center">
									{transaction.id}
								</TableCell>
								<TableCell
									className="text-center text-wrap cursor-pointer"
									onClick={() => {
										navigator.clipboard.writeText(transaction.transactionID);
										return toast({
											variant: "destructive",
											title: "Transaction ID copied to clipboard",
										});
									}}
								>
									{transaction.transactionID.slice(0, 17)}...
								</TableCell>
								<TableCell
									className="text-center text-wrap cursor-pointer"
									onClick={() => {
										navigator.clipboard.writeText(transaction.transactionID);
										return toast({
											variant: "destructive",
											title: "Wallet Address copied to clipboard",
										});
									}}
								>
									{transaction.walletAddress.slice(0, 15)}...
								</TableCell>
								<TableCell className="flex justify-center">
									<div
										className="h-[1rem] w-[1rem] rounded-full"
										style={{ background: transaction.betColor }}
									/>
								</TableCell>
								<TableCell>
									<div
										className="h-[1rem] w-[1rem] rounded-full mx-auto"
										style={{ background: transaction.outcomeColor }}
									/>
								</TableCell>
								<TableCell className="text-center">
									{transaction.won ? "Won" : "Lost"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default PreviousTransactions;
