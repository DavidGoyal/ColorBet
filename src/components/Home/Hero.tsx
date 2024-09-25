import React from "react";
import img from "@/assets/HeroBG.png";
import Image from "next/image";
import Link from "next/link";
import { Princess_Sofia } from "next/font/google";

const PrincessSofia = Princess_Sofia({
	subsets: ["latin"],
	weight: ["400"],
});

const Hero = () => {
	return (
		<div className="bg-[url('../assets/HeroImage.png')] h-screen w-full bg-center bg-auto bg-no-repeat flex justify-center items-center flex-col p-4 gap-4 relative">
			<h1 className="text-4xl sm:text-6xl font-bold text-white text-center">
				<span
					className={`${PrincessSofia.className} princess-sofia-regular text-6xl sm:text-7xl`}
				>
					Shine
				</span>{" "}
				Your Flairs <br /> Win Your <span className="text-[#89CF84]">Bets</span>
			</h1>
			<p className="text-xl text-white text-center">
				Pick a color, place your bet, and watch your Solana grow!
				<br /> Fast, secure, and powered by Solana—bet smart and win big.
				<br /> Select your color and let the game begin!
			</p>
			<Link
				href={"/game"}
				className="bg-white text-black px-4 py-3 rounded-lg font-semibold"
			>
				Get Started <span>→</span>
			</Link>
			<Image
				src={img}
				alt=""
				className="absolute top-[25%] left-0 hidden xl:block"
			/>
		</div>
	);
};

export default Hero;
