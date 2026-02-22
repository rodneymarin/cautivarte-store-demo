import type { CartItemType } from "@/types/CartItem";
import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type CartHandlers = {
	getQuantity: (productCode: string) => number;
	increaseQuantity: (productCode: string) => void;
	decreaseQuantity: (productCode: string) => void;
	removeItem: (productCode: string) => void;
	totalQuantity: number;
	cartItems: CartItemType[];
};

export const CartContext = createContext({} as CartHandlers);

export function CartProvider({ children }: PropsWithChildren) {
	const dataStorageCart = localStorage.getItem("cartItems");
	const localStorageCart = JSON.parse(dataStorageCart || "[]");
	const [cartItems, setCartItems] = useState<CartItemType[]>(localStorageCart);
	const totalQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		const data = localStorage.getItem("cartItems");
		setCartItems(JSON.parse(data || "[]"));
	}, []);

	function getQuantity(productCode: string) {
		return cartItems.find(item => item.productCode === productCode)?.quantity || 0;
	}

	function increaseQuantity(productCode: string) {
		if (!cartItems.find(it => it.productCode === productCode)) {
			setCartItems(currentItems => {
				return [...currentItems, { productCode, quantity: 1 }];
			});
		} else {
			setCartItems(currentItems => {
				return currentItems.map(item => {
					if (item.productCode === productCode) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			});
		}
	}

	function decreaseQuantity(productCode: string) {
		if (cartItems.find(item => item.productCode === productCode)?.quantity === 1) {
			setCartItems(currentItems => currentItems.filter(item => item.productCode !== productCode));
		} else {
			setCartItems(currentItems => {
				return currentItems.map(item => {
					if (item.productCode === productCode) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			});
		}

	}

	function removeItem(productCode: string) {
		setCartItems(curItems => curItems.filter(item => item.productCode !== productCode));

	}

	return (
		<CartContext.Provider value={{ getQuantity, increaseQuantity, decreaseQuantity, removeItem, totalQuantity, cartItems }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	return useContext(CartContext);
}