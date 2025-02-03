import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import SearchResultProduct from '~/components/elements/products/SearchResultProduct';
import { EXAMPLE_CATEGORY } from '~/utilities/data';
import useGetProducts from '~/hooks/useGetProducts';
import { useDebounce } from 'ahooks';
import cx from 'classnames';
import { useRouter } from 'next/navigation';

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const { products, loading, getStrapiProducts } = useGetProducts();
    const keywordDebounce = useDebounce(keyword, { wait: 2000 });
    const Router = useRouter();

    function handleClearKeyword() {
        setKeyword('');
    }


    const handleChange = (event) => {
        const selectedPath = event.target.value;
        if (selectedPath) {
            Router.push(`/category/${selectedPath}`);
        }
    };
    function handleSubmit(e) {
        e.preventDefault();
        Router.push(`/search?keyword=${keyword}`);
    }

    const searchQuery = useMemo(() => {
        if (keywordDebounce.length > 0) {
            return {
                filters: {
                    title: {
                        $contains: keywordDebounce,
                    },
                },
                fields: ['id', 'slug', 'title'],
            };
        }
    }, [keywordDebounce]);

    useEffect(() => {
        if (searchQuery) {
            getStrapiProducts(searchQuery);
        }
    }, [searchQuery]);

    const resultProducts = useMemo(() => {
        if (loading) return [];
        if (keyword === '') return [];
        return products;
    }, [products, loading, keyword]);

    const quickSearchBox = useMemo(() => {
        if (resultProducts.length > 0) {
            return (
                <div
                    className={cx(
                        'ps-panel--search-result',
                        resultProducts.length > 0 && 'active'
                    )}>
                    <div className="ps-panel__content">
                        {resultProducts.map((item) => {
                            return (
                                <SearchResultProduct
                                    product={item}
                                    key={item.id}
                                />
                            );
                        })}
                    </div>
                    {resultProducts.length > 5 && (
                        <div className="ps-panel__footer text-center">
                            <Link href={'/search'}>See all results</Link>
                        </div>
                    )}
                </div>
            );
        } else {
        }
    }, [resultProducts]);

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            onSubmit={handleSubmit}>
            <div className="ps-form__categories">
                <select className="form-control" onChange={handleChange} defaultValue="">
                    {EXAMPLE_CATEGORY.map((category, index) => (
                        <option key={index} value={category.path}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="I'm shopping for..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {keyword !== '' && (
                    <span
                        className="ps-form__action"
                        onClick={handleClearKeyword}>
                        <i className="icon icon-cross2" />
                    </span>
                )}
                {loading && (
                    <span className="ps-form__action">
                        <Spin size="small" />
                    </span>
                )}
            </div>
            <button onClick={handleSubmit}>Search</button>
            {quickSearchBox}
        </form>
    );
};

export default SearchHeader;
