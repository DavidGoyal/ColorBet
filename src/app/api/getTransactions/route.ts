import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const transactions = await prisma.transaction.findMany({
			orderBy: {
				createdAt: "desc",
			},
			take: 10,
		});

		return Response.json(
			{
				success: true,
				data: transactions,
			},
			{
				status: 200,
				headers: {
					"Cache-Control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
	} catch {
		return Response.json(
			{
				success: false,
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
