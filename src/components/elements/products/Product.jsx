import React from 'react';
import Link from 'next/link';
import ProductActions from '~/components/elements/products/modules/ProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {

    const { thumbnailImage, price, badge, title } = useProduct(product?.attributes, product?.id);
    console.log('Derived product details:', {
        thumbnailImage,
        price,
        badge,
        title,
    });

    return (
        <div className="ps-product"  style={{ width: "200px", marginLeft: "-20px" }}>
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {thumbnailImage || (
                        <img
                            src="/static/img/products/martfury-product-placeholder.svg"
                            alt={product?.attributes?.title || 'Product'}
                        />
                    )}
                </Link>
                {badge && badge(product)}
                <ProductActions product={product}  />
            </div>
            <div className="ps-product__container">
                {/* <Link href={'/shop'} className="ps-product__vendor">
                    Young Shop
                </Link> */}
                <div className="ps-product__content">
                     <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {title}
                </Link>
                    <div className="ps-product__rating">
                        <Rating />
                        <span>025</span>
                    </div>
                    {price}
                </div>
                <div className="ps-product__content hover">
                 <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {title}
                </Link>
                   
                    {price}
                </div>
            </div>
        </div>
    );
};

export default Product;
