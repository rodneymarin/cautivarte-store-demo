import { useEffect, useState } from "react";
import { type Product, type Product_API_GET, type Product_API_POST } from "../types/Product";
import { ApiEndpoints } from "../types/api";
import { type Category } from "../types/category";

export default function useFetchProduct(cod: string): {
	product: Product | null,
	setProduct: React.Dispatch<React.SetStateAction<Product | null>>,
	updateProduct: (product: Product, callResult?: () => void) => void,
	insertProduct: (product: Product, callResult?: () => void) => void,
	deleteProduct: (product: Product, callResult?: () => void) => void,
	isLoadingProduct: boolean,
} {
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	//GET
	useEffect(() => {
		if (cod === "") return;
		setIsLoading(true);
		try {
			fetch(ApiEndpoints.productByCod + cod, {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
				.then(res => res.json())
				.then((data: Product_API_GET[]) => {
					const cat: Category[] = [];
					data.forEach(({ id_category, name_category }) => {
						cat.push({ id: id_category, name: name_category });
					});
					//const prod: Product = { ...data[0], categories: cat };
					const prod: Product = {
						id: data[0].id,
						cod: data[0].cod,
						image_files: data[0].image_files,
						name: data[0].name,
						technique: data[0].technique,
						description: data[0].description,
						price: data[0].price,
						stock: data[0].stock,
						categories: cat,
						is_promo: data[0].is_promo
					};
					setProduct(prod);
					setIsLoading(false);
				});
		} catch (err) {
			console.log(err);
		}
	}, [cod]);

	function convertToApiPost(product: Product): Product_API_POST {
		const categories: number[] = product.categories.map(value => value.id);
		const product_api: Product_API_POST = {
			id: product.id,
			cod: product.cod,
			image_files: product.image_files,
			name: product.name,
			technique: product.technique,
			description: product.description,
			price: product.price,
			stock: product.stock,
			is_promo: product.is_promo ? 1 : 0,
			categories: categories
		};
		return product_api;
	}

	function updateProduct(product: Product, callResult?: () => void) {
		const product_api = convertToApiPost(product);
		try {
			fetch(ApiEndpoints.productByCod + cod, {
				method: "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(product_api),
			})
				.then(res => res.json())
				.then(data => {
					console.log("update response ", data);
					callResult && callResult();
				});
		} catch (err) {
			console.log(err);
		}
	}

	function insertProduct(product: Product, callResult?: () => void) {
		const product_api = convertToApiPost(product);
		try {
			fetch(ApiEndpoints.productByCod, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(product_api),
			})
				.then(res => res.json())
				.then(data => {
					console.log("insert response ", data);
					callResult && callResult();
				});
		} catch (err) {
			console.log(err);
		}
	}

	function deleteProduct(product: Product, callResult?: () => void) {
		try {
			fetch(ApiEndpoints.productByCod + product.cod, {
				method: "DELETE",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json())
				.then(data => {
					console.log("delete response ", data);
					callResult && callResult();
				});
		} catch (err) {
			console.log(err);
		}
	}

	return { product, setProduct, updateProduct, insertProduct, deleteProduct, isLoadingProduct: isLoading };
}
