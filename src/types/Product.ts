import { type Category } from "./Category";

export interface Product {
	id: number,
	productCode: string,
	imageFiles: string[],
	name: string,
	description: string,
	price: number,
	stock: number,
	isPromo: boolean;
}

export interface ProductData {
	id: number,
	product_code: string,
	image_files: string,
	name: string,
	description: string,
	price: number,
	stock: number,
	is_promo: boolean,
}

export function mapDataToProduct(data: ProductData): Product {
	return {
		id: data.id,
		productCode: data.product_code,
		imageFiles: data.image_files.split(","),
		name: data.name,
		description: data.description,
		price: data.price,
		stock: data.stock,
		isPromo: data.is_promo,
	};
}