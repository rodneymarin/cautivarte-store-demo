import { supabaseClient } from "@/supabase/supabaseClient";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
	product: Product,
	isVertical?: boolean,
}

export default function ProductCard({ product, isVertical }: ProductCardProps) {

	function getImageURL(): string {
		const { data } = supabaseClient.storage.from('CautivarteDemo').getPublicUrl(product.imageFiles[0]);
		return data.publicUrl;
	}

	if (isVertical) {
		return (
			<div className="rounded-3xl flex flex-col gap-2 border border-neutral-200 bg-white hover:bg-neutral-100 overflow-hidden transition-all duration-300">
				<Link to={`/producto/${product.productCode}`}>
					<div className={`w-full aspect-square rounded-b-3xl overflow-hidden bg-no-repeat bg-cover bg-center`}>
						<img src={getImageURL()} loading="lazy" />
					</div>
					<div className="px-5 py-4">
						<h4 className="font-bold truncate">{product.name}</h4>
						<p className="truncate">{product.description}</p>
						<p className="font-bold">{product.price}</p>
					</div>
				</Link>
			</div>
		);
	} else {
		return (
			<Link to={`/producto/${product.productCode}`} className="px-4 py-3 bg-white hover:bg-neutral-100 hover:cursor-pointer flex flex-row gap-3  transition-all duration-300">
				<div className={`w-[10%] aspect-square rounded-full overflow-hidden bg-no-repeat bg-cover bg-center`}>
					<img src={getImageURL()} loading="lazy" />
				</div>
				<div className="w-full flex flex-row items-center gap-3">
					<div className="w-[40%] md:w-[20%] truncate">
						{product.productCode}
					</div>
					<div className="w-full md:w-[40%] font-bold truncate">
						{product.name}
					</div>
					<div className="w-full hidden md:block">
						<div className="line-clamp-1">
							{product.description}
						</div>
					</div>
					<div className="min-w-[8%] flex justify-end font-bold">
						${product.price.toFixed(2)}
					</div>
				</div>
			</Link>
		);
	}
}
