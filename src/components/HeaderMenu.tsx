import { Link } from "react-router-dom";

const menuItems: { label: string, link: string; }[] = [
	{ label: "Catálogo", link: "/catalogo" },
	{ label: "Nosotros", link: "#" },
	{ label: "Contacto", link: "#" },
];

export default function HeaderMenu() {

	return (
		<div className="flex items-center gap-1">
			{
				menuItems.map((item) => (
					<Link key={item.label} className="px-4 py-1 rounded-full bg-transparent hover:bg-neutral-100 transition-all duration-300" to={item.link}>{item.label}</Link>
				))
			}
		</div>
	);
}
