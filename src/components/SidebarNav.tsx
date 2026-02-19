import { PropsWithChildren } from "react";

interface SidebarNavProps {
	title?: string,
	className?: string,
}

export default function SidebarNav(props: PropsWithChildren<SidebarNavProps>) {
	return (
		<div className={"min-h-32 flex flex-col gap-3 w-full " + props.className} onClick={(e) => e.stopPropagation()}>
			{props.title && <h2 className="text-xl font-bold text-center">{props.title}</h2>}
			<ul className="flex flex-col gap-2 w-full bg-white border border-neutral-200 rounded-3xl p-4">
				{props.children}
			</ul>
		</div>
	);

}
