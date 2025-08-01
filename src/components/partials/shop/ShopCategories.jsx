import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ShopCategories = () => {
    const [categories, setCategories] = useState([]); // Holds the category data
    const [selectedCategory, setSelectedCategory] = useState(null); // Tracks selected category
    const [products, setProducts] = useState([]); // Holds the products of a category
    const [loading, setLoading] = useState(false); // Loading state

    // Utility function to transform slugs into readable text
    const formatSlugToText = (slug) => {
        return slug
            .replace(/-/g, ' ') // Replace dashes with spaces
            .replace(/_/g, ' ') // Replace underscores with spaces (if any)
            .replace(/\s+/g, ' ') // Normalize multiple spaces
            .trim() // Remove trailing or leading spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    };

    // Fetch categories from Strapi
    const fetchCategories = async () => {
        try {
            const response = await fetch(`https://admin.jacobs-electronics.com/api/product-categories`);
            const data = await response.json();

            // Transform response if needed
            setCategories(data.data || []); // Ensure fallback if no categories
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch products of a selected category
    const fetchProducts = async (categoryTitle) => {
        setLoading(true);
        try {
            //const formattedTitle = encodeURIComponent(categoryTitle); // Remove spaces
            const response = await fetch(
                `https://admin.jacobs-electronics.com/api/products`
            );
            const data = await response.json();
            // alert(data.data.length);

            setProducts(data.data || []); // Ensure fallback if no products

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };



    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle category click
    const handleCategoryClick = (categoryTitle) => {
        setSelectedCategory(categoryTitle); // Track selected category
        fetchProducts(categoryTitle); // Fetch products for the selected category
    };

    return (
        <div className="ps-shop-categories">
            <h2>Shop Categories</h2>
            {/* <div className="row align-content-lg-stretch">
                {categories.map((category) => (
                    <div
                        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"
                        key={category.id}
                        onClick={() => handleCategoryClick(category.attributes.title)} // Pass title as argument
                        style={{ cursor: 'pointer' }}>
                        <div className="ps-block--category-2" data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src={category.attributes.thumbnail || '/default-thumbnail.jpg'}
                                    alt={category.attributes.title || 'Category'}
                                />
                            </div>
                            <div className="ps-block__content">
                                <h4>{formatSlugToText(category.attributes.slug || 'Category')}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            {loading && <div>Loading products...</div>} {/* Show loading state */}
            {selectedCategory && !loading && (
                <div>
                    <h3>Products for Category: {selectedCategory}</h3>
                    <ul>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <li key={product.id}>
                                    <Link href={`/product/${product.attributes.slug}`}>
                                        {product.attributes.title}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>No products found for this category</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShopCategories;
