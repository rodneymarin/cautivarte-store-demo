import { useEffect, useState } from "react";
import { type Category } from "../types/category";
import { ApiEndpoints } from "../types/api";

export default function useFetchCategory(id?: number): {
	category: Category | null,
	allCategories: Category[] | null,
	setCategory: React.Dispatch<React.SetStateAction<Category | null>>,
	updateCategory: (category: Category, callResult?: () => void) => void,
	insertCategory: (category: Category, callResult?: () => void) => void,
	deleteCategory: (category: Category, callResult?: () => void) => void,
	getAllCategories: () => void;
	isLoadingCategories: boolean,
} {
	const [category, setCategory] = useState<Category | null>(null);
	const [allCategories, setAllCategories] = useState<Category[] | null>(null);
	const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);

	//GET 1 by id
	useEffect(() => {
		if (!id) return;
		setIsLoadingCategories(true);
		try {
			fetch(ApiEndpoints.categoryById + id, {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
				.then(res => res.json())
				.then(data => {
					setCategory(data[0] as Category);
					setIsLoadingCategories(false);
				});
		} catch (err) {
			console.log(err);
		}
	}, [id]);

	function updateCategory(category: Category, callResult?: () => void) {
		try {
			fetch(ApiEndpoints.categoryById + category.id, {
				method: "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: category.name }),
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

	function insertCategory(category: Category, callResult?: () => void) {
		try {
			fetch(ApiEndpoints.categoryById, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: category.name }),
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

	function deleteCategory(category: Category, callResult?: () => void) {
		try {
			fetch(ApiEndpoints.categoryById + category.id, {
				method: "DELETE",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
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

	function getAllCategories() {
		setIsLoadingCategories(true);
		try {
			fetch(ApiEndpoints.categories, {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
				.then(res => res.json())
				.then(data => {
					setIsLoadingCategories(false);
					setAllCategories(data as Category[]);
				});
		} catch (err) {
			console.log(err);
		}
	}

	return { category, allCategories, getAllCategories, setCategory, updateCategory, insertCategory, deleteCategory, isLoadingCategories };
}