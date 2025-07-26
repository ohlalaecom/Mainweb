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

export default function ProductScreen() {
    const { slug } = useParams(); // Get slug from the URL
    const [loading, setLoading] = useState(true);
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [products, setProducts] = useState([]);

    // Fetch category and products data
    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                setLoading(true);

                // Fetch category details
                const categoryResponse = await fetch(
                    `http://157.230.29.110:1337/api/product-categories?filters[slug][$eq]=${slug}`
                );
                const categoryData = await categoryResponse.json();
                const category = categoryData?.data?.[0]?.attributes || null;
                setCategoryDetails(category);

                // Fetch products associated with the category
                if (category) {
                    // Fetch products associated with the category and include the thumbnail and images
                    const productsResponse = await fetch(
                        `http://157.230.29.110:1337/api/products?filters[product_categories][slug][$eq]=${slug}&populate[thumbnail]=true&populate[images]=true&populate[attributes]=true`
                    );

                    const productsData = await productsResponse.json();
                    console.log('Fetched products checking:', productsData?.data);
                    setProducts(productsData?.data || []);
                }
            } catch (error) {
                console.error('Error fetching category or products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryAndProducts();
    }, [slug]);

    // Define the breadcrumb dynamically based on fetched data
    const breadCrumb = useMemo(() => [
        { text: 'Home', url: '/' },
        { text: 'Shop', url: '/' },
        { text: categoryDetails?.title || 'Product Category' }, // Use title field for breadcrumb
    ], [categoryDetails]);

    // Render product content conditionally
    const productContent = useMemo(() => {
        if (loading) return <p>Loading...</p>;
        if (!categoryDetails || products.length === 0) {
            return <p>No products found in this category.</p>;
        }
        return <ProductItems columns={4} products={products} />;
    }, [loading, categoryDetails, products]);

    // Render the page
    return (
        <PageContainer
            footer={<FooterDefault />}
            title={categoryDetails?.title || 'Category'} // Use title field for page title
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
                                {categoryDetails?.title || 'Product Category'} {/* Use title field */}
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
