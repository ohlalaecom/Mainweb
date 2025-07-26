import React, { useEffect, useState } from 'react';
import './menu.css';

// Utility function to transform slugs into readable text
const formatSlugToText = (slug) => {
    return slug
        .replace(/-/g, ' ') // Replace dashes with spaces
        .replace(/_/g, ' ') // Replace underscores with spaces (if any)
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .trim() // Remove trailing or leading spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const MenuCategoriesDropdown = () => {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch products based on category ID
    const fetchProducts = async (categoryId) => {
        try {
            const url = `http://157.230.29.110:1337/api/products?filters[category][id]=${categoryId}`;
            console.log('Fetching products with URL:', url); // Log the URL for debugging

            const response = await fetch(url);
            const data = await response.json();

            console.log('Products API Response:', data); // Log the response for debugging

            const products = data?.data || []; // Safeguard for null or missing data
            return products.map((product) => ({
                text: product.attributes.name,
                url: `/product/${product.attributes.id}`,
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            return []; // Return an empty array on error
        }
    };



    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('http://157.230.29.110:1337/api/product-categories');
                const data = await response.json();

                console.log('API Response:', data); // Debug response

                const categories = Array.isArray(data.data) ? data.data : [];

                const transformedData = await Promise.all(
                    categories.map(async (category) => {
                        const products = await fetchProducts(category.id);
                        return {
                            text: formatSlugToText(category.attributes.slug),
                            url: `/category/${category.attributes.slug}`,
                            extraClass: products.length > 0
                                ? 'menu-item-has-children has-mega-menu'
                                : '',
                            subItems: products,
                        };
                    })
                );

                setMenuData(transformedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);


    if (loading) {
        return <div>Loading categories...</div>;
    }

    return (
        <div className="menu--product-categories">
            <div className="menu__toggle" style={{ color: '#fff' }}>
                <i className="icon-menu" style={{ color: '#fff' }} />
                <span style={{ color: '#fff' }}>Shop by Department</span>
            </div>
            <div className="menu__content">
                <ul className="menu--dropdown">
                    {menuData.map((item, index) => {
                        // Extract the category name from the URL
                        const categoryName = item.url.split('/').pop().replace('-', ' '); // Remove hyphens and extract the name
                        return (
                            <li key={index} className={item.extraClass}>
                                <a href={item.url}>{item.text}</a> {/* Display name extracted from URL */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
