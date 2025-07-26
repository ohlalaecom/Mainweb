// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Form, Input, Radio, Button, message } from 'antd';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://157.230.29.110:1337/api',
//     withCredentials: true,
// });

// export default function FormCheckoutInformation() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userDetails, setUserDetails] = useState(null);
//     console.log("ALL THE USER DETAILS ARE HERE", userDetails);
//     const [existingAddresses, setExistingAddresses] = useState([]);
//     const [selectedAddress, setSelectedAddress] = useState('');
//     const [addNewAddress, setAddNewAddress] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const Router = useRouter();

//     useEffect(() => {
//         checkLoginStatus();
//     }, []);


//     const checkLoginStatus = async () => {
//         try {
//             const response = { data: { user: JSON.parse(localStorage.getItem('userData')) } };
//             console.log("THIS IS THE USERDATA contact", response.data.user);
//             if (response.data.user) {
//                 setIsLoggedIn(true);
//                 setUserDetails(response.data.user);
//                 fetchAddresses(response.data.user.id);
//             } else {
//                 handleRedirectToLogin();
//             }
//         } catch (error) {
//             console.error('Error checking login status:', error);
//             handleRedirectToLogin();
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleRedirectToLogin = () => {
//         Router.push(`/account/login?redirect=${encodeURIComponent('/account/checkout')}`);
//     };

//     const fetchAddresses = async (userId) => {
//         try {
//             const [userResponse, custAddressesResponse] = await Promise.all([
//                 axios.get(`http://157.230.29.110:1337/api/users/${userId}`),
//                 axios.get('http://157.230.29.110:1337/api/cust-addresses', { params: { userId } }),
//             ]);

//             const userAddress = userResponse.data?.address ? [userResponse.data.address] : [];
//             const custAddresses = custAddressesResponse.data || [];
//             console.log("CUSTADDRESS TOP", custAddresses.data);
//             setExistingAddresses(custAddresses.data);



//         } catch (error) {
//             console.error('Error fetching addresses:', error);
//         }
//     };

//     const handleAddressSelection = (e) => {
//         setSelectedAddress(e.target.value);
//         setAddNewAddress(e.target.value === 'new');
//     };

//     const handleFormSubmit = async (values) => {
//         try {
//             if (addNewAddress || !selectedAddress) {
//                 console.log("WE ARE POSTING ADDRESSES");
//                 await axios.post('http://157.230.29.110:1337/api/cust-addresses', {
//                     data: {
//                         Address: values.Address,
//                         Area: values.Area,
//                         Country: values.Country,
//                         City: values.City,
//                         Postal_Code: values.Postal_Code,
//                         userId: userDetails.id,
//                     }


//                 });
//                 message.success('Address added successfully!');
//             }



//             //Update user details if fields are not pre-filled
//             if (!userDetails.Contact_1 || !userDetails.dob || !userDetails.username || !userDetails.Contact_2) {
//                 console.log("WE ARE TRYING TO UPDATE THE FIELDS NOW", userDetails.Contact_1, userDetails.Contact_2, userDetails.dob, userDetails.username);
//                 await axios.put(`http://157.230.29.110:1337/api/users/${userDetails.id}`, {
//                     email: values.email || userDetails.email,
//                     Contact_1: values.Contact_1 || userDetails.Contact_1,
//                     Contact_2: values.Contact_2 || userDetails.Contact_2,
//                     dob: values.dob || userDetails.dob,
//                     username: values.username || userDetails.username,
//                 });
//                 message.success('User details updated successfully!');
//             }

//             Router.push('/account/shipping');
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             message.error('Failed to submit the form.');
//         }
//     };

//     if (isLoading) return <p>Loading...</p>;
//     if (!isLoggedIn) return null;

//     return (
//         <Form className="ps-form__billing-info" onFinish={handleFormSubmit}>
//             <h3 className="ps-form__heading">Contact Information</h3>

//             <div className="form-group">
//                 <Form.Item name="username" initialValue={userDetails?.username || ''}>
//                     <Input
//                         className="form-control"
//                         type="text"
//                         placeholder="Username"

//                     />
//                 </Form.Item>
//             </div>

//             <div className="form-group">
//                 <Form.Item name="email" initialValue={userDetails?.email || ''}>
//                     <Input
//                         className="form-control"
//                         type="email"
//                         placeholder="Email"
//                         readOnly={!!userDetails?.email}
//                     />
//                 </Form.Item>
//             </div>

//             <div className="form-group">
//                 <Form.Item name="contact" initialValue={userDetails?.Contact_1 || ''}>
//                     <Input
//                         className="form-control"
//                         type="text"
//                         placeholder="Primary Contact Number"

//                     />
//                 </Form.Item>
//             </div>

//             <div className="form-group">
//                 <Form.Item name="contact_1" initialValue={userDetails?.Contact_2 || ''}>
//                     <Input
//                         className="form-control"
//                         type="text"
//                         placeholder="Secondary Contact Number"

//                     />
//                 </Form.Item>
//             </div>

//             <div className="form-group" style={{display: "none"}}>
//                 <Form.Item name="dob" initialValue={userDetails?.DOB || ''}>
//                     <Input
//                         className="form-control"
//                         type="date"
//                         placeholder="Date of Birth"

//                     />
//                 </Form.Item>
//             </div>

//             {existingAddresses.length > 0 ? (
//                 <div style={{ width: '100%' }}>
//                     <h4>Select an Address</h4>
//                     <Radio.Group onChange={handleAddressSelection} value={selectedAddress}>
//                         {existingAddresses.map((address, index) => {
//                             console.log("mapaddress", address);
//                             return (
//                                 <Radio className="container-fluid"
//                                     key={index}
//                                     value={address.id || 'new'}
//                                     style={{
//                                         display: 'block',
//                                         // Ensure radio button occupies full width of its container
//                                         padding: '10px',
//                                         width: "700px",
//                                         border: '1px solid #ccc',
//                                         borderRadius: '8px',
//                                         backgroundColor: '#f9f9f9',
//                                         marginBottom: '10px',
//                                         color: '#333'
//                                     }}
//                                 >
//                                     <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.8', padding: '10px' }}>
//                                         <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{address.attributes.Address}</span>
//                                         <span style={{ marginBottom: '5px' }}>{address.attributes.Area}</span>
//                                         <span style={{ marginBottom: '5px' }}>{address.attributes.City}</span>
//                                         <span style={{ marginBottom: '5px' }}>{address.attributes.Country}</span>
//                                         <span>{`Postal Code: ${address.attributes.Postal_Code}`}</span>
//                                     </div>

//                                 </Radio>
//                             );
//                         })}
//                         <Radio value="new" style={{ width: '100%' }}>
//                             Add New Address
//                         </Radio>
//                     </Radio.Group>
//                 </div>

//             ) : (
//                 <p>No saved addresses found. Please add a new address.</p>
//             )}

//             {(addNewAddress || existingAddresses.length === 0) && (
//                 <div>
//                     <h3 className="ps-form__heading">Address Information</h3>
//                     <div className="form-group">
//                         <Form.Item
//                             name="Address"
//                             rules={[{ required: true, message: 'Enter your address!' }]}
//                         >
//                             <Input.TextArea className="form-control" rows={3} placeholder="Address" />
//                         </Form.Item>
//                     </div>
//                     <div className="form-group">
//                         <Form.Item
//                             name="City"
//                             rules={[{ required: true, message: 'Enter your city!' }]}
//                         >
//                             <Input className="form-control" type="text" placeholder="City" />
//                         </Form.Item>
//                     </div>
//                     <div className="form-group">
//                         <Form.Item
//                             name="Area"
//                             rules={[{ required: true, message: 'Enter your area!' }]}
//                         >
//                             <Input className="form-control" type="text" placeholder="Area" />
//                         </Form.Item>
//                     </div>
//                     <div className="form-group">
//                         <Form.Item
//                             name="Country"
//                             rules={[{ required: true, message: 'Enter your country!' }]}
//                         >
//                             <Input className="form-control" type="text" placeholder="Country" />
//                         </Form.Item>
//                     </div>
//                     <div className="form-group">
//                         <Form.Item
//                             name="Postal_Code"
//                             rules={[{ required: true, message: 'Enter your postal code!' }]}
//                         >
//                             <Input className="form-control" type="text" placeholder="Postal Code" />
//                         </Form.Item>
//                     </div>
//                 </div>
//             )}

//             <div className="ps-form__submit">
//                 <Link href={'/account/shopping-cart'}>
//                     <i className="icon-arrow-left mr-2" /> Return to shopping cart
//                 </Link>
//                 <div className="ps-block__footer">
//                     <Button type="primary" htmlType="submit" className="ps-btn" style={{ height: '60px' }}>
//                         Continue to shipping
//                     </Button>
//                 </div>
//             </div>
//         </Form>
//     );
// }


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input, Radio, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://157.230.29.110:1337/api',
    withCredentials: true,
});

