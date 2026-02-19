import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ApiEndpoints } from "../types/api";
import { Product } from "../types/Product";

export default function PromoList() {
	const [productPromos, setProductPromos] = useState<Product[]>([]);

	async function fetchPromos(): Promise<Product[]> {
		const response = await fetch(ApiEndpoints.promo,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
		const data = await response.json();
		return data;
	}

	useEffect(() => {
		fetchPromos().then(data => setProductPromos(data));
	}, []);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{
				productPromos.map(item => {
					return (
						<ProductCard isVertical linkTo={"/producto/" + item.cod} key={item.cod} product={item} />
					);
				})
			}
		</div>
	);
}
