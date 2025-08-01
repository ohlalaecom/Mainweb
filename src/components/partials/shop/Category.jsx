import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ShopCategoryPage = () => {
    const router = useRouter();
    const { category } = router.query;  // Grab the category slug from URL

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch categories from Strapi
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://admin.jacobs-electronics.com/api/product-categories');
            const data = await response.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch products for the selected category
    const fetchProducts = async (categorySlug) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://admin.jacobs-electronics.com/api/products?filters[category][slug]=${categorySlug}`
            );
            const data = await response.json();
            setProducts(data.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (category) {
            fetchProducts(category);  // Fetch products based on category slug
        }
    }, [category]);

    // Find the current category name for display
    const currentCategory = categories.find((cat) => cat.attributes.slug === category);

    return (
        <div className="ps-shop-categories">
            <h2>{currentCategory ? `Products in ${currentCategory.attributes.name}` : 'Loading Category...'}</h2>

            {loading && <div>Loading products...</div>}

            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id}>
                            <Link href={`/product/${product.attributes.slug}`}>
                                {product.attributes.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No products found for this category</li>
                )}
            </ul>
        </div>
    );
};

export default ShopCategoryPage;
