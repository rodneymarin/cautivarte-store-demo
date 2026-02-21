import { useContext, useEffect, useState } from "react";
import { type Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { SelectedCategoryContext } from "../context/SelectedCategoryProvider";
import CategoriesButtonMobile from "../components/CategoriesButtonMobile";
import { type Category } from "../types/Category";
import SidebarNav from "../components/SidebarNav";
import SidebarNavButton from "../components/SidebarNavButton";
import Modal from "../components/Modal";
import { useApp } from "@/context/AppContext";

export default function PageCatalog() {
	const { fetchProductsByCategory, fetchCategories } = useApp();
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const { selectedCategory, setSelectedCategory } = useContext(SelectedCategoryContext);
	const [isVisibleCaregoriesMobile, setIsVisibleCategoriesMobile] = useState<boolean>(false);

	//obtener categorías
	useEffect(() => {
		fetchCategories()
			.then((data: Category[]) => {
				setCategories([{ id: 999, name: "Todos" }, ...data]);
			});
	}, []);

	//obtener productos
	useEffect(() => {
		fetchProductsByCategory(selectedCategory.id)
			.then((data: Product[]) => {
				setProducts(data);
			});
	}, [selectedCategory]);

	function handleSelectCategory(category: Category) {
		setSelectedCategory(category);
		setIsVisibleCategoriesMobile(false);
	}

	return (
		<main className="flex flex-row gap-4 pb-12">
			<div className="w-60 flex-col md:block hidden">
				{
					categories.length === 1 ?
						(<p className="text-neutral-200">Cargando...</p>)
						: (<SidebarNav title="Categorías">
							{
								categories.map(cat => (
									<SidebarNavButton key={cat.id} selected={selectedCategory.id === cat.id} onClick={() => handleSelectCategory(cat)}>{cat.name}</SidebarNavButton>
								))
							}
						</SidebarNav>)
				}
			</div>
			<div className="w-full flex flex-col gap-3">
				{
					products.length < 1 ?
						(<p className="text-neutral-200">Cargando...</p>) :
						(
							<>
								<CategoriesButtonMobile onClick={() => setIsVisibleCategoriesMobile(true)} />
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{
										products.map((item) => {
											return <ProductCard
												isVertical
												key={item.id}
												product={item}
											/>;
										})
									}
								</div>
								<div className="block md:hidden">
									{
										isVisibleCaregoriesMobile &&
										<Modal onClick={() => setIsVisibleCategoriesMobile(false)}>
											<SidebarNav className="px-6 mt-28">
												{
													categories.map(cat => (
														<SidebarNavButton key={cat.id} alignCenter className="h-16" selected={selectedCategory.id === cat.id} onClick={() => handleSelectCategory(cat)}>{cat.name}</SidebarNavButton>
													))
												}
											</SidebarNav>
										</Modal>
									}
								</div>
							</>
						)
				}
			</div>
		</main>
	);
}