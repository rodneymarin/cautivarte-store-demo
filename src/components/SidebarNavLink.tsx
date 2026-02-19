import { PropsWithChildren } from "react";
import { NavLink, To } from "react-router-dom";

interface SidebarLinkProps {
	linkTo: To,
	alignCenter?: boolean,
	className?: string,
	onClick?: () => void,
}
export default function SidebarNavLink(props: PropsWithChildren<SidebarLinkProps>) {
	return (
		<NavLink to={props.linkTo}
			className={({ isActive }) => {
				const select = isActive ? "bg-brand-primary hover:bg-brand-primary text-white" : "hover:bg-neutral-200";
				return `${select} chip flex flex-col justify-center w-full ${props.alignCenter ? "text-center" : "text-start"} ${props.className}`;
			}}
			onClick={() => props.onClick && props.onClick()}
		>
			{props.children}
		</NavLink>
	);
}