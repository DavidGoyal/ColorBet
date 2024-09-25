import Link from "next/link";
import React from "react";

const Notfound = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-black">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-white mb-4">404</h1>
				<p className="text-xl text-gray-400 mb-8">
					Oops! The page you&apos;re looking for doesn&apos;t exist.
				</p>

				<div className="mb-8">
					<svg
						className="mx-auto w-24 h-24 text-gray-500"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75v.008h.008V9.75h-.008zM4.5 3.75A3.75 3.75 0 018.25 0h7.5a3.75 3.75 0 013.75 3.75v16.5a3.75 3.75 0 01-3.75 3.75h-7.5A3.75 3.75 0 014.5 20.25V3.75z"
						></path>
					</svg>
				</div>

				<Link
					href="/"
					className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default Notfound;
