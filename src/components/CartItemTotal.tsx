
interface CartItemTotalProps {
	totalPrice: number;
}
export default function CartItemTotal(props: CartItemTotalProps) {
	return (
		<div className={`w-full py-2 border-b border-neutral-200 flex justify-center md:justify-end`}>
			<div className="py-4 md:px-6 w-fit">
				Total pedido: <span className="font-bold text-2xl">${props.totalPrice.toFixed(2)}</span>
			</div>
		</div>
	);
}
