import React, { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';
import useGetProducCollection from '~/hooks/useGetProducCollection';

const NewArrivals = ({ collectionSlug }) => {
    const { collectionLoading, collectionDetail } = useGetProducCollection(collectionSlug);

    // Extract categories for links
    const categories = useMemo(() => {
        if (!collectionDetail) return [];
        return collectionDetail.attributes.product_categories?.data || [];
    }, [collectionDetail]);

    // Extract product list
    const products = useMemo(() => {
        if (!collectionDetail) return [];
        return collectionDetail.attributes?.products?.data || [];
    }, [collectionDetail]);

    // Because ProductGroupWithCarousel expects products (with .attributes), no extra filtering necessary here
    // Just pass the products array directly.

    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>Hot New Arrivals</h3>
                    <ul className="ps-section__links">
                        {categories.map(category => (
                            <li key={category.id}>
                                <Link href={'/shop'}>
                                    {category.attributes.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href={'/shop'}>View All</Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">
                    {collectionLoading ? (
                        <p>Loading...</p>
                    ) : products.length > 0 ? (
                        <ProductGroupWithCarousel
                            products={products}
                            fullwidth
                        />
                    ) : (
                        <p>No product found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
