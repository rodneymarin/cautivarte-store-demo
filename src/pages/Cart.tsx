import { useEffect, useState } from "react";
import CartItemTotal from "../components/CartItemTotal";
import Dialog from "../components/Dialog";
import { mapDataToProduct, type Product, type ProductData } from "../types/Product";
import { supabase } from "@/supabase/supabaseClient";
import { useCart } from "@/context/CartProvider";
import CartItem from "@/components/CartItem";
import { Link } from "react-router-dom";

interface ProductWithQuantity extends Product {
	quantity: number;
}

export default function PageCart() {
	const { cartItems, removeItem } = useCart();
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [productToRemove, setProductToRemove] = useState<Product | undefined>(undefined);
	const [products, setProducts] = useState<Product[]>([]);
	const [productsWithQuantity, setProductsWithQuantity] = useState<ProductWithQuantity[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [cartItems]);

	useEffect(() => {
		const calculatedTotalPrice = productsWithQuantity.reduce((total, product) => total + product.price * product.quantity, 0);
		setTotalPrice(calculatedTotalPrice);
	}, [products]);

	async function fetchProducts() {
		if (cartItems.length === 0) {
			setProducts([]);
			setProductsWithQuantity([]);
			return;
		}
		const productCodes = cartItems.map(item => item.productCode);
		try {
			const { data, error } = await supabase.from("Products").select("*").in("product_code", productCodes);
			if (error) {
				console.log(error);
				return;
			}
			if (!data || data.length === 0) {
				console.log("No data found");
				setProducts([]);
				setProductsWithQuantity([]);
				return;
			}
			const productResponse = data as ProductData[];
			const products: Product[] = productResponse.map(mapDataToProduct);
			setProducts(products);
			const productsWithQuantity: ProductWithQuantity[] = products.map(product => {
				const quantity = cartItems.find(item => item.productCode === product.productCode)?.quantity || 0;
				return { ...product, quantity };
			});
			setProductsWithQuantity(productsWithQuantity);
		} catch (err) {
			console.log(err);
		}
	}

	function handleClickRemoveItem(product: Product) {
		setProductToRemove(product);
		setDialogVisible(true);
	}

	function handleRemoveItem() {
		productToRemove && removeItem(productToRemove.productCode);
		setProductToRemove(undefined);
		setDialogVisible(false);
	}

	function handleCheckout() {
		// const header = "https://wa.me/xxxxxx?text=Hola,%20quiero%20hacer%20un%20pedido%20de%20los%20siguientes%20productos:";
		// const body = totalItems.reduce<string>((prev, current) => {
		//   const prod: Product = products.find(productElement => productElement.id === current.id)!;
		//   const total = current.quantity * prod.price;
		//   return prev + "%0A" + prod.name.replace(" ", "%20") + "%20...(" + current.quantity + ")%20" + "%20......%20$" + total.toFixed(2);
		// }, "");
		// const url = header + body + "%0A---Total%20......%20$" + totalPrice.toFixed(2);
		// window.open(url, "_blank")!.focus();
	}

	if (products.length === 0) {
		return (
			<div className="w-full pb-16">
				<h2 className="mb-8 text-center font-titles text-lgl md:text-3xl font-semibold">Tu Carrito de Pedidos</h2>
				<h2 className="text-center font-bold text-brand-primary">No tienes aún productos para ordenar</h2>
				<div className="w-full flex items-center justify-center pt-6">
					<Link className="px-4 py-1 w-fit rounded-full bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary-darker transition-all duration-300" to="/catalogo">
						Ir al Catálogo
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-full md:max-w-[70%] mx-auto pb-16">
				<h2 className="mb-4 md:mb-8 text-center font-titles text-2xl md:text-3xl font-semibold">Mi Carrito</h2>
				<div className="flex flex-col md:flex-row md:gap-12">
					<div className="md:min-w-[60%] h-fit flex flex-col px-6 md:px-8 divide-y divide-neutral-200 border border-neutral-200 rounded-3xl bg-white">
						<>
							{
								productsWithQuantity.map(item => {
									return <CartItem key={item.productCode} product={item} quantity={item.quantity} onRemove={() => handleClickRemoveItem(item)} />;
								})
							}
						</>
					</div>
					<div className="flex flex-col md:items-end gap-6">
						<CartItemTotal totalPrice={totalPrice} />
						<button onClick={() => handleCheckout()} className="flex px-4 rounded-full w-full md:w-fit md:h-fit py-3 md:py-1 bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary-darker font-bold cursor-pointer transition-all duration-300">Realizar Pedido</button>
						<div className="flex flex-col gap-4 w-full text-neutral-400 text-center md:text-start">
							<h3 className="font-bold">Condiciones de envío y fabricación</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam ullamcorper massa in accumsan. Proin in lectus convallis, rutrum nulla quis, gravida dui. Aliquam erat volutpat. Vestibulum eleifend lobortis consectetur. Maecenas auctor convallis facilisis.
							</p>
						</div>
					</div>
				</div>
			</div>
			{
				dialogVisible && (
					<Dialog title="Quitar del carrito" onClose={() => setDialogVisible(false)}>
						<div className="flex flex-col gap-6">
							<p>
								¿Estás seguro que deseas quitar el artículo {productToRemove?.name} de tu pedido?
							</p>
							<div className="flex gap-4 justify-center">
								<button className="flex px-4 py-1 rounded-full items-center hover:bg-neutral-200 border border-neutral-200 trnsition-all duration-300 cursor-pointer" onClick={() => handleRemoveItem()}>Aceptar</button>
								<button className="flex px-4 py-1 rounded-full items-center bg-accent-primary hover:bg-accent-primary-darker text-accent-primary-foreground transition-all duration-300 cursor-pointer" onClick={() => setDialogVisible(false)}>Cancelar</button>
							</div>
						</div>
					</Dialog>
				)
			}
		</>
	);
}
