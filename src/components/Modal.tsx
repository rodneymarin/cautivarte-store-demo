import { type PropsWithChildren } from "react";

interface ModalProps {
	onClick?: () => void;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
	//if (!props.isVisible) return null;
	return (
		<div className="w-screen h-screen bg-stone-600/75 fixed inset-0 flex z-50"
			onClick={() => { props.onClick && props.onClick(); }}
		>
			{props.children}
		</div>
	);
}

