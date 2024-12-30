import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';

// Utility function to transform slugs into readable text
const formatSlugToText = (slug) => {
    return slug
        .replace(/-/g, ' ') // Replace dashes with spaces
        .replace(/_/g, ' ') // Replace underscores with spaces (if any)
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .trim() // Remove trailing or leading spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export default function DesktopNavigation() {
    const [categories, setCategories] = useState([]); // Holds the fetched categories
    const [loading, setLoading] = useState(true); // Loading state for categories

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://strapi-app-tntk.onrender.com/api/product-categories');
            const data = await response.json();
            if (data && data.data) {
                const transformedCategories = data.data.map((category) => ({
                    text: formatSlugToText(category.attributes.slug),
                    url: category.attributes.slug,
                }));
                setCategories(transformedCategories);
            }
            setLoading(false); // Set loading to false after categories are fetched
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <nav className="navigation">
            <div className="ps-container">
                <div className="navigation__left">
                    <MenuCategoriesDropdown categories={categories} loading={loading} />
                </div>
                <div className="navigation__right">
                    <ul className="menu">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <Link href={`/category/${category.url}`}>{category.text}</Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/shop/track-your-order">Track your Order</Link>
                        </li>
                        <li>
                            <LanguageSwicher />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
