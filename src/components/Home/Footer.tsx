import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<div
			id="footer"
			className="footer min-h-[6rem] w-full flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-24 p-8"
		>
			<p className="text-xl font-bold text-white text-center">
				© 2024 Color Trading, Inc. All rights reserved.
			</p>

			<Link href="/terms" className="text-md font-bold text-white text-center">
				Terms Of Use
			</Link>

			<div className="flex flex-row gap-10">
				<a
					href="https://x.com/bet_color"
					target="_blank"
					rel="noreferrer"
					className="text-xl font-bold text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-twitter"
					>
						<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
					</svg>
				</a>

				<a
					href="mailto:colorbet78@gmail.com"
					target="_blank"
					rel="noreferrer"
					className="text-xl font-bold text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-gmail"
					>
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
						<polyline points="22,6 12,13 2,6"></polyline>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default Footer;
