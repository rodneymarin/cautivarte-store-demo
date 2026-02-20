import { supabase } from "@/supabase/supabaseClient";
import { mapDataToCMSContentItem, type CMSContentItem, type CMSContentItemData } from "@/types/CMSContent";
import { mapDataToProduct, type Product, type ProductData } from "@/types/Product";
import { useEffect, useState } from "react";

export function useData() {
	const [heroImageURL, setHeroImageURL] = useState<string>('');
	const [CMSContent, setCMSContent] = useState<CMSContentItem[]>([]);
	const [messageImageURL, setMessageImageURL] = useState<string>('');

	useEffect(() => {
		fetchHeroImageURL();
		fetchMessageImageURL();
		fetchCMSContent();
	}, [supabase]);

	async function fetchPromos(): Promise<Product[]> {
		try {
			const { data, error } = await supabase.from("Products").select("*").eq("is_promo", true);
			if (error) {
				console.log(error);
				return [];
			}
			const promoResponse = data as ProductData[];
			const promos: Product[] = promoResponse.map(mapDataToProduct);
			return promos;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	function fetchHeroImageURL() {
		const { data } = supabase.storage.from("CautivarteDemo").getPublicUrl("hero.webp");
		setHeroImageURL(data.publicUrl);
	}

	function fetchMessageImageURL() {
		const { data } = supabase.storage.from("CautivarteDemo").getPublicUrl("message.webp");
		setMessageImageURL(data.publicUrl);
	}

	async function fetchCMSContent() {
		try {
			const { data, error } = await supabase.from("CMSContent").select("*");
			if (error) {
				console.log(error);
				return "";
			}
			if (!data || data.length === 0) {
				console.log("No data found");
				return "";
			}
			const CMSContentResponse = data as CMSContentItemData[];
			const CMSContent: CMSContentItem[] = CMSContentResponse.map(mapDataToCMSContentItem);
			setCMSContent(CMSContent);
		} catch (err) {
			console.log(err);
		}
	}

	return { fetchPromos, heroImageURL, messageImageURL, CMSContent };
}