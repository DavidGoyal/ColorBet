import { Metadata } from "next";

const TITLE = "Color Bet - A Fun Betting Experience";
const DESCRIPTION =
	"Join Color Bet and test your luck by betting on colors! Engage in thrilling gameplay and enjoy the excitement.";

const PREVIEW_IMAGE_URL =
	"https://res.cloudinary.com/dlu7jj0qk/image/upload/logo_qeb45e.png";
const ALT_TITLE =
	"Color Bet: Experience the Thrill of Color Betting on the Solana Blockchain";
const BASE_URL = "https://www.colorbet.io";

export const siteConfig: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: "/favicon.ico",
	},
	applicationName: "Color Bet",
	creator: "ColorBet",
	twitter: {
		creator: "@bet_color",
		title: TITLE,
		description: DESCRIPTION,
		card: "summary_large_image",
		images: [
			{
				url: PREVIEW_IMAGE_URL,
				width: 1200,
				height: 630,
				alt: ALT_TITLE,
			},
		],
	},
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		siteName: "Color Bet",
		url: BASE_URL,
		locale: "en_US",
		type: "website",
		images: [
			{
				url: PREVIEW_IMAGE_URL,
				width: 1200,
				height: 630,
				alt: ALT_TITLE,
			},
		],
	},
	category: "Gambling",
	alternates: {
		canonical: BASE_URL,
	},
	keywords: [
		"Color Bet",
		"betting",
		"gaming",
		"fun",
		"Solana",
		"Solana Blockchain",
	],
	metadataBase: new URL(BASE_URL),
};
