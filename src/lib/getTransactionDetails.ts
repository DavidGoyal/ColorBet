import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const getTransactionDetails = async (tx: string) => {
	const data = {
		method: "getTransaction",
		jsonrpc: "2.0",
		id: "1",
		params: [tx, { encoding: "jsonParsed", commitment: "confirmed" }],
	};

	try {
		// Fetch transaction details
		const response = await fetch(process.env.NEXT_PUBLIC_RPC_URL as string, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const json = await response.json();

		if (!json.result) {
			return {
				receiver: null,
				sender: null,
				transactionAmount: null,
				isRecent: false,
			};
		}
		console.log(1);

		const instructions = json.result.transaction.message.instructions;
		const blockTime = json.result.blockTime; // Unix timestamp of the block
		const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds

		// Check if the transaction happened less than half a minute ago
		const isRecent = blockTime && currentTime - blockTime < 30;

		console.log(isRecent);

		if (!isRecent) {
			return { receiver: null, sender: null, transactionAmount: null };
		}

		// Ensure there is a third instruction (index 2)
		if (instructions.length < 3) {
			return { receiver: null, sender: null, transactionAmount: null };
		}

		const instruction = instructions[2];

		// Ensure the instruction has the expected structure
		if (instruction.parsed?.info) {
			const { destination, source, lamports } = instruction.parsed.info;

			return {
				receiver: destination,
				sender: source,
				transactionAmount: lamports / LAMPORTS_PER_SOL,
			};
		}

		return { receiver: null, sender: null, transactionAmount: null };
	} catch {
		return { receiver: null, sender: null, transactionAmount: null };
	}
};
