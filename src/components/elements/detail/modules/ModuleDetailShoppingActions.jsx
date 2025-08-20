// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { Modal, notification } from 'antd';
// import useEcomerce from '~/hooks/useEcomerce';

// // function handleAddItemToCart(e) {
// //     e.preventDefault();
// //     addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
// //     notification.open({
// //         message: 'Cart Updated',
// //         description: 'This product has been added to your cart',
// //         duration: 500,
// //     });
// // }

// const ModuleDetailShoppingActions = ({
//     ecomerce,
//     product,
//     extended = false,
// }) => {
//     const [quantity, setQuantity] = useState(1);
//     const Router = useRouter();
//     const { addItem } = useEcomerce();
//     function handleAddItemToCart(e) {
//         e.preventDefault();
//         addItem(
//             { id: product.id, quantity: quantity },
//             ecomerce.cartItems,
//             'cart'
//         );
//         notification.open({
//             message: 'Cart Updated',
//             description: 'This product has been added to your cart',
//             duration: 500,
//         });
//     }

//     function handleBuynow(e) {
//         e.preventDefault();
//         addItem(
//             { id: product.id, quantity: quantity },
//             ecomerce.cartItems,
//             'cart'
//         );
//         setTimeout(function () {
//             Router.push('/account/checkout');
//         }, 1000);
//     }

//     const handleAddItemToCompare = (e) => {
//         e.preventDefault();
//         e.preventDefault();
//         addItem({ id: product.id }, ecomerce.compareItems, 'compare');
//         const modal = Modal.success({
//             centered: true,
//             title: 'Success!',
//             content: `This product has been added to compare listing!`,
//         });
//         modal.update;
//     };

//     const handleAddItemToWishlist = (e) => {
//         e.preventDefault();
//         addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
//         const modal = Modal.success({
//             centered: true,
//             title: 'Success!',
//             content: `This item has been added to your wishlist`,
//         });
//         modal.update;
//     };

//     function handleIncreaseItemQty(e) {
//         e.preventDefault();
//         setQuantity(quantity + 1);
//     }

//     function handleDecreaseItemQty(e) {
//         e.preventDefault();
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     }
//     if (!extended) {
//         return (
//             <div className="ps-product__shopping">
//                 <figure>
//                     <figcaption>Quantity</figcaption>
//                     <div className="form-group--number">
//                         <button
//                             className="up"
//                             onClick={(e) => handleIncreaseItemQty(e)}>
//                             <i className="fa fa-plus" />
//                         </button>
//                         <button
//                             className="down"
//                             onClick={(e) => handleDecreaseItemQty(e)}>
//                             <i className="fa fa-minus" />
//                         </button>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder={quantity}
//                             disabled
//                         />
//                     </div>
//                 </figure>

//                 <a
//                     className="ps-btn ps-btn--black"
//                     href="#"
//                     onClick={(e) => handleAddItemToCart(e)}>
//                     Add to cart
//                 </a>
//                 <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
//                     Buy Now
//                 </a>
//                 <div className="ps-product__actions">
//                     <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
//                         <i className="icon-heart" />
//                     </a>
//                     <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
//                         <i className="icon-chart-bars" />
//                     </a>
//                 </div>
//             </div>
//         );
//     } else {
//         return (
//             <div className="ps-product__shopping extend">
//                 <div className="ps-product__btn-group">
//                     <figure>
//                         <figcaption>Quantity</figcaption>
//                         <div className="form-group--number">
//                             <button
//                                 className="up"
//                                 onClick={(e) => handleIncreaseItemQty(e)}>
//                                 <i className="fa fa-plus" />
//                             </button>
//                             <button
//                                 className="down"
//                                 onClick={(e) => handleDecreaseItemQty(e)}>
//                                 <i className="fa fa-minus" />
//                             </button>
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder={quantity}
//                                 disabled
//                             />
//                         </div>
//                     </figure>

//                     <a
//                         className="ps-btn ps-btn--black"
//                         href="#"
//                         onClick={(e) => handleAddItemToCart(e)}>
//                         Add to cart
//                     </a>
//                     <div className="ps-product__actions">
//                         <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
//                             <i className="icon-heart" />
//                         </a>
//                         <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
//                             <i className="icon-chart-bars" />
//                         </a>
//                     </div>
//                 </div>
//                 <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
//                     Buy Now
//                 </a>
//             </div>
//         );
//     }
// };

// export default connect((state) => state)(ModuleDetailShoppingActions);
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Modal, notification } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();
    const { addItem } = useEcomerce();

  const showNotification = (message, description) => {
        notification.open({
            message,
            description,
            placement: 'topRight',
            duration: 2, // auto close after 2 seconds
            style: {
                zIndex: 9999,
                backgroundColor: '#008b3e',
                color: '#fff',
            },
        });
    };

    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
        showNotification('Cart Updated', 'This product has been added to your cart');
    }

    function handleBuynow(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
        setTimeout(() => {
            Router.push('/account/checkout');
        }, 1000);
    }

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        showNotification('Success!', 'This product has been added to compare listing!');
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        showNotification('Success!', 'This item has been added to your wishlist');
    };

    function handleIncreaseItemQty(e) {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    function handleDecreaseItemQty(e) {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const renderQuantityControl = () => (
        <figure>
            <figcaption>Quantity</figcaption>
            <div className="form-group--number">
                <button className="up" onClick={handleIncreaseItemQty}>
                    <i className="fa fa-plus" />
                </button>
                <button className="down" onClick={handleDecreaseItemQty}>
                    <i className="fa fa-minus" />
                </button>
                <input
                    className="form-control"
                    type="text"
                    value={quantity}
                    readOnly
                />
            </div>
        </figure>
    );

    if (!extended) {
        return (
            <div className="ps-product__shopping">
                {renderQuantityControl()}
                <a className="ps-btn ps-btn--black" href="#" onClick={handleAddItemToCart}>
                    Add to cart
                </a>
                <a className="ps-btn" href="#" onClick={handleBuynow}>
                    Buy Now
                </a>
                <div className="ps-product__actions">
                    <a href="#" onClick={handleAddItemToWishlist}>
                        <i className="icon-heart" />
                    </a>
                    <a href="#" onClick={handleAddItemToCompare}>
                        <i className="icon-chart-bars" />
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <div className="ps-product__btn-group">
                    {renderQuantityControl()}
                    <a className="ps-btn ps-btn--black" href="#" onClick={handleAddItemToCart}>
                        Add to cart
                    </a>
                    <div className="ps-product__actions">
                        <a href="#" onClick={handleAddItemToWishlist}>
                            <i className="icon-heart" />
                        </a>
                        <a href="#" onClick={handleAddItemToCompare}>
                            <i className="icon-chart-bars" />
                        </a>
                    </div>
                </div>
                <a className="ps-btn" href="#" onClick={handleBuynow}>
                    Buy Now
                </a>
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
