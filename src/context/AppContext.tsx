import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { mapDataToCMSContentItem, type CMSContentItem, type CMSContentItemData } from "@/types/CMSContent";
import { mapDataToProduct, type Product, type ProductData } from "@/types/Product";
import { mapDataToCategory, type Category, type CategoryData } from "@/types/Category";

type AppContextType = {
	fetchProductsByCategory: (categoryId: number) => Promise<Product[]>;
	fetchCategories: () => Promise<Category[]>;
	promos: Product[];
	heroImageURL: string;
	messageImageURL: string;
	CMSContent: CMSContentItem[];
};

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: PropsWithChildren) {
	const [heroImageURL, setHeroImageURL] = useState<string>("");
	const [promos, setPromos] = useState<Product[]>([]);
	const [CMSContent, setCMSContent] = useState<CMSContentItem[]>([]);
	const [messageImageURL, setMessageImageURL] = useState<string>("");

	useEffect(() => {
		fetchAllData();
	}, [supabase]);

	async function fetchAllData() {
		await fetchPromos();
		await fetchHeroImageURL();
		await fetchMessageImageURL();
		await fetchCMSContent();
	}

	async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
		if (categoryId === 999) {
			try {
				const { data, error } = await supabase.from("Products").select("*");
				if (error) {
					console.log(error);
					return [];
				}
				if (!data || data.length === 0) {
					console.log("No data found");
					return [];
				}
				const productResponse = data as ProductData[];
				const products: Product[] = productResponse.map(mapDataToProduct);
				return products;
			} catch (err) {
				console.log(err);
				return [];
			}
		} else {
			try {
				const { data, error } = await supabase.from("Products").select("*").eq("category_id", categoryId);
				if (error) {
					console.log(error);
					return [];
				}
				if (!data || data.length === 0) {
					console.log("No data found");
					return [];
				}
				const productResponse = data as ProductData[];
				const products: Product[] = productResponse.map(mapDataToProduct);
				return products;
			} catch (err) {
				console.log(err);
				return [];
			}
		}
	}

	async function fetchPromos() {
		try {
			const { data, error } = await supabase.from("Products").select("*").eq("is_promo", true);
			if (error) {
				console.log(error);
				setPromos([]);
				return;
			}
			if (!data || data.length === 0) {
				console.log("No data found");
				setPromos([]);
				return;
			}
			const promoResponse = data as ProductData[];
			const promos: Product[] = promoResponse.map(mapDataToProduct);
			setPromos(promos);
		} catch (err) {
			console.log(err);
			setPromos([]);
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
				setCMSContent([]);
				return;
			}
			if (!data || data.length === 0) {
				console.log("No data found");
				setCMSContent([]);
				return;
			}
			const CMSContentResponse = data as CMSContentItemData[];
			const CMSContentItems: CMSContentItem[] = CMSContentResponse.map(mapDataToCMSContentItem);
			setCMSContent(CMSContentItems);
		} catch (err) {
			console.log(err);
			setCMSContent([]);
		}
	}

	async function fetchCategories(): Promise<Category[]> {
		try {
			const { data, error } = await supabase.from("Categories").select("*");
			if (error) {
				console.log(error);
				return [];
			}
			if (!data || data.length === 0) {
				console.log("No data found");
				return [];
			}
			const categoriesResponse = data as CategoryData[];
			const categories: Category[] = categoriesResponse.map(mapDataToCategory);
			return categories;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	return (
		<AppContext.Provider value={{ fetchProductsByCategory, fetchCategories, promos, heroImageURL, messageImageURL, CMSContent }}>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
