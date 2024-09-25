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
							<DrawerTitle className="text-white text-3xl font-bold princess-sofia-regular">
								Color Trading
							</DrawerTitle>
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
				<h1 className="text-white text-3xl font-bold princess-sofia-regular hidden sm:block">
					Color Trading
				</h1>

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
