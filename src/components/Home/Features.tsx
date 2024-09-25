import Image, { StaticImageData } from "next/image";
import React from "react";
import img1 from "@/assets/PreviousTransactions.png";
import img2 from "@/assets/Wallet.png";
import img3 from "@/assets/Security.png";

const Features = () => {
	return (
		<div id="features" className="min-h-screen w-full flex flex-col gap-20 p-4">
			<h1 className="princess-sofia-regular text-5xl font-bold text-center pt-40">
				Features Out Of The Blue
			</h1>
			<div className="w-full flex flex-col gap-4">
				<FeaturesCard
					title="Track Your Records"
					points={[
						"View everyone's previous bets, winnings, and losses.",
						"Analyze your betting patterns and track your success over time.",
						"Each transaction record includes chosen color, outcome.",
						"Effortlessly browse through past bets with a clean and organized interface.",
					]}
					img={img1}
					color="blue"
				/>
				<FeaturesCard
					title="Solana Powered Transactions"
					points={[
						"Solana's high-speed blockchain ensures your transactions are processed quickly and securely.",
						"Enjoy minimal transaction fees, thanks to Solana's highly efficient network.",
						"Winning bets are instantly credited to your wallet without any delays.",
						"All transactions are recorded on the Solana blockchain, ensuring complete transparency and reliability.",
					]}
					img={img2}
					color="purple"
				/>
				<FeaturesCard
					title="User Friendly Interface"
					points={[
						"Place bets effortlessly with a simple and clear layout.",
						"Enjoy a smooth experience on any device—mobile, tablet, or desktop.",
						"Eye-catching graphics and clear buttons make betting easy and fun.",
						"Quickly connect your Solana wallet for hassle-free transactions.",
					]}
					img={img3}
					color="green"
				/>
			</div>
		</div>
	);
};

const FeaturesCard = ({
	title,
	points,
	img,
	color,
}: {
	title: string;
	points: string[];
	img: StaticImageData;
	color: string;
}) => (
	<div className="flex flex-col md:flex-row gap-12 sm:gap-8 lg:gap-[10rem] xl:gap-[18rem] p-8 rounded-lg features-card items-center mx-4">
		<div className="flex flex-col gap-4 w-full sm:w-4/5 md:w-2/5">
			<div className="space-y-4 relative">
				<h2 className="text-2xl font-semibold flex items-center space-x-2 mb-6">
					<span
						className="w-8 h-8 rounded-full flex items-center justify-center z-10"
						style={{ background: color }}
					>
						&#x25BC;
					</span>
					<span>{title}</span>
				</h2>
				<div
					className="absolute top-0 left-3 w-0.5 h-full"
					style={{ background: color }}
				/>
				<ul className="space-y-6 relative">
					{points.map((item, index) => (
						<li key={index} className="pl-12 relative ">
							<span
								className="absolute left-8 top-0.8 w-6 h-6 rounded-full flex justify-center items-center"
								style={{ background: color }}
							>
								&#x2714;
							</span>
							<span className="ml-4">{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
		<Image src={img} alt={title} />
	</div>
);

export default Features;
