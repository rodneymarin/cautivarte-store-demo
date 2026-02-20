import { useEffect, useState } from "react";
import type { Product } from "@/types/Product";
import { useData } from "@/hooks/useData";
import ProductCard from "@/components/ProductCard";

export default function SectionPromo() {
	const { fetchPromos } = useData();
	const [productPromos, setProductPromos] = useState<Product[]>([]);

	useEffect(() => {
		fetchPromos().then(data => setProductPromos(data));
	}, []);

	return (
		<section className="w-full">
			<h2 className="text-3xl mb-6 font-semibold text-center">Precios especiales</h2>
			{/* <PromoList /> */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{
					productPromos.map(item => {
						return (
							<ProductCard isVertical key={item.productCode} product={item} />
						);
					})
				}
			</div>
		</section>
	);
}
