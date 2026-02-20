import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { mapDataToCMSContentItem, type CMSContentItem, type CMSContentItemData } from "@/types/CMSContent";
import { mapDataToProduct, type Product, type ProductData } from "@/types/Product";

type AppContextType = {
	fetchPromos: () => Promise<Product[]>;
	fetchHeroImageURL: () => void;
	fetchMessageImageURL: () => void;
	fetchCMSContent: () => Promise<void> | void;
	heroImageURL: string;
	messageImageURL: string;
	CMSContent: CMSContentItem[];
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: PropsWithChildren) {
	const [heroImageURL, setHeroImageURL] = useState<string>("");
	const [CMSContent, setCMSContent] = useState<CMSContentItem[]>([]);
	const [messageImageURL, setMessageImageURL] = useState<string>("");

	useEffect(() => {
		fetchHeroImageURL();
		fetchMessageImageURL();
		void fetchCMSContent();
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
				return;
			}
			if (!data || data.length === 0) {
				console.log("No data found");
				return;
			}
			const CMSContentResponse = data as CMSContentItemData[];
			const CMSContentItems: CMSContentItem[] = CMSContentResponse.map(mapDataToCMSContentItem);
			setCMSContent(CMSContentItems);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<AppContext.Provider value={{ fetchPromos, fetchHeroImageURL, fetchMessageImageURL, fetchCMSContent, heroImageURL, messageImageURL, CMSContent }}>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
