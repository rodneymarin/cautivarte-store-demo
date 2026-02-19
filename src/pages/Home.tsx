import SectionContact from "../components/SectionContact";
import SectionHero from "../components/SectionHero";
import SectionMessage from "../components/SectionMessage";
import SectionPromo from "../components/SectionPromo";

export default function PageHome() {

	return (
		<main className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 mb-24">
			<SectionHero />
			<SectionPromo />
			{/* <SectionMessage />
      <SectionContact /> */}
		</main>
	);
}
