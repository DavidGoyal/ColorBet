"use server";

import prisma from "@/lib/db";

export const getTransactions = async () => {
	try {
		const transactions = await prisma.transaction.findMany({
			orderBy: {
				createdAt: "desc",
			},
			take: 10,
		});

		return transactions;
	} catch {
		return [];
	}
};
