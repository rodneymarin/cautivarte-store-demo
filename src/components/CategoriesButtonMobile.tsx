import { useContext } from "react";
import { SelectedCategoryContext } from "../context/SelectedCategoryProvider";
import { HiMenu } from "react-icons/hi";

interface CategoriesButtonMobileProps {
	onClick: () => void,
}
export default function CategoriesButtonMobile(props: CategoriesButtonMobileProps) {
	//const [isVisible, setIsVisible] = useState<boolean>(false);
	const { selectedCategory } = useContext(SelectedCategoryContext);
	//const menuVisible = location.pathname.includes("/catalogo");
	function getCaption(): string {
		if (selectedCategory.id === 999) {
			return "Filtrar por categoría";
		}
		else {
			return "Viendo categoría " + selectedCategory.name;
		}
	}

	return (
		<>
			<button
				className="md:hidden py-4 px-10 flex justify-between items-center w-full border border-neutral-200 rounded-full bg-white hover:bg-brand-primary hover:text-white"
				onClick={() => props.onClick()}
			>{getCaption()} <HiMenu />
			</button>
			{/* <div className={`${isVisible ? "flex" : "hidden"} absolute`}>
        <CategoriesNavMobile onClose={() => setIsVisible(false)} />
      </div> */}
		</>
	);
}
