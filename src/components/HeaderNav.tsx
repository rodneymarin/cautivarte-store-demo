import logo from "@/assets/logo-cautivarte.svg";
import CartButton from "@/components/CartButton";
import HeaderMenu from "@/components/HeaderMenu";
import useRenderComponentDelay from "@/hooks/useRenderComponentDelay";
import { Link } from "react-router-dom";

export default function HeaderNav() {
	const [isOpen, setIsOpen, isMounted, setIsMounted] = useRenderComponentDelay();

	function handleMenuClick() {
		setIsMounted(true);
	}

	return (
		<>
			<header className="w-full px-6 pt-6 pb-4 mb-8 rounded-b-3xl border-b border-l border-r border-neutral-200 bg-white shadow-[0_6px_60px_0px_rgba(0,0,0,0.15)] sticky top-0 z-20">
				<div className="h-full w-full flex justify-between">
					<Link to="/" className="h-12 pb-2">
						<img src={logo} alt="Cautivarte Logo" className="h-full w-auto" />
					</Link>
					<div className="flex flex-row-reverse md:flex-row items-end justify-end gap-4">
						<HeaderMenu onMenuClick={handleMenuClick} />
						<CartButton />
					</div>
				</div>
			</header>
			{isMounted && (
				<>
					<div className={`absolute inset-0 bg-black/20 backdrop-blur-xs z-50 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)}></div>
					<div className={`absolute h-screen w-screen max-w-120 top-0 right-0 bg-white z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

					</div>
				</>
			)
			}
		</>
	);
}
