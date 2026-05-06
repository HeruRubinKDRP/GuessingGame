import { useEffect, useState } from "react";

/**
 * ImageWithPreview
 *
 * Shows a low-res preview first, then swaps to the full image
 * once the full image has finished loading.
 *
 * Props:
 * - src: full-resolution image path s o it can work with asset imports or public url
 * - alt: alt text for accessibility req
 * - previewSrc: low-resolution preview image or SVG/data URL
 * - className: optional extra class for the wrapper
 * - imgClassName: optional extra class for the <img> itself
 */
export default function ImageWithPreview({
                                             src,
                                             alt,
                                             previewSrc,
                                             className = "",
                                             imgClassName = ""
                                         }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Reset loading state whenever the src changes
        setIsLoaded(false);

        // Preload the main image in memory
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <div className={`image-with-preview ${className}`.trim()}>
            {/* Preview layer */}
            {!isLoaded && previewSrc && (
                <img
                    src={previewSrc}
                    alt=""
                    aria-hidden="true"
                    className={`image-preview ${imgClassName}`.trim()}
                />
            )}

            {/* Full image layer */}
            <img
                src={src}
                alt={alt}
                className={`image-full ${isLoaded ? "loaded" : ""} ${imgClassName}`.trim()}
            />
        </div>
    );
}