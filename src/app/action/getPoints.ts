"use server";

import prisma from "@/lib/db";

export const getUser = async (walletAddress: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				walletAddress: walletAddress.toString(),
			},
		});

		return user;
	} catch {
		return null;
	}
};
