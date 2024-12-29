// Function to format numbers into currency style
export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}

// Function to get a collection by its slug
export function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find(
            (item) => item.slug === slug.toString()
        );
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

// Function to get an item by its slug
export function getItemBySlug(banners, slug) {
    if (banners.length > 0) {
        const banner = banners.find((item) => item.slug === slug.toString());
        if (banner !== undefined) {
            return banner;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

// Function to get the full image URL for Strapi images
export function getStrapiImageURL(source, format, inArray = false) {
    const attributes = inArray ? source?.attributes : source?.data?.attributes;
    const imageUrl = attributes?.formats?.[format]?.url || attributes?.url;

    return imageUrl
        ? `${process.env.NEXT_PUBLIC_API_PATH}${imageUrl}`
        : '/static/img/products/martfury-product-placeholder.svg';
}
