import { PropsWithChildren } from "react";

interface SidebarButtonProps {
	selected?: boolean,
	onClick?: () => void,
	alignCenter?: boolean,
	className?: string,
}
export default function SidebarNavButton(props: PropsWithChildren<SidebarButtonProps>) {
	return (
		<button className={`chip w-full ${props.selected ? "bg-brand-primary hover:bg-brand-primary text-white" : "hover:bg-neutral-200"} ${props.alignCenter ? "text-center" : "text-start"} ${props.className}`} onClick={() => props.onClick && props.onClick()}>
			{props.children}
		</button>
	);
}
