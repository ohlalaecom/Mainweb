import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ShopPage = () => {
    const [categories, setCategories] = useState([]);  // Holds the fetched categories

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://strapi-app-tntk.onrender.com/api/product-categories');
            const data = await response.json();
            if (data && data.data) {
                const transformedCategories = data.data.map((category) => ({
                    text: category.attributes.name,  // Display category name
                    url: category.attributes.slug,  // Use slug for the URL
                }));
                setCategories(transformedCategories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Shop</h1>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        {/* Linking to each category dynamically */}
                        <Link href={`/shop/${category.url}`}>
                            {category.text}  {/* Category Name */}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShopPage;
