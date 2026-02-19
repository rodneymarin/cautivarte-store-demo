import { supabaseClient } from "@/supabase/supabaseClient";
import { mapDataToProduct, type Product, type ProductData } from "@/types/Product";
import { useEffect, useState } from "react";

export function useData() {
	const [heroImageURL, setHeroImageURL] = useState<string>('');

	useEffect(() => {
		fetchHeroImageURL();
	}, [supabaseClient]);

	async function fetchPromos(): Promise<Product[]> {
		try {
			const { data, error } = await supabaseClient.from('Products').select('*').eq('is_promo', true);
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
		const { data } = supabaseClient.storage.from('CautivarteDemo').getPublicUrl('hero.webp');
		setHeroImageURL(data.publicUrl);
	}

	return { fetchPromos, heroImageURL };
}