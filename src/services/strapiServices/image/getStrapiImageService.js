const imageBaseURL = process.env.NEXT_PUBLIC_API_PATH;

export const getStrapiImageURL = (source, format, inArray = false) => {
    const attributes = inArray ? source?.attributes : source?.data?.attributes;
    const imageUrl = attributes?.formats?.[format]?.url || attributes?.url;

    if (imageUrl) {
        const fullUrl = `${imageBaseURL}${imageUrl}`;
        // Check if the URL is accessible, if not return fallback
        // For now, we'll assume the URL is valid and handle 404s in the component
        return fullUrl;
    }

    return '/static/img/products/martfury-product-placeholder.svg';
};
