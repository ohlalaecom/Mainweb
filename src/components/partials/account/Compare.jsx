// import React, { useEffect, useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import Link from 'next/link';
// import { Rate } from 'antd';
// import useEcomerce from '~/hooks/useEcomerce';
// import useGetProducts from '~/hooks/useGetProducts';

// export default function Compare() {
//     const ecomerce = useSelector(({ ecomerce }) => ecomerce);
//     const { addItem, removeItem } = useEcomerce();
//     const compareItems = useSelector(({ ecomerce }) => ecomerce.compareItems);
//     const { getStrapiProducts, products } = useGetProducts();

//     function getProducts() {
//         if (compareItems.length > 0) {
//             const query = {
//                 filters: {
//                     id: {
//                         $in: compareItems.map((item) => item.id),
//                     },
//                 },
//             };
//             getStrapiProducts(query);
//         }
//     }

//     useEffect(() => {
//         getProducts();
//     }, [compareItems]);

//     function handleAddItemToCart(e, product) {
//         e.preventDefault();
//         addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
//     }

//     function handleRemoveCompareItem(e, product) {
//         e.preventDefault();
//         removeItem(product, ecomerce.compareItems, 'compare');
//     }

//     useEffect(() => {
//         if (ecomerce) {
//             getProducts(ecomerce.compareItems);
//         }
//     }, [ecomerce.compareItems]);

//     const content = useMemo(() => {
//         if (products.length === 0) {
//             return (
//                 <div className="alert alert-danger" role="alert">
//                     Compare list is empty!
//                 </div>
//             );
//         }
//         return (
//             <div className="table-responsive">
//                 <table className="table ps-table--compare">
//                     <tbody>
//                         <tr>
//                             <td className="heading" rowSpan="2">
//                                 Product
//                             </td>
//                             {products && products.length > 0 ? (
//                                 products.map((product) => (
//                                     <td key={product.id}>
//                                         <a
//                                             href="#"
//                                             onClick={(e) =>
//                                                 handleRemoveCompareItem(
//                                                     e,
//                                                     product
//                                                 )
//                                             }>
//                                             Remove
//                                         </a>
//                                     </td>
//                                 ))
//                             ) : (
//                                 <td></td>
//                             )}
//                         </tr>
//                         <tr>
//                             {products && products.length > 0 ? (
//                                 products.map((product) => (
//                                     <td key={product.id}>
//                                         <div className="ps-product--compare">
//                                             <div className="ps-product__thumbnail">
//                                                 <Link
//                                                     href={'/product/[pid]'}
//                                                     as={`/product/${product.id}`}>
//                                                     {thumbnailImage}
//                                                 </Link>
//                                             </div>
//                                             <div className="ps-product__content">
//                                                 <Link
//                                                     href={'/product/[pid]'}
//                                                     as={`/product/${product.id}`}
//                                                     className="ps-product__title">
//                                                     {product.title}
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </td>
//                                 ))
//                             ) : (
//                                 <td></td>
//                             )}
//                         </tr>
//                         <tr>
//                             <td className="heading">Rating</td>
//                             {products && products.length > 0 ? (
//                                 products.map((product) => (
//                                     <td key={product.id}>
//                                         <Rate disabled defaultValue={4} />
//                                     </td>
//                                 ))
//                             ) : (
//                                 <td></td>
//                             )}
//                         </tr>
//                         <tr>
//                             <td className="heading">Price</td>
//                             {products && products.length > 0 ? (
//                                 products.map((product) => {
//                                     if (product.sale === true) {
//                                         return (
//                                             <td key={product.id}>
//                                                 <h4 className="price sale">
//                                                     ${product.price}
//                                                     <del>
//                                                         ${product.salePrice}
//                                                     </del>
//                                                 </h4>
//                                             </td>
//                                         );
//                                     } else
//                                         return (
//                                             <td key={product.id}>
//                                                 <h4 className="price">
//                                                     $ {product.price}
//                                                 </h4>
//                                             </td>
//                                         );
//                                 })
//                             ) : (
//                                 <td></td>
//                             )}
//                         </tr>
//                         <tr>
//                             <td className="heading">Sold By</td>
//                             {products && products.length > 0 ? (
//                                 products.map((product) => (
//                                     <td key={product.id}>
//                                         <Link href="/vendor/store-list">
//                                             {product.vendor}
//                                         </Link>
//                                     </td>
//                                 ))
//                             ) : (
//                                 <td></td>
//                             )}
//                         </tr>
//                         <tr>
//                             <td className="heading"></td>
//                             {products && products.length > 0 ? (
//                                 products.map((product) => (
//                                     <td key={product.id}>
//                                         <button
//                                             className="ps-btn"
//                                             onClick={(e) =>
//                                                 handleAddItemToCart(e, product)
//                                             }>
//                                             Add To Cart
//                                         </button>
//                                     </td>
//                                 ))
//                             ) : (
//                                 <td></td>
//                             )}
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }, [products]);

