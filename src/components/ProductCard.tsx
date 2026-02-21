import { supabase } from "@/supabase/supabaseClient";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const [isLoadingImage, setIsLoadingImage] = useState(true);

	function getImageURL(): string {
		const { data } = supabase.storage.from('CautivarteDemo').getPublicUrl(product.imageFiles[0]);
		return data.publicUrl;
	}

	return (
		<div className="rounded-3xl flex flex-col gap-2 border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl will-change-transform">
			<Link to={`/producto/${product.productCode}`}>
				<div className={`relative w-full aspect-square rounded-b-3xl overflow-hidden bg-no-repeat bg-cover bg-center`}>
					<div className={`absolute ${isLoadingImage ? "opacity-100" : "opacity-0"} transition-all duration-700 top-0 left-0 w-full h-full items-center flex justify-center`}>
						<div className="flex items-center space-x-2">
							<style>{`
								@keyframes dotPulse {
									0% { transform: scale(0.6); opacity: 0.6; }
									50% { transform: scale(1); opacity: 1; }
									100% { transform: scale(0.6); opacity: 0.6; }
								}
							`}</style>
							<span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" style={{ animation: 'dotPulse 900ms infinite ease-in-out', animationDelay: '0ms' }} />
							<span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" style={{ animation: 'dotPulse 900ms infinite ease-in-out', animationDelay: '150ms' }} />
							<span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" style={{ animation: 'dotPulse 900ms infinite ease-in-out', animationDelay: '300ms' }} />
						</div>
					</div>
					<img src={getImageURL()} className={`${isLoadingImage ? "opacity-0" : "opacity-100"} transition-all duration-700`} onLoad={() => setIsLoadingImage(false)} alt={`Image of ${product.name}`} />
				</div>
				<div className="px-5 py-4">
					<h4 className="font-bold truncate">{product.name}</h4>
					<p className="line-clamp-2 text-sm text-neutral-500">{product.description}</p>
					<p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
				</div>
			</Link>
		</div>
	);
}
