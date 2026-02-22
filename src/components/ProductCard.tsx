import SmartImage from "@/components/SmartImage";
import { supabase } from "@/supabase/supabaseClient";
import type { Product } from "@/types/Product";
import { Link } from "react-router-dom";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

	function getImageURL(): string {
		const { data } = supabase.storage.from('CautivarteDemo').getPublicUrl(product.imageFiles[0]);
		return data.publicUrl;
	}

	return (
		<div className="rounded-3xl flex flex-col gap-2 border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl will-change-transform">
			<Link to={`/producto/${product.productCode}`}>
				<SmartImage src={getImageURL()} className="w-full aspect-square rounded-b-3xl overflow-hidden bg-no-repeat bg-cover bg-center" alt={`Image of ${product.name}`} />
				<div className="px-5 py-4">
					<h4 className="font-bold truncate">{product.name}</h4>
					<p className="line-clamp-2 text-sm text-neutral-500">{product.description}</p>
					<p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
				</div>
			</Link>
		</div>
	);
}
