import type { MouseEventHandler } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export const HEADER_MENU_ITEMS: { label: string, link: string; }[] = [
	{ label: "Catálogo", link: "/catalogo" },
	{ label: "Nosotros", link: "#" },
	{ label: "Contacto", link: "#" },
];

interface HeaderMenuProps {
	onClose?: () => void;
	orientation: "horizontal" | "vertical";
}

export default function HeaderMenuOptions({ onClose, orientation }: HeaderMenuProps) {

	return (
		orientation === "vertical" ? (
			<div className="relative flex md:hidden flex-col gap-2 p-2">
				<div className="size-6 flex items-center justify-center absolute top-4 right-4" onClick={() => onClose && onClose()}>
					<FiX className="w-4 h-4" />
				</div>
				{
					HEADER_MENU_ITEMS.map((item) => (
						<Link key={item.label} className="p-4 w-full" to={item.link}>{item.label}</Link>
					))
				}
			</div>
		) : (
			<div className="hidden md:flex items-center gap-1">
				{
					HEADER_MENU_ITEMS.map((item) => (
						<Link key={item.label} className="px-4 py-1 rounded-full bg-transparent hover:bg-neutral-100 transition-all duration-300" to={item.link}>{item.label}</Link>
					))
				}
			</div>
		)
	);
}
