import { CartProvider } from "@/context/CartProvider";
import { AppProvider } from "@/context/AppContext";
import PageCart from "@/pages/Cart";
import PageCatalog from "@/pages/Catalog";
import PageHome from "@/pages/Home";
import LandingLayout from "@/pages/LandingLayout";
import PageProduct from "@/pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SelectedCategoryProvider, { SelectedCategoryContext } from "@/context/SelectedCategoryProvider";

function App() {

	return (
		<AppProvider>
			<CartProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingLayout />}>
							<Route index element={<PageHome />} />
							<Route path="catalogo" element={<SelectedCategoryProvider ><PageCatalog /></SelectedCategoryProvider>} />
							<Route path="producto/:cod" element={<PageProduct />} />
							<Route path="carrito" element={<PageCart />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</AppProvider>
	);
}

export default App;
