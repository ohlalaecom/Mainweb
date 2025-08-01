'use client';

import React, { useState, useEffect } from 'react';

const CategoryPage = ({ params }) => {
    const [categoryData, setCategoryData] = useState(null);  // For storing category details
    const [products, setProducts] = useState([]);  // For storing products under the category
    const [loading, setLoading] = useState(true);  // Loading state
    const { slug } = params;  // Get the dynamic 'slug' from the URL (params comes from Next.js)

    // Fetch category data based on the slug
    const fetchCategoryData = async () => {
        if (!slug) return;  // Wait for slug to be available

        try {
            const categoryResponse = await fetch(`https://admin.jacobs-electronics.com/api/product-categories?filters[slug][$eq]=${slug}`);
            const categoryData = await categoryResponse.json();

            if (categoryData && categoryData.data && categoryData.data.length > 0) {
                setCategoryData(categoryData.data[0]);  // Assuming one category per slug
                fetchProducts(categoryData.data[0].attributes.slug);  // Fetch products for this category using slug
            } else {
                setCategoryData(null);  // No data found for the slug
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products for the category using the category slug
    const fetchProducts = async (categorySlug) => {
        if (!categorySlug) return;  // Wait for categorySlug to be available

        try {
            // alert(categorySlug);
            const productResponse = await fetch(`https://admin.jacobs-electronics.com/api/products?filters[product_categories][slug][$eq]=${categorySlug}`);

            const productData = await productResponse.json();

            // Check if productData is valid before updating state
            if (productData && productData.data) {
                setProducts(productData.data);  // Set the fetched products
            } else {
                setProducts([]);  // No products found
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch category data when the component mounts or slug changes
    useEffect(() => {
        fetchCategoryData();
    }, [slug]);

    if (loading) return <div>Loading...</div>;

    if (!categoryData) return <div>Category not found.</div>;

    return (
        <div>
            <h1>{categoryData.attributes.title}</h1>
            <p>{categoryData.attributes.slug}</p>

            {/* Displaying products under this category */}
            <div>
                <h2>Products</h2>
                <ul>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <li key={product.id}>
                                <h3>{product.attributes.title}</h3>
                                <p>{product.attributes.slug}</p>
                                {/* Display other product details as needed */}
                            </li>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CategoryPage;
