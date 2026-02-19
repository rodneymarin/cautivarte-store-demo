import { Link } from "react-router-dom";
//import { CartItemType } from "../types/CartItemType"
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiMiniXMark } from "react-icons/hi2";
import { useCart } from "../hooks/useCart";
import { type Product } from "../types/Product";

interface CartItemProp {
	product: Product,
	quantity: number,
	onRemove: () => void,
}
export default function CartItem(props: CartItemProp) {
	const { increaseQuantity, decreaseQuantity } = useCart();

	function handleIncrese() {
		increaseQuantity(props.product.id);
	}

	function handleDecrease() {
		decreaseQuantity(props.product.id);
	}

	function handleRemove() {
		props.onRemove();
	}

	const imageFile = props.product.image_files.split("|")[0];

	return (
		<div className={`w-full py-4 md:py-6 flex flex-col gap-3`}>
			<div className="flex flex-row gap-10">
				<div
					className={`max-w-[30%] aspect-square rounded-3xl overflow-hidden bg-no-repeat bg-cover bg-center`}
					style={{ backgroundImage: `url('/product-pictures/small/${imageFile}')` }}
				><img src={"/product-pictures/" + imageFile} loading="lazy" />
				</div>

				<div className="w-full md:pt-4 md:text-nowrap flex flex-col items-end justify-start">
					<Link to={"/producto/" + props.product.cod} className="font-bold text-brand-secondary">
						{props.product.name}
					</Link>
					<div>
						Precio: ${props.product.price.toFixed(2)}
					</div>
					<div>
						Cantidad: {props.quantity}
					</div>
					<div>
						Total: <span className="font-bold">${(props.product.price * props.quantity).toFixed(2)}</span>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-end gap-4">
				<button
					className="chip min-w-20 h-10 border border-neutral-200 font-bold md:hover:bg-brand-primary md:hover:text-white flex items-center justify-center"
					onClick={() => handleIncrese()}
				><FiPlus />1</button>
				{
					(props.quantity > 1) &&
					<button
						className="chip min-w-20 h-10 border border-neutral-200 font-bold md:hover:bg-brand-primary md:hover:text-white flex items-center justify-center"
						onClick={() => handleDecrease()}
					><FiMinus />1</button>
				}
				<button
					className="chip min-w-20 h-10 border border-neutral-200 font-bold md:hover:bg-brand-primary md:hover:text-white flex items-center justify-center"
					onClick={() => handleRemove()}
				><HiMiniXMark size={24} /></button>
			</div>
		</div>
	);
}
