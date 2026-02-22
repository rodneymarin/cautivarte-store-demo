import SmartImage from "@/components/SmartImage";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";

interface ProductPictureCarrouselProps {
	images: string[];
}
export default function ProductPictureCarrousel({ images }: ProductPictureCarrouselProps) {
	const [selected, setSelected] = useState(0);
	const [resolvedImages, setResolvedImages] = useState<string[]>([]);

	useEffect(() => {
		setResolvedImages(images.map((item) => {
			return fetchImageURL(item) ?? "";
		}));
	}, [images]);

	function handleClick(index: number) {
		setSelected(index);
	}

	function fetchImageURL(fileName: string): string | undefined {
		try {
			const { data } = supabase.storage.from("CautivarteDemo").getPublicUrl(fileName);
			return data.publicUrl;
		} catch (err) {
			console.log(err);
			return undefined;
		}
	}

	return (
		<div className="flex flex-col-reverse md:flex-row gap-3">
			{resolvedImages.length > 1 &&
				<div className="flex flex-row w-full justify-center md:flex-col md:w-auto md:justify-start gap-2">
					{
						resolvedImages.map((item, index) => {
							return (
								<button
									key={item}
									onClick={() => handleClick(index)}>
									<div className={`aspect-square rounded-3xl overflow-hidden relative w-24 cursor-pointer border-4 ${(selected === index) ? "border-accent-primary" : "border-transparent"} hover:brightness-90 transition-all duration-300`} >
										<SmartImage src={item} className="h-full w-auto" />
									</div>
								</button>
							);
						})
					}
				</div>
			}
			<div className="rounded-3xl overflow-hidden aspect-square relative w-full" >
				{/* <img src={`/product-pictures/${props.images[selected]}`} loading="lazy" /> */}
				<SmartImage src={resolvedImages[selected]} className="h-full w-auto" />
			</div>
		</div>
	);
}
