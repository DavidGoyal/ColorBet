import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Terms = () => {
	return (
		<div className="min-h-screen w-screen max-w-[100%] p-4 px-8 bg-[#0a0a0a]">
			<Link href={"/"} className="flex items-center">
				<Avatar>
					<AvatarImage src={logo.src} className="object-cover" />
					<AvatarFallback>Color Bet</AvatarFallback>
				</Avatar>
				<h1 className="text-white text-3xl font-bold princess-sofia-regular">
					Color Bet
				</h1>
			</Link>
			<br />
			<h2 className="text-white text-3xl font-bold">Terms and Conditions</h2>
			<p>Last updated: September 30, 2024</p>
			<p>
				Please read these terms and conditions carefully before using Our
				Service.
			</p>
			<br />
			<h2 className="text-white text-3xl font-bold">
				Interpretation and Definitions
			</h2>
			<h3 className="text-white text-2xl font-bold mt-1">Interpretation</h3>
			<p>
				The words of which the initial letter is capitalized have meanings
				defined under the following conditions. The following definitions shall
				have the same meaning regardless of whether they appear in singular or
				in plural.
			</p>
			<h3 className="text-white text-2xl font-bold mt-1">Definitions</h3>
			<p>For the purposes of these Terms and Conditions:</p>
			<ul className="list-disc ml-4">
				<li>
					<p>
						<strong>Affiliate</strong> means an entity that controls, is
						controlled by or is under common control with a party, where
						&quot;control&quot; means ownership of 50% or more of the shares,
						equity interest or other securities entitled to vote for election of
						directors or other managing authority.
					</p>
				</li>
				<li>
					<p>
						<strong>Company</strong> (referred to as either &quot;the
						Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
						this Agreement) refers to Color Bet.
					</p>
				</li>
				<li>
					<p>
						<strong>Device</strong> means any device that can access the Service
						such as a computer, a cellphone or a digital tablet.
					</p>
				</li>
				<li>
					<p>
						<strong>Service</strong> refers to the Website.
					</p>
				</li>
				<li>
					<p>
						<strong>Terms and Conditions</strong> (also referred as
						&quot;Terms&quot;) mean these Terms and Conditions that form the
						entire agreement between You and the Company regarding the use of
						the Service.
					</p>
				</li>
				<li>
					<p>
						<strong>Third-party Social Media Service</strong> means any services
						or content (including data, information, products or services)
						provided by a third-party that may be displayed, included or made
						available by the Service.
					</p>
				</li>
				<li>
					<p>
						<strong>Website</strong> refers to Color Bet, accessible from{" "}
						<a
							href="https://www.colorbet.io/"
							rel="external nofollow noopener"
							target="_blank"
							className="underline"
						>
							https://www.colorbet.io/
						</a>
					</p>
				</li>
				<li>
					<p>
						<strong>You</strong> means the individual accessing or using the
						Service, or the company, or other legal entity on behalf of which
						such individual is accessing or using the Service, as applicable.
					</p>
				</li>
			</ul>
			<br />
			<h2 className="text-white text-3xl font-bold">Acknowledgment</h2>
			<p>
				These are the Terms and Conditions governing the use of this Service and
				the agreement that operates between You and the Company. These Terms and
				Conditions set out the rights and obligations of all users regarding the
				use of the Service.
			</p>
			<p>
				Your access to and use of the Service is conditioned on Your acceptance
				of and compliance with these Terms and Conditions. These Terms and
				Conditions apply to all visitors, users and others who access or use the
				Service.
			</p>
			<p>
				By accessing or using the Service You agree to be bound by these Terms
				and Conditions. If You disagree with any part of these Terms and
				Conditions then You may not access the Service.
			</p>
			<br />

			<h2 className="text-white text-3xl font-bold">Limitation of Liability</h2>
			<p>
				If you believe you have been scammed while using our Service, you must
				contact us via email, providing proper video proof of the incident.
				Without this video evidence, your case will not be considered for
				review.
			</p>
			<p>
				To the maximum extent permitted by applicable law, in no event shall the
				Company or its suppliers be liable for any special, incidental,
				indirect, or consequential damages whatsoever (including, but not
				limited to, damages for loss of profits, loss of data or other
				information, for business interruption, for personal injury, or loss of
				privacy) arising out of or in any way related to the use of or inability
				to use the Service, third-party software and/or third-party hardware
				used with the Service, or otherwise in connection with any provision of
				these Terms.
			</p>
			<p>
				Some states do not allow the exclusion of implied warranties or
				limitation of liability for incidental or consequential damages, which
				means that some of the above limitations may not apply. In these states,
				each party&apos;s liability will be limited to the greatest extent
				permitted by law.
			</p>

			<br />

			<h2 className="text-white text-3xl font-bold">
				Changes to These Terms and Conditions
			</h2>
			<p>
				We reserve the right, at Our sole discretion, to modify or replace these
				Terms at any time. If a revision is material We will make reasonable
				efforts to provide at least 30 days&apos; notice prior to any new terms
				taking effect. What constitutes a material change will be determined at
				Our sole discretion.
			</p>
			<p>
				By continuing to access or use Our Service after those revisions become
				effective, You agree to be bound by the revised terms. If You do not
				agree to the new terms, in whole or in part, please stop using the
				website and the Service.
			</p>
			<br />
			<h2 className="text-white text-3xl font-bold">Contact Us</h2>
			<p>
				If you have any questions about these Terms and Conditions, You can
				contact us:
			</p>
			<ul>
				<li>By email: colorbet78@gmail.com</li>
			</ul>
		</div>
	);
};

export default Terms;
