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
			<h2 className="section-title">Precios especiales</h2>
			{/* <PromoList /> */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
