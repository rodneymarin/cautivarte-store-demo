import { useEffect, useState } from "react";

type RenderComponentDelayType = [isOpen: boolean, setIsOpen: (isOpen: boolean) => void, isMounted: boolean, setIsMounted: (isMounted: boolean) => void];

export default function useRenderComponentDelay(): RenderComponentDelayType {
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isMounted) {
			setIsOpen(true);
		}
	}, [isMounted]);

	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				setIsMounted(false);
			}, 300);
		}
	}, [isOpen]);

	return [isOpen, setIsOpen, isMounted, setIsMounted];
}