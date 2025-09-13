import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import SearchResultProduct from '~/components/elements/products/SearchResultProduct';
import { useDebounce } from 'ahooks';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import useGetProducts from '~/hooks/useGetProducts';

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const { products, loading, getStrapiProducts } = useGetProducts();
    const keywordDebounce = useDebounce(keyword, { wait: 2000 });
    const Router = useRouter();

    function handleClearKeyword() {
        setKeyword('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword.trim() !== '') {
            Router.push(`/search?keyword=${keyword}`);
        }
    }

    const searchQuery = useMemo(() => {
        if (keywordDebounce.length > 0) {
            return {
                filters: {
                    title: { $containsi: keywordDebounce },
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

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            onSubmit={handleSubmit}
            style={{ margin: 0 }}
        >
            <div
                className="ps-form__input-wrapper"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: '320px', // reduced width
                    maxWidth: '320px',
                    position: 'relative',
                    marginRight: '20px', // pushes it slightly left towards logo
                }}
            >
                {/* Search Input */}
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="I'm shopping for..."
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{
                        flex: 1,
                        fontSize: '16px',
                        padding: '8px 12px',
                        marginTop: '10px',
                        backgroundColor: '#d4f6df',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                    }}
                />

                {/* Clear button */}
                {keyword !== '' && (
                    <span
                        className="ps-form__action"
                        onClick={handleClearKeyword}
                        style={{
                            cursor: 'pointer',
                            color: '#222',
                            fontWeight: 'bold',
                            marginTop: '10px',
                        }}
                    >
                        <i className="icon icon-cross2" />
                    </span>
                )}

                {/* Loading spinner */}
                {loading && (
                    <span
                        className="ps-form__action"
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        <Spin size="small" />
                    </span>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    style={{
                        backgroundColor: 'forestgreen',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '10px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0, // prevent button shrinking
                    }}
                >
                    Search
                </button>

                {/* Quick Search Box aligned */}
                {resultProducts.length > 0 && (
                    <div
                        className={cx(
                            'ps-panel--search-result',
                            resultProducts.length > 0 && 'active'
                        )}
                        style={{
                            position: 'absolute',
                            top: '60px',
                            left: 0,
                            width: '100%', // aligned to wrapper width
                            background: '#fff',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                            borderRadius: '6px',
                            zIndex: 1000,
                        }}
                    >
                        <div className="ps-panel__content">
                            {resultProducts.map((item) => (
                                <SearchResultProduct
                                    product={item}
                                    key={item.id}
                                />
                            ))}
                        </div>
                        {resultProducts.length > 5 && (
                            <div className="ps-panel__footer text-center">
                                <Link href={'/search'}>See all results</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchHeader;
