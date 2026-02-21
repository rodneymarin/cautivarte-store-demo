import { type PropsWithChildren } from "react";

interface SidebarButtonProps {
	selected?: boolean,
	onClick?: () => void,
	alignCenter?: boolean,
	className?: string,
}
export default function SidebarNavButton(props: PropsWithChildren<SidebarButtonProps>) {
	return (
		<button className={`px-4 py-1 rounded-full w-full cursor-pointer transition-all duration-300 ${props.selected ? "bg-accent-primary text-accent-primary-foreground" : "bg-transparent hover:bg-neutral-200"} ${props.alignCenter ? "text-center" : "text-start"} ${props.className}`} onClick={() => props.onClick && props.onClick()}>
			{props.children}
		</button>
	);
}
