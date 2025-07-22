import React, { useState, useEffect, useRef } from 'react';

interface ImageOptions {
    className?: string;
    alt?: string;
    style?: React.CSSProperties;
    id?: string;
    placeholder?: string;
    onError?: (error: Error) => void;
}

interface AttachmentImageLoaderProps {
    authToken: string;
    imageUrl: string;
    options?: ImageOptions;
}

const AttachmentImageLoader: React.FC<AttachmentImageLoaderProps> = ({
    authToken,
    imageUrl,
    options = {},
}) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const blobUrlRef = useRef<string | null>(null);

    useEffect(() => {
        // Clean up previous blob URL
        if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current);
            blobUrlRef.current = null;
        }

        const loadImage = async () => {
            // Reset error state
            setError(null);

            try {
                console.log(imageUrl, "imageUrl");
                
                // Use fetch instead of axios for better blob handling
                const response = await fetch(imageUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        Accept: 'image/*',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                // Convert response to blob
                const blob = await response.blob();
                
                // Check if blob is valid
                if (!blob || blob.size === 0) {
                    throw new Error('Invalid or empty image data received');
                }

                const objectUrl = URL.createObjectURL(blob);
                
                // Store the blob URL reference for cleanup
                blobUrlRef.current = objectUrl;
                
                // Set the blob URL to state
                setImgSrc(objectUrl);
                
            } catch (err) {
                console.error('Error loading authenticated image:', err);
                setError(err instanceof Error ? err : new Error(String(err)));
                if (options.onError) options.onError(err instanceof Error ? err : new Error(String(err)));
            }
        };

        loadImage();

        // Cleanup function
        return () => {
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
                blobUrlRef.current = null;
            }
        };
    }, [authToken, imageUrl, options]);

    if (error) {
        return <div className='text-red-500'>خطای بارگذاری تصویر چک: {error.message}</div>;
    }

    if (!imgSrc) {
        return (
            <img
                ref={imgRef}
                src={
                    options.placeholder ||
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
                }
                className={options.className}
                alt={options.alt || 'Loading...'}
                style={options.style}
                id={options.id}
                onError={() => {
                    const err = new Error('Failed to load placeholder image');
                    setError(err);
                    if (options.onError) options.onError(err);
                }}
            />
        );
    }

    return (
        <img
            ref={imgRef}
            src={imgSrc}
            className={options.className}
            alt={options.alt || 'Attachment Image'}
            style={options.style}
            id={options.id}
            onError={() => {
                const err = new Error('Failed to load image from blob URL');
                setError(err);
                if (options.onError) options.onError(err);
            }}
        />
    );
};

export default AttachmentImageLoader;