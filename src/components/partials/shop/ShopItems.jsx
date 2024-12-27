'use client';

import React, { Suspense, useEffect, useMemo, useState, useCallback } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import WideProduct from '~/components/elements/products/WideProduct';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { useRouter, useSearchParams } from 'next/navigation';

const ShopItems = ({ columns = 4, pageSize = 12 }) => {
    const Router = useRouter();
    const searchParams = useSearchParams();
    const pageIndex = searchParams.get('page');
    const [listView, setListView] = useState(true);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchProducts = async (categorySlug) => {
        if (!categorySlug) return;  // Wait for categorySlug to be available
        try {
            // alert(categorySlug);
            const response = await fetch(
                `https://strapi-app-tntk.onrender.com/api/products?filters[product_categories][slug][$eq]=${categorySlug}`);

            const data = await response.json();

            if (data && data.data) {
                setProducts(data.data);
                setTotal(data.meta.pagination.total);
            } else {
                setProducts([]);
                setTotal(0);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeViewMode = (e) => {
        e.preventDefault();
        setListView(!listView);
    };

    const handlePagination = (page) => {
        Router.push(`/shop?page=${page}`);
        fetchProducts(page, pageSize);
    };

    const handleSetColumns = useCallback(() => {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                break;
            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }, [columns]);

    useEffect(() => {
        handleSetColumns();
        fetchProducts(pageIndex ? parseInt(pageIndex) : 1, pageSize);
    }, [pageIndex, pageSize, handleSetColumns]);

    const productsContent = useMemo(() => {
        if (loading) {
            return (
                <div className="row">
                    {Array.from({ length: pageSize }, (_, index) => (
                        <div className={classes} key={index}>
                            <SkeletonProduct />
                        </div>
                    ))}
                </div>
            );
        }

        if (products && products.length > 0) {
            if (listView) {
                return (
                    <div className="ps-shop-items">
                        <div className="row">
                            {products.map((item) => (
                                <div className={classes} key={item.id}>
                                    <Product product={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            } else {
                return products.map((item) => <WideProduct product={item} key={item.id} />);
            }
        }

        return <p>No products found.</p>;
    }, [loading, products, listView, classes, pageSize]);

    return (
        <Suspense>
            <div className="ps-shopping">
                <div className="ps-shopping__header">
                    <p>
                        <strong className="mr-2">{total}</strong>
                        Products found
                    </p>
                    <div className="ps-shopping__actions">
                        <ModuleShopSortBy />
                        <div className="ps-shopping__view">
                            <p>View</p>
                            <ul className="ps-tab-list">
                                <li className={listView ? 'active' : ''}>
                                    <a href="#" onClick={handleChangeViewMode}>
                                        <i className="icon-grid" />
                                    </a>
                                </li>
                                <li className={!listView ? 'active' : ''}>
                                    <a href="#" onClick={handleChangeViewMode}>
                                        <i className="icon-list4" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="ps-shopping__content">{productsContent}</div>
                <div className="ps-shopping__footer text-center">
                    <div className="ps-pagination">
                        <Pagination
                            total={total}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={pageIndex ? parseInt(pageIndex) : 1}
                            onChange={handlePagination}
                        />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default ShopItems;
