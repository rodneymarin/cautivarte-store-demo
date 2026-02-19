import { Link } from "react-router-dom";

interface CatalogoButtonProps {
	colorType: "brow" | "green",
}
export function CatalogoButton(props: CatalogoButtonProps) {

	return (
		<Link
			to="/catalogo"
			className={`chip ${props.colorType === "brow" ? "md:hover-brand-secondary-darker bg-brand-secondary" : "md:hover-brand-secondary-darker bg-brand-primary"}  text-white font-bold`}
		>Ver Catálogo</Link>
	);
}