export default function FormCheckoutInformation({ onSubmit }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    console.log("ALL THE USER DETAILS ARE HERE", userDetails);
    const [existingAddresses, setExistingAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [addNewAddress, setAddNewAddress] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const Router = useRouter();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value, // Dynamically update the property
        }));
    };













    useEffect(() => {
        checkLoginStatus();
    }, []);


    const checkLoginStatus = async () => {
        try {
            const response = { data: { user: JSON.parse(localStorage.getItem('userData')) } };
            console.log("THIS IS THE USERDATA contact", response.data.user);
            if (response.data.user) {
                setIsLoggedIn(true);
                setUserDetails(response.data.user);
                fetchAddresses(response.data.user.id);
            } else {
                handleRedirectToLogin();
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            handleRedirectToLogin();
        } finally {
            setIsLoading(false);
        }
    };

    const handleRedirectToLogin = () => {
        Router.push(`/account/login?redirect=${encodeURIComponent('/account/checkout')}`);
    };

    const fetchAddresses = async (userId) => {
        try {
            const [userResponse, custAddressesResponse] = await Promise.all([
                axios.get(`http://157.230.29.110:1337/api/users/${userId}`),
                axios.get('http://157.230.29.110:1337/api/cust-addresses', { params: { userId } }),
            ]);

            const userAddress = userResponse.data?.address ? [userResponse.data.address] : [];
            const custAddresses = custAddressesResponse.data || [];
            console.log("CUSTADDRESS TOP", custAddresses.data);
            setExistingAddresses(custAddresses.data);



        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddressSelection = (e) => {
        setSelectedAddress(e.target.value);
        setAddNewAddress(e.target.value === 'new');
    };
    console.log("existing data", existingAddresses)
    const handleFormSubmit = async (values) => {
        try {

            if (selectedAddress) {
                console.log("WE ARE POSTING ADDRESSES", selectedAddress);
                await axios.post('http://157.230.29.110:1337/api/cust-addresses', {
                    data: {
                        Address: values.Address,
                        Area: values.Area,
                        Country: values.Country,
                        City: values.City,
                        Postal_Code: values.Postal_Code,
                        userId: userDetails.id,
                    }


                });
                const result = existingAddresses.find(item => item.id === selectedAddress);
                console.log("result", result)


                localStorage.setItem("selectedAddress", JSON.stringify(result))
                message.success('Address added successfully!');
            }



            //Update user details if fields are not pre-filled
            if (true) {
                console.log("WE ARE TRYING TO UPDATE THE FIELDS NOW", userDetails.id, userDetails.Contact_1, userDetails.Contact_2, userDetails.username);
                await axios.put(`http://157.230.29.110:1337/api/users/${userDetails.id}`, {
                    email: userDetails.email,
                    Contact_1: userDetails.Contact_1,
                    Contact_2: userDetails.Contact_2,

                    username: userDetails.username,
                });
                message.success('User details updated successfully!');
            }
            onSubmit()

            Router.push('/account/shipping');
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('Failed to submit the form.');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!isLoggedIn) return null;

    return (
        <Form className="ps-form__billing-info" onFinish={handleFormSubmit}>
            <h3 className="ps-form__heading">Contact Information</h3>

            <div className="form-group">
                <Form.Item name="username" initialValue={userDetails?.username || ''}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}

                    />
                </Form.Item>
            </div>

            <div className="form-group">
                <Form.Item name="email" initialValue={userDetails?.email || ''}>
                    <Input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        readOnly={!!userDetails?.email}
                    />
                </Form.Item>
            </div>

            <div className="form-group">
                <Form.Item name="contact" initialValue={userDetails?.Contact_1 || ''}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Primary Contact Number"
                        name="Contact_1"
                        onChange={handleChange}

                    />
                </Form.Item>
            </div>

            <div className="form-group">
                <Form.Item name="contact_1" initialValue={userDetails?.Contact_2 || ''}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Secondary Contact Number"
                        name="Contact_2"
                        onChange={handleChange}

                    />
                </Form.Item>
            </div>

            <div className="form-group" style={{ display: "none" }}>
                <Form.Item name="dob" initialValue={userDetails?.dob || ''}>
                    <Input
                        className="form-control"
                        type="date"
                        placeholder="Date of Birth"
                        name="dob"
                        onChange={handleChange}

                    />
                </Form.Item>
            </div>

            {existingAddresses.length > 0 ? (
                <div style={{ width: '100%' }}>
                    <h4>Select an Address</h4>
                    <Radio.Group onChange={handleAddressSelection} value={selectedAddress}>
                        {existingAddresses.map((address, index) => {
                            console.log("mapaddress", address);
                            return (
                                <Radio className="container-fluid"
                                    key={index}
                                    value={address.id || 'new'}
                                    style={{
                                        display: 'block',
                                        // Ensure radio button occupies full width of its container
                                        padding: '10px',
                                        width: "700px",
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        backgroundColor: '#f9f9f9',
                                        marginBottom: '10px',
                                        color: '#333'
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.8', padding: '10px' }}>
                                        <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{address.attributes.Address}</span>
                                        <span style={{ marginBottom: '5px' }}>{address.attributes.Area}</span>
                                        <span style={{ marginBottom: '5px' }}>{address.attributes.City}</span>
                                        <span style={{ marginBottom: '5px' }}>{address.attributes.Country}</span>
                                        <span>{`Postal Code: ${address.attributes.Postal_Code}`}</span>
                                    </div>

                                </Radio>
                            );
                        })}
                        <Radio value="new" style={{ width: '100%' }}>
                            Add New Address
                        </Radio>
                    </Radio.Group>
                </div>

            ) : (
                <p>No saved addresses found. Please add a new address.</p>
            )}

            {(addNewAddress || existingAddresses.length === 0) && (
                <div>
                    <h3 className="ps-form__heading">Address Information</h3>
                    <div className="form-group">
                        <Form.Item
                            name="Address"
                            rules={[{ required: true, message: 'Enter your address!' }]}
                        >
                            <Input.TextArea className="form-control" rows={3} placeholder="Address" />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <Form.Item
                            name="City"
                            rules={[{ required: true, message: 'Enter your city!' }]}
                        >
                            <Input className="form-control" type="text" placeholder="City" />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <Form.Item
                            name="Area"
                            rules={[{ required: true, message: 'Enter your area!' }]}
                        >
                            <Input className="form-control" type="text" placeholder="Area" />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <Form.Item
                            name="Country"
                            rules={[{ required: true, message: 'Enter your country!' }]}
                        >
                            <Input className="form-control" type="text" placeholder="Country" />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <Form.Item
                            name="Postal_Code"
                            rules={[{ required: true, message: 'Enter your postal code!' }]}
                        >
                            <Input className="form-control" type="text" placeholder="Postal Code" />
                        </Form.Item>
                    </div>
                </div>
            )}

            <div className="ps-form__submit">
                <Link href={'/account/shopping-cart'}>
                    <i className="icon-arrow-left mr-2" /> Return to shopping cart
                </Link>
                <div className="ps-block__footer">
                    <Button type="primary" htmlType="submit" className="ps-btn" style={{ height: '60px' }}>
                        Continue to shipping
                    </Button>
                </div>
            </div>
        </Form>
    );
}
