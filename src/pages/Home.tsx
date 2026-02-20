import SectionContact from "../components/sections/SectionContact";
import SectionHero from "../components/sections/SectionHero";
import SectionMessage from "../components/sections/SectionMessage";
import SectionPromo from "../components/sections/SectionPromo";

export default function PageHome() {

	return (
		<main className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 mb-24">
			<SectionHero />
			<SectionPromo />
			<SectionMessage />
			{/* <SectionContact /> */}
		</main>
	);
}
