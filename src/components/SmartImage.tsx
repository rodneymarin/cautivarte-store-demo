import { useEffect, useRef, useState } from "react";

type SmartImageProps = {
	src: string;
	className?: string;
	alt?: string;
	onLoad?: () => void;
};

export default function SmartImage({ src, className = "", alt = "", onLoad }: SmartImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const imgRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		setIsLoading(true);

		// If the image is already cached and complete, onLoad may have fired
		// before React attached the handler. Check the img element's `complete`
		// and `naturalWidth` to detect cached images and disable the loader.
		const checkCached = () => {
			const img = imgRef.current;
			if (img && img.complete && img.naturalWidth > 0) {
				setIsLoading(false);
			}
		};

		// Run after paint to ensure the ref is attached.
		const t = window.setTimeout(checkCached, 0);
		return () => window.clearTimeout(t);
	}, [src]);

	useEffect(() => {
		if (!isLoading) {
			onLoad?.();
		}
	}, [isLoading]);

	return (
		<div className={`relative ${className}`}>
			<div className={`absolute ${isLoading ? "opacity-100" : "opacity-0"} transition-all duration-700 top-0 left-0 w-full h-full flex items-center justify-center`} >
				<style>{`
					@keyframes dotPulse {
						0% { transform: scale(0.6); opacity: 0.6; }
						50% { transform: scale(1); opacity: 1; }
						100% { transform: scale(0.6); opacity: 0.6; }
					}
				`}</style>
				<div className="flex items-center space-x-2">
					<span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" style={{ animation: 'dotPulse 900ms infinite ease-in-out', animationDelay: '0ms' }} />
					<span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" style={{ animation: 'dotPulse 900ms infinite ease-in-out', animationDelay: '150ms' }} />
					<span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" style={{ animation: 'dotPulse 900ms infinite ease-in-out', animationDelay: '300ms' }} />
				</div>
			</div>

			<img
				ref={imgRef}
				src={src}
				alt={alt}
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
				className={`${isLoading ? "opacity-0" : "opacity-100"} transition-all duration-700 w-full h-full object-cover`}
			/>
		</div>
	);
}

