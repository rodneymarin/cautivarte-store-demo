import { type PropsWithChildren } from "react";

interface SidebarNavProps {
	className?: string,
}

export default function SidebarNav({ className, children }: PropsWithChildren<SidebarNavProps>) {
	return (
		<ul className={`flex flex-col gap-2 w-full bg-white border border-neutral-200 rounded-3xl p-4 ${className}`}>
			{children}
		</ul>
	);

}