import { type PropsWithChildren, createContext, useState } from "react";
import { type Category } from "../types/Category";

type SelectedCategoryContextType = {
	selectedCategory: Category;
	setSelectedCategory: (item: Category) => void;
};

export const SelectedCategoryContext = createContext({} as SelectedCategoryContextType);

export default function SelectedCategoryProvider(props: PropsWithChildren) {
	const [selectedCategory, setSelectedCategory] = useState<Category>({ id: 999, name: "Todos" });//todos

	return (
		<SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
			{props.children}
		</SelectedCategoryContext.Provider>
	);
}
