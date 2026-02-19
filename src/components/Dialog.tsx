import { type PropsWithChildren } from "react";
import Modal from "./Modal";

interface DialogProps {
	title: string,
	onClose?: () => void,
}
export default function Dialog(props: PropsWithChildren<DialogProps>) {
	return (
		<Modal onClick={() => props.onClose && props.onClose()}>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-120 mx-6 my-auto md:mx-auto h-fit min-h-20 bg-white rounded-3xl py-6 px-8 text-center">
				<h3 className="font-bold text-xl">{props.title}</h3>
				{props.children}
			</div>
		</Modal>
	);
}
