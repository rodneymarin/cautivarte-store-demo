import logo from "@/assets/logo-cautivarte.svg";
import CartButton from "@/components/CartButton";
import HeaderMenuOptions from "@/components/HeaderMenuOptions";
import useRenderComponentDelay from "@/hooks/useRenderComponentDelay";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function HeaderNav() {
	const [isMobileMenuOpen, setIsMobileMenuOpen, isMobileMenuMounted, setIsMobileMenuMounted] = useRenderComponentDelay();

	function handleMobileMenuClick() {
		setIsMobileMenuMounted(true);
	}

	function handleCloseMobileMenu() {
		setIsMobileMenuOpen(false);
	}

	return (
		<>
			<header className="w-full px-6 pt-6 pb-4 mb-8 rounded-b-3xl border-b border-l border-r border-neutral-200 bg-white shadow-[0_6px_60px_0px_rgba(0,0,0,0.15)] sticky top-0 z-20">
				<div className="h-full w-full flex justify-between">
					<Link to="/" className="h-12 pb-2">
						<img src={logo} alt="Cautivarte Logo" className="h-full w-auto" />
					</Link>
					<div className="flex flex-row-reverse md:flex-row items-end justify-end gap-4">
						<div className="flex items-center gap-1">
							<HeaderMenuOptions orientation="horizontal" />
							<button className="flex md:hidden items-center justify-center size-8" onClick={() => handleMobileMenuClick()}>
								<FiMenu className="w-6 h-6" />
							</button>
						</div>
						<CartButton />
					</div>
				</div>
			</header>
			{isMobileMenuMounted && (
				<>
					<div className={`absolute inset-0 bg-black/20 backdrop-blur-xs z-50 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMobileMenuOpen(false)}></div>
					<div className={`absolute h-screen w-screen max-w-60 top-0 right-0 bg-white z-50 transition-all duration-300 shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
						<HeaderMenuOptions orientation="vertical" onClose={handleCloseMobileMenu} />
					</div>
				</>
			)
			}
		</>
	);
}
