import { useApp } from "@/context/AppContext";
import { useCart } from "@/context/CartProvider";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPictureCarrousel from "../components/ProductPictureCarrousel";
import type { CartItemType } from "@/types/CartItem";

export default function PageProduct() {
	const { increaseQuantity, decreaseQuantity, cartItems } = useCart();
	const params = useParams();
	const { fetchProductByCode } = useApp();
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [actualCartItem, setActualCartItem] = useState<CartItemType | undefined>(undefined);
	const [actualStock, setActualStock] = useState(0);

	useEffect(() => {
		if (params.cod) {
			setIsLoading(true);
			fetchProductByCode(params.cod)
				.then((data: Product | undefined) => {
					setProduct(data);
					setIsLoading(false);
				});
		}
	}, [params.cod]);

	useEffect(() => {
		if (!product) return;
		const item = cartItems.find(item => item.productCode === product?.productCode);
		setActualCartItem(item);
		if (item) {
			const stock = product.stock - item.quantity;
			setActualStock(stock);
		} else {
			setActualStock(product.stock);
		}
	}, [cartItems, product]);

	if (isLoading || !product) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-120">
				<p className="text-neutral-400">Cargando...</p>
			</div>
		);
	}

	return (
		<main className="w-full flex flex-col md:flex-row md:gap-8 pb-16">
			<div className="w min-w-[60%]">
				<ProductPictureCarrousel images={product.imageFiles} />
			</div>
			<div className="divide-y divide-neutral-200">
				<div className="flex flex-col py-8">
					<h1 className="text-3xl font-bold">{product?.name}</h1>
					{
						actualStock === 0 ? (
							<p className="text-xs px-2 py-1 rounded-full bg-amber-100 w-fit">Producto sin stock</p>
						) : (
							<p className="text-xs py-1 text-neutral-400">{actualStock} piezas disponibles</p>
						)
					}
					<h2 className="text-2xl font-bold">{"$"}{product?.price}</h2>
					<div className="flex gap-2">
						<button disabled={actualStock === 0} className="px-4 mt-6 md:w-fit py-3 md:py-1 rounded-full w-full cursor-pointer transition-all duration-300 bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary-darker disabled:bg-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed font-bold" onClick={() => increaseQuantity(product.productCode)} >
							Agregar +1 al carrito
						</button>
						<button disabled={!actualCartItem || actualCartItem?.quantity === 0} className="px-4 mt-6 md:w-fit py-3 md:py-1 rounded-full w-full cursor-pointer transition-all duration-300 border border-neutral-300 text-black hover:bg-neutral-200 disabled:bg-neutral-200 disabled:text-neutral-300 disabled:cursor-not-allowed font-bold" onClick={() => decreaseQuantity(product.productCode)} >
							Quitar -1 al carrito
						</button>
					</div>
				</div>
				<p className="mt-4 pt-4">
					{product?.description}
				</p>
			</div>
		</main>
	);
}
