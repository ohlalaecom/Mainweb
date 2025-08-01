// ✅ useGetProductByBrandSlug.js
import { useEffect, useState } from 'react';
import { getStrapiEntryBySlugService } from '~/services/strapi/strapiQueryServices';

const COLLECTION_TYPE = 'product-brands';

export default function useGetProductByBrandSlug(slug, excludeProductId = null) {
    const [loading, setLoading] = useState(true);
    const [brandData, setBrandData] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const query = {
                populate: {
                    products: {
                        populate: {
                            thumbnail: { populate: '*' },
                            images: { populate: '*' },
                            product_categories: { populate: '*' },
                        },
                    },
                },
                pagination: {
                    pageSize: 100,
                },
                sort: ['id:desc'],
            };
            const res = await getStrapiEntryBySlugService(COLLECTION_TYPE, slug, query);
            setBrandData(res);

            // Exclude current product from result
            const allProducts = res?.attributes?.products?.data || [];
            const filtered = excludeProductId
                ? allProducts.filter(p => p.id !== excludeProductId)
                : allProducts;
            setFilteredProducts(filtered);

            setLoading(false);
        };

        if (slug) fetchData();
    }, [slug, excludeProductId]);

    return {
        loading,
        brandData,
        products: filteredProducts,
    };
}
