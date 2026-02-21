import { Link, type To } from "react-router-dom";
import { type Category } from "../types/Category";

interface CategoryCardProps {
	category: Category,
	linkTo: To,
}

export default function CategoryCard({ category, linkTo }: CategoryCardProps) {
	return (
		<Link
			to={linkTo}
			className="px-4 py-3 bg-white hover:bg-neutral-200 hover:cursor-pointer flex flex-row gap-3">
			<div className="w-full flex flex-row items-center gap-3">
				<div className="w-full text-ellipsis overflow-hidden">
					{category.name}
				</div>
			</div>
		</Link>
	);
}
