import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

export const HEADER_MENU_ITEMS: { label: string, link: string; }[] = [
	{ label: "Catálogo", link: "/catalogo" },
	{ label: "Nosotros", link: "#" },
	{ label: "Contacto", link: "#" },
];

interface HeaderMenuProps {
	onMenuClick: () => void;
}

export default function HeaderMenu({ onMenuClick }: HeaderMenuProps) {

	return (
		<>
			<div className="hidden md:flex items-center gap-1">
				{
					HEADER_MENU_ITEMS.map((item) => (
						<Link key={item.label} className="px-4 py-1 rounded-full bg-transparent hover:bg-neutral-100 transition-all duration-300" to={item.link}>{item.label}</Link>
					))
				}
			</div>
			<button className="flex md:hidden items-center justify-center size-8" onClick={() => onMenuClick()}>
				<FiMenu className="w-6 h-6" />
			</button>
			{/* <div className={`absolute h-screen w-screen max-w-120 top-0 right-0 bg-white z-50 transition-all duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
				<div className="flex flex-col gap-4 p-4">
					{
						menuItems.map((item) => (
							<Link key={item.label} className="px-4 py-1 rounded-full bg-transparent hover:bg-neutral-100 transition-all duration-300" to={item.link}>{item.label}</Link>
						))
					}
				</div>
			</div> */}
		</>
	);
}
