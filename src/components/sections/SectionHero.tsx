import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function SectionHero() {
	const { heroImageURL, CMSContent } = useApp();
	const [heroTitle, setHeroTitle] = useState<string>('');

	useEffect(() => {
		if (CMSContent.length > 0) {
			const heroTitle = CMSContent.find((item) => item.elementId === "HERO_TITLE")?.textContent;
			if (heroTitle) {
				setHeroTitle(heroTitle);
			}
		}
	}, [CMSContent]);

	return (
		<section className="h-100 md:h-[70vh] min-h-100 w-full rounded-3xl bg-neutral-100 overflow-hidden relative">
			{heroImageURL && <img src={heroImageURL} className="h-full w-full object-cover object-center" />}
			<div className="w-full h-full flex items-center p-5 md:p-20 bg-linear-to-r from-black/50 to-black/25 md:to-transparent sm:via-transparent absolute top-0 left-0">
				<div className="flex flex-col gap-4 w-full">
					<h1 className="w-full md:w-[60%] lg:w-[40%] text-4xl font-titles font-semibold text-white text-shadow-[0_2px_32px_rgba(0,0,0,1)]">
						{heroTitle}
					</h1>
					<Link className="px-4 py-1 w-fit rounded-full bg-accent-secondary text-accent-secondary-foreground hover:bg-accent-secondary-darker transition-all duration-300" to="/catalogo">
						Catálogo
					</Link>
				</div>
			</div>
		</section>

	);
}
