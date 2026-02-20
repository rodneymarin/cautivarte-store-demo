import { useEffect, useState } from "react";

export function useIsMobile() {
	const [width, setWidth] = useState(window.innerWidth);

	function setValues() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", () => setValues());
	}, []);

	const match: boolean = width < 768;

	return match;
}