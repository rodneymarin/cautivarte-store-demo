import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartButton() {
	const { totalQuantity } = useCart();

	return (
		<Link to="/carrito" className="flex px-4 py-1 rounded-full bg-accent-primary text-accent-primary-foreground items-center gap-2 font-bold">
			{totalQuantity || 0} <BiShoppingBag className="-mt-0.5" />
		</Link>
	);

}
