import { useEffect, useState } from 'react';
import { useBoolean } from 'ahooks';
import { GET_CATEGORY_ENTRIES_QUERY } from '~/services/queries/strapiQueries';
import { getStrapiEntriesService } from '~/services/strapi/strapiQueryServices';

const COLLECTION_TYPE = 'product-categories';

export default function useProducCategory(slug) {
    const [loading, { setTrue: enableLoading, setFalse: disableLoading }] = useBoolean();
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [categories, setCategories] = useState([]);

    // Fetch a single category based on the slug
    const getStrapiCategory = async () => {
        enableLoading();
        try {
            
            const response = await getStrapiEntriesService(
                COLLECTION_TYPE,
                GET_CATEGORY_ENTRIES_QUERY,
                { filters: { product_categories: { slug: { $eq: slug } } } } // Updated field name
                
            );
            const category = response.data?.[0]?.attributes || null;
            setCategoryDetails(category);
            
        } catch (error) {
            console.error('Error fetching category:', error);
            setCategoryDetails(null);
        } finally {
            disableLoading();
        }
    };

    // Fetch all categories
    const getCategories = async () => {
        enableLoading();
        try {
            const response = await getStrapiEntriesService(
                COLLECTION_TYPE,
                GET_CATEGORY_ENTRIES_QUERY
            );
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        } finally {
            disableLoading();
        }
    };

    // Fetch the category details whenever the slug changes
    useEffect(() => {
        if (slug) {
            getStrapiCategory();
        }
    }, [slug]);

    return {
        loading,
        categoryDetails,
        categories,
        getStrapiCategory,
        getCategories,
    };
}
