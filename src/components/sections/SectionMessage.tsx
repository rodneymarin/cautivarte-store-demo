import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SectionMessage() {
	const { messageImageURL, CMSContent } = useApp();
	const [brandMessage, setBrandMessage] = useState<string>('');

	useEffect(() => {
		if (CMSContent.length > 0) {
			const brandMessage = CMSContent.find((item) => item.elementId === "LANDING_BRAND_MESSAGE")?.textContent;
			if (brandMessage) {
				setBrandMessage(brandMessage);
			}
		}
	}, [CMSContent]);

	return (
		<section className="w-full ">
			<div className="rounded-3xl bg-white border border-neutral-200 flex flex-row items-center overflow-hidden relative">
				{messageImageURL && <img src={messageImageURL} alt="image message" className="object-cover object-center rounded-r-3xl absolute top-0 left-0 w-[30%] h-full" />}
				<div className="flex flex-col gap-4 pl-[35%] pr-4 md:pr-8 py-8 md:py-16">
					<h3 className="font-titles text-lgl md:text-3xl font-semibold">
						{brandMessage}
					</h3>
					<Link className="px-4 py-1 w-fit rounded-full bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary-darker transition-all duration-300" to="/catalogo">
						Catálogo
					</Link>
				</div>
			</div>
		</section>

	);
}