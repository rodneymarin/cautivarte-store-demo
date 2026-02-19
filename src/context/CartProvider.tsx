import type { CartItemType } from "@/types/CartItem";
import { type PropsWithChildren, createContext, useEffect, useState } from "react";

type CartHandlers = {
	getQuantity: (id: number) => number;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
	removeItem: (id: number) => void;
	totalQuantity: number;
	totalItems: CartItemType[];
};

export const CartContext = createContext({} as CartHandlers);

export function CartProvider({ children }: PropsWithChildren) {
	const dataStorageCart = localStorage.getItem("cartItems");
	const localStorageCart = JSON.parse(dataStorageCart || "[]");
	const [cartItems, setCartItems] = useState<CartItemType[]>(localStorageCart);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		const data = localStorage.getItem("cartItems");
		setCartItems(JSON.parse(data || "[]"));
	}, []);

	const totalQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
	function getQuantity(id: number) {
		return cartItems.find(item => item.id === id)?.quantity || 0;
	}

	function increaseQuantity(id: number) {
		if (cartItems.find(it => it.id === id) == null) {
			setCartItems(curItems => {
				return [...curItems, { id: id, quantity: 1 }];
			});
		} else {
			setCartItems(curItems => {
				return curItems.map(it => {
					if (it.id === id) {
						return { ...it, quantity: it.quantity + 1 };
					} else {
						return it;
					}
				});
			});
		}

	}

	function decreaseQuantity(id: number) {
		if (cartItems.find(it => it.id === id)?.quantity === 1) {
			setCartItems(curItems => curItems.filter(it => it.id !== id));
		} else {
			setCartItems(curItems => {
				return curItems.map(it => {
					if (it.id === id) {
						return { ...it, quantity: it.quantity - 1 };
					} else {
						return it;
					}
				});
			});
		}

	}

	function removeItem(id: number) {
		setCartItems(curItems => curItems.filter(it => it.id !== id));

	}

	return (
		<CartContext.Provider value={{ getQuantity, increaseQuantity, decreaseQuantity, removeItem, totalQuantity, totalItems: cartItems }}>
			{children}
		</CartContext.Provider>
	);
}