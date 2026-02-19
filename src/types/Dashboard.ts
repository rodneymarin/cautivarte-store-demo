import { type To } from "react-router-dom";

export interface DashboardNavItem {
	name: string,
	route: To,
}

export const DASHBOARD_ITEMS: DashboardNavItem[] = [
	{ route: "productos", name: "Productos" },
	{ route: "categorias", name: "Categorías" },
	{ route: "contenidos", name: "Contenidos" },
];