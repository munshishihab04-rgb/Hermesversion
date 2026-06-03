
import React, { useState, useCallback, useMemo, memo } from 'react';

interface AppImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    fill?: boolean;
    sizes?: string;
    onClick?: () => void;
    fallbackSrc?: string;
    loading?: 'lazy' | 'eager';
    unoptimized?: boolean;
    [key: string]: any;
}

const AppImage = memo(function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    placeholder: _placeholder = 'empty',
    blurDataURL: _blurDataURL,
    fill = false,
    sizes: _sizes,
    onClick,
    fallbackSrc = '/assets/images/no_image.png',
    loading = 'lazy',
    unoptimized: _unoptimized,
    quality: _quality,
    ...props
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    }, [hasError, imageSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    const imageClassName = useMemo(() => {
        const classes = [className];
        if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
        return classes.filter(Boolean).join(' ');
    }, [className, onClick]);

    if (fill) {
        return (
            <div className="relative" style={{ width: '100%', height: '100%' }}>
                <img
                    src={imageSrc}
                    alt={alt}
                    className={imageClassName + ' w-full h-full'}
                    onError={handleError}
                    onLoad={handleLoad}
                    onClick={onClick}
                    style={{ position: 'absolute', inset: 0 }}
                />
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            width={width || 400}
            height={height || 300}
            className={imageClassName}
            loading={priority ? 'eager' : loading}
            onError={handleError}
            onLoad={handleLoad}
            onClick={onClick}
            {...props}
        />
    );
});

AppImage.displayName = 'AppImage';

export default AppImage;
