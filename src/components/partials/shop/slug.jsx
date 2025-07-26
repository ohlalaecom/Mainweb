import React from 'react';
import { useRouter } from 'next/router';

function CategoryPage({ category }) {
    const { query } = useRouter();
    const { slug } = query;

    return (
        <div>
            <h1>Category: {category || slug}</h1>
            {/* Render your category-specific content here */}
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const { slug } = params;
    try {
        // Fetch category data based on slug from your API
        const res = await fetch(`http://157.230.29.110:1337/api/product-categories?slug=${slug}`);
        const data = await res.json();

        // If the category is found
        if (data && data.data) {
            return {
                props: {
                    category: data.data[0]?.attributes?.name || 'Category Not Found'
                }
            };
        }
    } catch (error) {
        console.error('Error fetching category:', error);
    }

    return {
        props: {
            category: 'Category Not Found',
        },
    };
}

export default CategoryPage;
