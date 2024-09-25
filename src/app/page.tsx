import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Hero from "@/components/Home/Hero";
import React from "react";

const page = () => {
	return (
		<div className="min-h-screen w-screen max-w-[100%]">
			<Header />
			<Hero />
			<Features />
			<FAQ />
			<Footer />
		</div>
	);
};

export default page;
