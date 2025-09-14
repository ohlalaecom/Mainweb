import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatCurrency } from '~/utilities/product-helper';


const MobileCartProduct = ({ product }) => {
    const { thumbnailImage, price, title } = useProduct(product.attributes);
    console.log({ product });

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {thumbnailImage}
                </Link>
            </div>
            <div className="ps-product__content">
                <a className="ps-product__remove">
                    <i className="icon-cross" />
                </a>
                <Link
                    href={'/product/[pid]'}
                    as={`/product/${product.id}`}
                    className="ps-product__title">
                    {title}
                </Link>
                <p>
                    <strong>Sold by:</strong> Jacobs Electronics
                </p>
               <small>
    {product.attributes.quantity ? product.attributes.quantity : 1}{' '}
    x {formatCurrency(product.attributes.price, product.attributes.currency || "EUR")}
</small>
            </div>
        </div>
    );
};

export default MobileCartProduct;
