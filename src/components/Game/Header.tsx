import "@solana/wallet-adapter-react-ui/styles.css";
import { MenuIcon } from "lucide-react";
import ShowSol from "../ShowSol";
import WalletButton from "../WalletButton";
import React from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

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
							<Link href={"/"}>
								<DrawerTitle className="text-white text-3xl font-bold princess-sofia-regular">
									Color Trading
								</DrawerTitle>
							</Link>
						</DrawerHeader>
						<div className="w-[60%] mx-auto">
							Balance: <ShowSol />
						</div>
					</DrawerContent>
				</Drawer>
				<Link href={"/"}>
					<h1 className="text-white text-3xl font-bold princess-sofia-regular hidden sm:block">
						Color Trading
					</h1>
				</Link>

				<div className="h-full flex gap-8 items-center">
					<div className="sm:block hidden">
						<ShowSol />
					</div>
					<WalletButton />
				</div>
			</div>
		</div>
	);
};

export default Header;
