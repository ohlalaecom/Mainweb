import React, { useState } from 'react';
import { Slider } from 'antd';
import { useRouter } from 'next/navigation';

const WidgetShopFilterByPriceRange = () => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5000);

    function handleChangeRange(value) {
        console.log('Price range changed:', value);
        setMin(value[0]);
        setMax(value[1]);

        /*  const params = {
            price_gt: value[0],
        };*/
        Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
        console.log('Navigating to:', `/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
        /*this.props.dispatch(getProductsByPrice(params));*/
    }

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">By Price</h4>
                <Slider
                    range
                    defaultValue={[0, 5000]}
                    max={5000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Price: €{min} - € {max}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
