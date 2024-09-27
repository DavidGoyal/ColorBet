import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
	return (
		<div
			id="faq"
			className="h-auto w-full flex flex-col gap-8 p-4 items-center mb-[7rem]"
		>
			<h1 className="princess-sofia-regular text-5xl font-bold text-center pt-40">
				Frequently Asked Questions
			</h1>

			<Accordion
				type="single"
				collapsible
				className="w-full md:w-[70%] lg:w-1/2 mx-4"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-2xl">
						How do I place a bet?
					</AccordionTrigger>
					<AccordionContent>
						Simply select one of the four colors, enter your desired bet amount
						and click the bet button. Your transaction will be processed through
						your Solana wallet.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="text-2xl">
						What happens if I win?
					</AccordionTrigger>
					<AccordionContent>
						If your chosen color wins, your winnings will be instantly credited
						back to your Solana wallet, allowing you to easily track your
						earnings.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger className="text-2xl">
						Are transactions secure?
					</AccordionTrigger>
					<AccordionContent>
						Yes! All transactions are powered by the Solana blockchain, ensuring
						fast, secure, and transparent payments with minimal fees.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger className="text-2xl text-left">
						Can I view my betting history?
					</AccordionTrigger>
					<AccordionContent>
						Absolutely! You can track your previous transactions directly on the
						platform, including outcomes, and choosen colors.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default FAQ;
