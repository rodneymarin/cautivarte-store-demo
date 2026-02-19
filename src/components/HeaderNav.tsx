import logo from "@/assets/logo-cautivarte.svg";
import CartButton from "@/components/CartButton";
import HeaderMenu from "@/components/HeaderMenu";
import { Link } from "react-router-dom";

export default function HeaderNav() {


	return (
		<header className="w-full px-6 pt-6 pb-4 mb-8 rounded-b-3xl border-b border-l border-r border-neutral-200 bg-white shadow-[0_6px_60px_0px_rgba(0,0,0,0.15)] sticky top-0 z-20">
			<div className="h-full w-full flex justify-between">
				<Link to="/" className="h-12 pb-2">
					<img src={logo} alt="Cautivarte Logo" className="h-full w-auto" />
				</Link>
				<div className="flex items-end justify-end gap-4">
					<HeaderMenu />
					<CartButton />
				</div>
			</div>

		</header>
	);
}
