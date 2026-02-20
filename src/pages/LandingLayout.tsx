import { Outlet } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";


export default function LandingLayout() {

	return (
		<div className="xl:mx-auto mx-6 max-w-6xl">
			{/* <HeaderNav>
				<Link to="/" className="h-12 pb-2">
					<img src={logo} alt="Cautivarte Logo" className="h-full w-auto" />
				</Link>
				<div className="flex items-end justify-end gap-4">
					<HeaderMenu />
					<CartButton />
				</div>
			</HeaderNav> */}
			<HeaderNav />
			<Outlet />
			<section className="w-full xl:px-0 max-w-6xl mx-auto text-center py-8 md:py-16 border-t border-neutral-200">
				<p>
					&copy;2024 Cautivarte Accesorios
				</p>
				<p>
					Website desarrollado por <a href="https://rodneymarin.com" className="text-brand-secondary font-bold">Rodney Marin</a>
				</p>
			</section>
		</div>
	);
}
