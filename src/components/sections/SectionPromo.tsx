import ProductCard from "@/components/ProductCard";
import { useApp } from "@/context/AppContext";

export default function SectionPromo() {
	const { promos } = useApp();

	return (
		<section className="w-full">
			<h2 className="text-3xl mb-6 font-semibold text-center">Precios especiales</h2>
			{/* <PromoList /> */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{
					promos.map(item => {
						return (
							<ProductCard isVertical key={item.productCode} product={item} />
						);
					})
				}
			</div>
		</section>
	);
}
