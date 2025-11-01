import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { carouselStandard } from '../../../utilities/carousel-helpers';

import Product from '../../../components/elements/products/Product';

class CategoriesRecommendItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let products = [];
        const { collections } = this.props;
        if (collections.length > 0) {
            products = collections.find(
                (collection) => collection.slug === 'shop-recommend-items'
            ).products;
        }

        // Apply price filtering if URL parameters are present
        const searchParams = useSearchParams();
        const priceGt = searchParams.get('price_gt');
        const priceLt = searchParams.get('price_lt');

        if (products && products.length > 0 && (priceGt || priceLt)) {
            products = products.filter(product => {
                const productPrice = product.price || 0;
                const meetsMin = !priceGt || productPrice >= parseInt(priceGt);
                const meetsMax = !priceLt || productPrice <= parseInt(priceLt);
                return meetsMin && meetsMax;
            });
        }

        return (
            <div className="ps-product-list ps-product-list--2">
                <div className="ps-section__header">
                    <h3>Recommended Items</h3>
                </div>
                <div className="ps-section__content">
                    <Slider {...carouselStandard} className="ps-carousel">
                        {products &&
                            products.length > 0 &&
                            products.map((product) => (
                                <Product product={product} key={product.id} />
                            ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default connect((state) => state.collection)(CategoriesRecommendItems);
