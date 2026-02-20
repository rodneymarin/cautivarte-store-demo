import { useContext, useEffect, useState } from "react";
import { type Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { SelectedCategoryContext } from "../context/SelectedCategoryProvider";
import CategoriesButtonMobile from "../components/CategoriesButtonMobile";
import { type Category } from "../types/category";
import SidebarNav from "../components/SidebarNav";
import SidebarNavButton from "../components/SidebarNavButton";
import Modal from "../components/Modal";

export default function PageCatalog() {
	const { selectedCategory, setSelectedCategory } = useContext(SelectedCategoryContext);
	const [products, setProducts] = useState<Product[]>([]);
	const allCategoryItem: Category = { id: 999, name: "Todos" };
	const [categories, setCategories] = useState<Category[]>([allCategoryItem]);
	const [isVisibleCaregoriesMobile, setIsVisibleCategoriesMobile] = useState<boolean>(false);

	//obtener categorías
	useEffect(() => {
		// try {
		// 	fetch(ApiEndpoints.categories)
		// 		.then(res => res.json())
		// 		.then((data: Category[]) => {
		// 			setCategories([allCategoryItem, ...data]);
		// 		});
		// } catch {
		// 	console.log("Error al conectar con API");
		// }
	}, []);

	//obtener productos
	useEffect(() => {
		// try {
		// 	if (selectedCategory.id === 999) {
		// 		fetch(ApiEndpoints.products)
		// 			.then(res => res.json())
		// 			.then((data: Product[]) => {
		// 				setProducts(data);
		// 			});
		// 	} else {
		// 		fetch(ApiEndpoints.productsByCategory + selectedCategory.id.toString())
		// 			.then(res => res.json())
		// 			.then((data: Product[]) => {
		// 				setProducts(data);
		// 			});
		// 	}
		// } catch (err) {
		// 	console.log(err);
		// }
	}, [selectedCategory.id]);

	function handleClickCategory(cat: Category) {
		setSelectedCategory(cat);
		setIsVisibleCategoriesMobile(false);
	}

	return (
		<main className="flex flex-row gap-4">
			<div className="w-1/4 flex-col md:block hidden">
				{
					categories.length === 1 ?
						(<p className="text-neutral-200">Cargando...</p>) :
						(<SidebarNav title="Categorías">
							{
								categories.map(cat => (
									<SidebarNavButton key={cat.id} selected={selectedCategory.id === cat.id} onClick={() => handleClickCategory(cat)}>{cat.name}</SidebarNavButton>
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
									{/* {
										products.map((item) => {
											return <ProductCard
												isVertical
												linkTo={"/producto/" + item.cod}
												key={item.cod}
												product={item}
											/>;
										})
									} */}
								</div>
								<div className="block md:hidden">
									{
										isVisibleCaregoriesMobile &&
										<Modal onClick={() => setIsVisibleCategoriesMobile(false)}>
											<SidebarNav className="px-6 mt-28">
												{
													categories.map(cat => (
														<SidebarNavButton key={cat.id} alignCenter className="h-16" selected={selectedCategory.id === cat.id} onClick={() => handleClickCategory(cat)}>{cat.name}</SidebarNavButton>
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