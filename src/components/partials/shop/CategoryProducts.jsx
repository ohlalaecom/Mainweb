// pages/shop/[category].jsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { formatCurrency } from '~/utilities/product-helper';

const CategoryProducts = () => {
    const router = useRouter();
    const { category } = router.query; // Dynamic route parameter
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get(
                        //https://admin.jacobs-electronics.com/api/products?filters[Computers & Technologies][id][$eq]=5
                        `https://admin.jacobs-electronics.com/api/products?filters[Computers & Technologies][id][$eq]=5`
                    );
                    setProducts(response.data.data || []);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [category]);

    return (
        <div className="category-products">
            <h1>Products in Category: {category ? category.replace(/-/g, ' ').toUpperCase() : 'Loading...'}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.attributes.name}</h3>
                            <p>{product.attributes.description}</p>
                            <p>Price: {formatCurrency(product.attributes.price)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found for this category.</p>
            )}
        </div>
    );
};

export default CategoryProducts;