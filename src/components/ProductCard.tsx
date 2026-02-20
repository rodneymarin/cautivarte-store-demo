import { supabase } from "@/supabase/supabaseClient";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
	product: Product,
	isVertical?: boolean,
}

export default function ProductCard({ product, isVertical }: ProductCardProps) {

	function getImageURL(): string {
		const { data } = supabase.storage.from('CautivarteDemo').getPublicUrl(product.imageFiles[0]);
		return data.publicUrl;
	}

	if (isVertical) {
		return (
			<div className="rounded-3xl flex flex-col gap-2 border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl will-change-transform">
				<Link to={`/producto/${product.productCode}`}>
					<div className={`w-full aspect-square rounded-b-3xl overflow-hidden bg-no-repeat bg-cover bg-center`}>
						<img src={getImageURL()} loading="lazy" />
					</div>
					<div className="px-5 py-4">
						<h4 className="font-bold truncate">{product.name}</h4>
						<p className="line-clamp-2 text-sm text-neutral-500">{product.description}</p>
						<p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
					</div>
				</Link>
			</div>
		);
	} else {
		return (
			<Link to={`/producto/${product.productCode}`} className="px-4 py-3 bg-white hover:cursor-pointer flex flex-row gap-3  transition-all duration-300 hover:scale-105 hover:shadow-xl will-change-transform">
				<div className={`w-[10%] aspect-square rounded-full overflow-hidden bg-no-repeat bg-cover bg-center`}>
					<img src={getImageURL()} loading="lazy" />
				</div>
				<div className="w-full flex flex-row items-center gap-3">
					<p className="w-[40%] md:w-[20%] truncate">
						{product.productCode}
					</p>
					<p className="w-full md:w-[40%] font-bold truncate">
						{product.name}
					</p>
					<p className="w-full hidden md:block line-clamp-2">
						{product.description}
					</p>
					<p className="min-w-[8%] flex justify-end font-bold">
						${product.price.toFixed(2)}
					</p>
				</div>
			</Link>
		);
	}
}
