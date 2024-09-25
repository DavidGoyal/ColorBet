import Header from "@/components/Game/Header";
import Hero from "@/components/Game/Hero";
import PreviousTransactions from "@/components/Game/PreviousTransactions";
import React from "react";

const page = () => {
	return (
		<div className="min-h-screen w-screen max-w-[100%]">
			<Header />
			<Hero />
			<PreviousTransactions />
		</div>
	);
};

export default page;
