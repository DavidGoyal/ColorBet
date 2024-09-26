import React from "react";
import WalletButton from "../WalletButton";
import Link from "next/link";
import img from "@/assets/Vector.png";
import Image from "next/image";
import "@solana/wallet-adapter-react-ui/styles.css";
import { MenuIcon } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.jpg";

const Header = () => {
	return (
		<div className="w-full h-[6rem] fixed flex justify-center z-10">
			<div className="h-full w-[95%] xl:w-[85%] flex items-center justify-between p-4">
				<Drawer direction="left">
					<DrawerTrigger className="block sm:hidden">
						<MenuIcon className="w-8 h-8 text-white cursor-pointer" />
					</DrawerTrigger>
					<DrawerContent className="block sm:hidden left-0 right-auto h-full w-[300px] bg-[#121111]">
						<DrawerHeader>
							<div className="flex items-center gap-2 mx-auto">
								<Avatar>
									<AvatarImage src={logo.src} className="object-cover" />
									<AvatarFallback>Color Bet</AvatarFallback>
								</Avatar>
								<DrawerTitle className="text-white text-3xl font-bold princess-sofia-regular">
									Color Bet
								</DrawerTitle>
							</div>
						</DrawerHeader>
						<DrawerFooter className="flex justify-center items-center gap-4">
							<DrawerClose asChild>
								<Link href={"#"}>Home</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href={"#features"}>Features</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href={"#faq"}>FAQ</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href={"#footer"}>Footer</Link>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<div className="h-full gap-2 items-center hidden sm:flex">
					<Avatar>
						<AvatarImage src={logo.src} className="object-cover" />
						<AvatarFallback>Color Bet</AvatarFallback>
					</Avatar>

					<h1 className="text-white text-3xl font-bold princess-sofia-regular">
						Color Bet
					</h1>
				</div>

				<div className="bg-[#1D1D1D] rounded-full lg:flex justify-between items-center p-4 px-8 gap-12 hidden">
					<Link href={"#"}>Home</Link>
					<Link href={"#features"}>Features</Link>
					<Link href={"#faq"}>FAQ</Link>
					<Link href={"#footer"}>Footer</Link>
				</div>

				<div className="h-full flex gap-4 sm:gap-8 items-center">
					<Image src={img} alt="logo" />
					<WalletButton />
				</div>
			</div>
		</div>
	);
};

export default Header;
