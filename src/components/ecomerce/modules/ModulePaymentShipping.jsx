// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// const ModulePaymentShipping = () => {
//     const [userData, setUserData] = useState(null);
//     const [selectedAddress, setSelectedAddress] = useState(null);

//      useEffect(() => {

//          // Retrieve user data from localStorage
//          const storedData = localStorage.getItem('userData');
//          if (storedData) {
//              setUserData(JSON.parse(storedData));
//          }

//          // Retrieve the selected address from localStorage
//          const storedAddress = localStorage.getItem('selectedAddress');
//          if (storedAddress) {
//              setSelectedAddress(JSON.parse(storedAddress));
//          }
//      }, []);    

//  const contact = userData?.email ;
// //  const shippingMethod = userData?.shippingMethod || defaultData.shippingMethod;
// //  const shippingCost = userData?.shippingCost || defaultData.shippingCost;
//     return (
//         <>
//             <div className="ps-block__panel">
//                 <figure>
//                     <small>Contact</small>
//                     <p>{contact}</p>
//                     <Link href="/account/checkout">Change</Link>
//                 </figure>
//                 <figure>
//                     <small>Ship to</small>
//                     <p>
//                                             {selectedAddress
//                                                 ? `${selectedAddress.attributes.Address}, ${selectedAddress.attributes.Area}, ${selectedAddress.attributes.City}, ${selectedAddress.attributes.Country}, Postal Code: ${selectedAddress.attributes.Postal_Code}`
//                                                 : 'No address selected'}
//                                         </p>
//                     <Link href="/account/checkout">Change</Link>
//                 </figure>
//             </div>
//             <h4>Shipping Method</h4>
//             <div className="ps-block__panel">
//                 <figure>
//                     <small>International Shipping</small>
//                     <strong>$20.00</strong>
//                 </figure>
//             </div>
//         </>
//     );
// };

// export default ModulePaymentShipping;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ModulePaymentShipping = () => {
    const [userData, setUserData] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }

        // Retrieve the selected address from localStorage
        const storedAddress = localStorage.getItem('selectedAddress');
        if (storedAddress) {
            setSelectedAddress(JSON.parse(storedAddress));
        }
    }, []);

    const contact = userData?.email;
    const addressDetails =
        selectedAddress?.attributes || selectedAddress || null;

    //  const shippingMethod = userData?.shippingMethod || defaultData.shippingMethod;
    //  const shippingCost = userData?.shippingCost || defaultData.shippingCost;
    return (
        <>
            <div className="ps-block__panel">
                <figure>
                    <small>Contact</small>
                    <p>{contact}</p>
                    <Link href="/account/checkout">Change</Link>
                </figure>
                <figure>
                    <small>Ship to</small>
                    <p>
                        {addressDetails
                            ? `${addressDetails.Address || ''}, ${addressDetails.Area || ''
                            }, ${addressDetails.City || ''}, ${addressDetails.Country || ''
                            }, Postal Code: ${addressDetails.Postal_Code || ''
                            }`
                            : 'No address selected'}
                    </p>

                    <Link href="/account/checkout">Change</Link>
                </figure>
            </div>
            <div className="ps-block--payment-method"> <h4 className>Shipping Method</h4>
             <div className="ps-block__panel">
                <figure>
                    <small>International Shipping</small>
                    {/* <strong>$20.00</strong> */}
                </figure>
            </div>
            </div>
           
           
        </>
    );
};

export default ModulePaymentShipping;
