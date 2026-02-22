import { Link } from "react-router-dom";
//import { CartItemType } from "../types/CartItemType"
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiMiniXMark } from "react-icons/hi2";
import { type Product } from "../types/Product";
import { useCart } from "@/context/CartProvider";
import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import NoImagePlaceholder from "@/assets/no-image-placeholder.svg";

interface CartItemProp {
	product: Product,
	quantity: number,
	onRemove: () => void,
}
export default function CartItem({ product, quantity, onRemove }: CartItemProp) {
	const { increaseQuantity, decreaseQuantity } = useCart();
	const [imageURL, setImageURL] = useState<string | undefined>(undefined);
	const actualStock = product.stock - quantity;

	useEffect(() => {
		setImageURL(fetchImageURL(product.imageFiles[0]));
	}, [product]);

	function handleIncrese() {
		increaseQuantity(product.productCode);
	}

	function handleDecrease() {
		decreaseQuantity(product.productCode);
	}

	function handleRemove() {
		onRemove();
	}

	function fetchImageURL(fileName: string): string | undefined {
		try {
			const { data } = supabase.storage.from("CautivarteDemo").getPublicUrl(fileName);
			return data.publicUrl;
		} catch (err) {
			console.log(err);
			return undefined;
		}
	}

	return (
		<div className={`w-full py-4 md:py-6 flex flex-col gap-3`}>
			<div className="flex flex-row gap-10">
				<div className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden bg-no-repeat bg-cover bg-center">
					<SmartImage src={imageURL ?? NoImagePlaceholder} className="w-full h-full" alt={`Image of ${product.name}`} />
				</div>
				<div className="w-full md:pt-4 md:text-nowrap flex flex-col items-end justify-start">
					<Link to={"/producto/" + product.productCode} className="font-bold text-brand-secondary">
						{product.name}
					</Link>
					<p>
						Precio: ${product.price.toFixed(2)}
					</p>
					{actualStock === 0 ? (
						<p className="text-xs px-2 py-1 rounded-full bg-amber-100 w-fit">Producto sin stock</p>
					) : (
						<p className="text-xs py-1 text-neutral-400">{actualStock} piezas disponibles</p>
					)
					}
					<div className="flex flex-col mt-2 items-end justify-start">
						<p>
							Cantidad: {quantity}
						</p>
						<p>
							Total: <span className="font-bold">${(product.price * quantity).toFixed(2)}</span>
						</p>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-end gap-4">
				{(actualStock > 0) && <button className="flex px-4 py-1 rounded-full min-w-20 h-10 border border-neutral-200 font-bold md:hover:bg-neutral-200 cursor-pointer items-center justify-center transition-all duration-300" onClick={() => handleIncrese()} >
					<FiPlus />1
				</button>}
				{
					(quantity > 1) &&
					<button className="flex px-4 py-1 rounded-full min-w-20 h-10 border border-neutral-200 font-bold md:hover:bg-neutral-200 cursor-pointer items-center justify-center transition-all duration-300" onClick={() => handleDecrease()} >
						<FiMinus />1
					</button>
				}
				<button className="flex px-4 py-1 rounded-full min-w-20 h-10 border border-neutral-200 font-bold md:hover:bg-neutral-200 cursor-pointer items-center justify-center transition-all duration-300" onClick={() => handleRemove()} >
					<HiMiniXMark size={24} />
				</button>
			</div>
		</div>
	);
}
