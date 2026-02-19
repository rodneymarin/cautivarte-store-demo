import { useEffect, useState } from "react";
import { CatalogoButton } from "../components/CatalogoButton";
import CartItem from "../components/CartItem";
import CartItemTotal from "../components/CartItemTotal";
import { useCart } from "../hooks/useCart";
import Dialog from "../components/Dialog";
import { type Product } from "../types/Product";
import { ApiEndpoints } from "../types/api";

export default function PageCart() {
	const { totalItems, removeItem } = useCart();
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [productToRemove, setProductToRemove] = useState<Product | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const tempIds = totalItems.reduce((total, item) => total + "," + item.id.toString(), "");
		const productIds = tempIds.slice(1, tempIds.length);
		try {
			fetch(ApiEndpoints.productsByIds + productIds, {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
				.then(res => res.json())
				.then(data => {
					data && setProducts(data);
				});
		} catch (err) {
			console.log(err);
		}
	}, [totalItems]);

	useEffect(() => {
		const tempTotalPrice = products.reduce((total, item) => total + (item.price * totalItems.find(it => it.id === item.id)!.quantity), 0);
		setTotalPrice(tempTotalPrice);
	}, [products]);

	function handleClickRemoveItem(product: Product) {
		setProductToRemove(product);
		setDialogVisible(true);
	}

	function handleRemoveItem() {
		productToRemove && removeItem(productToRemove.id);
		setProductToRemove(null);
		setDialogVisible(false);
	}

	function handleCheckout() {
		// const header = "https://wa.me/573024743865?text=Hola,%20quiero%20hacer%20un%20pedido%20de%20los%20siguientes%20productos:";
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
			<div className="w-full">
				<h2 className="mb-8 text-center font-titles text-lgl md:text-3xl font-semibold">Tu Carrito de Pedidos</h2>
				<h2 className="text-center font-bold text-brand-primary">No tienes aún productos para ordenar</h2>
				<div className="w-full flex items-center justify-center pt-6">
					<CatalogoButton colorType="green" />
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-full md:max-w-[70%] mx-auto">
				<h2 className="mb-4 md:mb-8 text-center font-titles text-2xl md:text-3xl font-semibold">Tu Carrito de Pedidos</h2>
				<div className="flex flex-col md:flex-row md:gap-12">
					<div className="md:min-w-[60%] h-fit flex flex-col px-6 md:px-8 divide-y divide-neutral-200 border border-neutral-200 rounded-3xl bg-white">
						<>
							{
								products.map(item => {
									const cartItem = totalItems.find(it => it.id === item.id);
									const qty = cartItem ? cartItem.quantity : 0;
									return <CartItem key={item.cod} product={item} quantity={qty} onRemove={() => handleClickRemoveItem(item)} />;
								})
							}
						</>
					</div>
					<div className="flex flex-col md:items-end gap-6">
						<CartItemTotal totalPrice={totalPrice} />
						<button onClick={() => handleCheckout()} className="chip w-full md:w-fit md:h-fit py-3 md:py-1 bg-brand-primary text-white font-bold">Realizar Pedido</button>
						<div className="w-full text-neutral-400 text-center md:text-start">
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
								<button className="chip hover-brand-primary border border-neutral-200" onClick={() => handleRemoveItem()}>Aceptar</button>
								<button className="chip bg-brand-primary hover-brand-secondary text-white" onClick={() => setDialogVisible(false)}>Cancelar</button>
							</div>
						</div>
					</Dialog>
				)
			}
		</>
	);
}
