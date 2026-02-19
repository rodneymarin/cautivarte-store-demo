import { CatalogoButtonColor } from "../types/others";
import { CatalogoButton } from "./CatalogoButton";

export default function SectionMessage() {
	return (
		<section className="w-full ">
			<div className="rounded-3xl bg-white border border-neutral-200 flex flex-row items-center overflow-hidden relative">
				<img src="/message.webp" alt="image message" className="object-cover object-center rounded-r-3xl absolute top-0 left-0 w-[30%] h-full" />
				<div className="flex flex-col gap-4 pl-[35%] pr-4 md:pr-8 py-8 md:py-16">
					<h3 className="font-titles text-lgl md:text-3xl font-semibold">
						Capturando la elegancia <br className="hidden lg:block" />
						del alambrismo, precisión del miyuki, <br className="hidden lg:block" />
						y entrelazados del macramé.
					</h3>
					<CatalogoButton colorType={CatalogoButtonColor.green} />
				</div>
			</div>
		</section>

	);
}