//     return (
//         <div className="ps-compare ps-section--shopping">
//             <div className="container">
//                 <div className="ps-section__header">
//                     <h1>Compare Product</h1>
//                 </div>
//                 <div className="ps-section__content">{content}</div>
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Rate } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import useGetProducts from '~/hooks/useGetProducts';
import { formatCurrency } from '~/utilities/product-helper';

export default function Compare() {
    const ecomerce = useSelector(({ ecomerce }) => ecomerce);
    const { addItem, removeItem } = useEcomerce();
    const compareItems = ecomerce.compareItems;
    const { getStrapiProducts, products: fetchedProducts } = useGetProducts();

    // Local state to control displayed products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (compareItems.length > 0) {
            const query = {
                filters: {
                    id: {
                        $in: compareItems.map((item) => item.id),
                    },
                },
            };
            getStrapiProducts(query);
        } else {
            // Clear instantly if no items
            setProducts([]);
        }
    }, [compareItems]);

    // Sync local products with fetched data
    useEffect(() => {
        if (fetchedProducts?.length) {
            setProducts(fetchedProducts);
        }
    }, [fetchedProducts]);

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    }

    function handleRemoveCompareItem(e, product) {
        e.preventDefault();
        removeItem(product, ecomerce.compareItems, 'compare');
    }

    const content = useMemo(() => {
        if (!products || products.length === 0) {
            return (
                <div className="alert alert-danger" role="alert">
                    Compare list is empty!
                </div>
            );
        }
        return (
            <div className="table-responsive">
                <table className="table ps-table--compare">
                    <tbody>
                        {/* Row 1: Remove button */}
                        <tr>
                            <td className="heading" rowSpan="2">
                                Product
                            </td>
                            {products.map((product) => (
                                <td key={product.id}>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={(e) =>
                                            handleRemoveCompareItem(e, product)
                                        }
                                    >
                                        ✕ Remove
                                    </button>
                                </td>
                            ))}
                        </tr>

                        {/* Row 2: Product image & title */}
                        <tr>
                            {products.map((product) => {
                                const attr = product.attributes;
                                return (
                                    <td key={product.id}>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail">
                                                <Link
                                                    href={'/product/[pid]'}
                                                    as={`/product/${product.id}`}
                                                >
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={attr.title}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="ps-product__content">
                                                <Link
                                                    href={'/product/[pid]'}
                                                    as={`/product/${product.id}`}
                                                    className="ps-product__title"
                                                >
                                                    {attr.title}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>

                        {/* Row 3: Rating */}
                        <tr>
                            <td className="heading">Rating</td>
                            {products.map((product) => (
                                <td key={product.id}>
                                    <Rate disabled defaultValue={4} />
                                </td>
                            ))}
                        </tr>

                        {/* Row 4: Price */}
                        <tr>
                            <td className="heading">Price</td>
                            {products.map((product) => {
                                const attr = product.attributes;
                                if (attr.sale) {
                                    return (
                                     

<td key={product.id}>
    <h4 className="price sale" style={{ color: 'red' }}>
        {formatCurrency(attr.sale_price, 'EUR')}
        <del
            style={{
                color: '#999',
                marginLeft: '5px',
            }}
        >
            {formatCurrency(attr.price, 'EUR')}
        </del>
    </h4>
</td>

                                    );
                                } else {
                                    return (
                                        <td key={product.id}>
                                            <h4 className="price">
                                                ${attr.price}
                                            </h4>
                                        </td>
                                    );
                                }
                            })}
                        </tr>

                        {/* Row 5: Vendor */}
                        <tr>
                            <td className="heading">Sold By</td>
                            {products.map((product) => (
                                <td key={product.id}>
                                    <Link href="/vendor/store-list">
                                        {product.attributes?.product_store?.data?.attributes?.name ||
                                            'Unknown'}
                                    </Link>
                                </td>
                            ))}
                        </tr>

                        {/* Row 6: Add to Cart */}
                        <tr>
                            <td className="heading"></td>
                            {products.map((product) => (
                                <td key={product.id}>
                                    <button
                                        className="ps-btn"
                                        onClick={(e) =>
                                            handleAddItemToCart(e, product)
                                        }
                                    >
                                        Add To Cart
                                    </button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }, [products]);

    return (
        <div className="ps-compare ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Compare Product</h1>
                </div>
                <div className="ps-section__content">{content}</div>
            </div>
        </div>
    );
}
