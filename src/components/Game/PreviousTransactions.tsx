import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";

const PreviousTransactions = async () => {
	const transactions = await prisma.transaction.findMany({
		orderBy: {
			createdAt: "desc",
		},
		take: 10,
	});
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
							<TableHead className="text-white font-semibold text-xl text-center">
								Transaction ID
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center">
								Wallet Address
							</TableHead>
							<TableHead className="text-white font-semibold text-xl text-center">
								Color Choosen
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
								<TableCell className="text-center">
									{transaction.transactionID}
								</TableCell>
								<TableCell className="text-center">
									{transaction.walletAddress}
								</TableCell>
								<TableCell className="flex justify-center items-center">
									<div
										className="h-[1rem] w-[1rem] rounded-full"
										style={{ background: transaction.betColor }}
									></div>
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
