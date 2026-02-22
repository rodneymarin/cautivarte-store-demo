import { type PropsWithChildren } from "react";

interface ModalProps {
	onClick?: () => void;
}

export default function Modal({ children, onClick }: PropsWithChildren<ModalProps>) {
	//if (!props.isVisible) return null;
	return (
		<div className="w-screen h-screen bg-black/20 backdrop-blur-xs fixed inset-0 flex items-center justify-center z-100"
			onClick={() => { onClick && onClick(); }}
		>
			{children}
		</div>
	);
}

