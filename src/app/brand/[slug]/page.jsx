'use client';
import React, { useMemo, useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import { useParams } from 'next/navigation';
import ProductItems from '~/components/partials/product/ProductItems';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

export default function BrandPage() {
    const { slug } = useParams(); // Get slug from the URL
    const [loading, setLoading] = useState(true);
    const [brandDetails, setBrandDetails] = useState(null);
    const [products, setProducts] = useState([]);

    // Fetch brand and products data
    useEffect(() => {
        const fetchBrandAndProducts = async () => {
            try {
                setLoading(true);

                // Fetch brand details
                const brandResponse = await fetch(
                    `https://admin.jacobs-electronics.com/api/product-brands?filters[slug][$eq]=${slug}`
                );
                const brandData = await brandResponse.json();
                const brand = brandData?.data?.[0]?.attributes || null;
                setBrandDetails(brand);

                // Fetch products associated with the brand
                if (brand) {
                    const productsResponse = await fetch(
                        `https://admin.jacobs-electronics.com/api/products?filters[product_brand][slug][$eq]=${slug}&populate[thumbnail]=true&populate[images]=true&populate[attributes]=true`
                    );
                    const productsData = await productsResponse.json();
                    setProducts(productsData?.data || []);
                }
            } catch (error) {
                console.error('Error fetching brand or products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrandAndProducts();
    }, [slug]);

    // Define the breadcrumb dynamically based on fetched data
    const breadCrumb = useMemo(
        () => [
            { text: 'Home', url: '/' },
            { text: 'Shop', url: '/' },
            { text: brandDetails?.title || 'Product Brand' }, // Use title field for breadcrumb
        ],
        [brandDetails]
    );

    // Render product content conditionally
    const productContent = useMemo(() => {
        if (loading) return <p>Loading...</p>;
        if (!brandDetails || products.length === 0) {
            return <p>No products found for this brand.</p>;
        }
        return <ProductItems columns={4} products={products} />;
    }, [loading, brandDetails, products]);

    // Render the page
    return (
        <PageContainer
            footer={<FooterDefault />}
            title={brandDetails?.title || 'Brand'} // Use title field for page title
            boxed={true}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            <WidgetShopBrands />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <h3 className="ps-shop__heading">
                                {brandDetails?.title || 'Product Brand'} {/* Use title field */}
                            </h3>
                            {productContent}
                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
