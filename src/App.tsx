import { AppProvider } from "@/context/AppContext";
import { CartProvider } from "@/context/CartProvider";
import SelectedCategoryProvider from "@/context/SelectedCategoryProvider";
import PageCart from "@/pages/Cart";
import PageCatalog from "@/pages/Catalog";
import PageHome from "@/pages/Home";
import Layout from "@/pages/Layout";
import PageProduct from "@/pages/Product";
import NotFound from "@/pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

	return (
		<AppProvider>
			<CartProvider>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<PageHome />} />
							<Route path="catalogo" element={<SelectedCategoryProvider ><PageCatalog /></SelectedCategoryProvider>} />
							<Route path="producto/:cod" element={<PageProduct />} />
							<Route path="carrito" element={<PageCart />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</AppProvider>
	);
}

export default App;
