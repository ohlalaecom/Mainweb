// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { Form, Input, Radio, Button, message } from 'antd';
// // import { useRouter } from 'next/navigation';
// // import axios from 'axios';

// // const axiosInstance = axios.create({
// //   baseURL: 'https://admin.jacobs-electronics.com/api',
// //   withCredentials: true,
// // });

// // export default function FormCheckoutInformation({ onSubmit }) {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [userDetails, setUserDetails] = useState(null);
// //   const [existingAddresses, setExistingAddresses] = useState([]);
// //   const [selectedAddress, setSelectedAddress] = useState('');
// //   const [addNewAddress, setAddNewAddress] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const Router = useRouter();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserDetails((prevDetails) => ({
// //       ...prevDetails,
// //       [name]: value,
// //     }));
// //   };

// //   useEffect(() => {
// //     checkLoginStatus();
// //   }, []);

// //   const checkLoginStatus = async () => {
// //     try {
// //       const response = { data: { user: JSON.parse(localStorage.getItem('userData')) } };
// //       if (response.data.user) {
// //         setIsLoggedIn(true);
// //         setUserDetails(response.data.user);
// //         fetchAddresses(response.data.user.id);
// //       } else {
// //         handleRedirectToLogin();
// //       }
// //     } catch (error) {
// //       console.error('Error checking login status:', error);
// //       handleRedirectToLogin();
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleRedirectToLogin = () => {
// //     Router.push(`/account/login?redirect=${encodeURIComponent('/account/checkout')}`);
// //   };

// //   const fetchAddresses = async (userId) => {
// //     try {
// //       const [, custAddressesResponse] = await Promise.all([
// //         axios.get(`https://admin.jacobs-electronics.com/api/users/${userId}`),
// //         axios.get('https://admin.jacobs-electronics.com/api/cust-addresses', {
// //           params: { userId },
// //         }),
// //       ]);
// //       const custAddresses = custAddressesResponse.data || [];
// //       setExistingAddresses(custAddresses.data);
// //     } catch (error) {
// //       console.error('Error fetching addresses:', error);
// //     }
// //   };

// //   const handleAddressSelection = (e) => {
// //     setSelectedAddress(e.target.value);
// //     setAddNewAddress(e.target.value === 'new');
// //   };

// //   const handleFormSubmit = async (values) => {
// //     try {
// //       let finalAddress = null;

// //       if (addNewAddress) {
// //         const res = await axios.post('https://admin.jacobs-electronics.com/api/cust-addresses', {
// //           data: {
// //             Address: values.Address,
// //             Area: values.Area,
// //             Country: values.Country,
// //             City: values.City,
// //             Postal_Code: values.Postal_Code,
// //             userId: userDetails.id,
// //           },
// //         });
// //         finalAddress = res.data.data;
// //         message.success('New address added successfully!');
// //       } else {
// //         finalAddress = existingAddresses.find(item => item.id === selectedAddress);
// //       }

// //       if (finalAddress) {
// //         localStorage.setItem("selectedAddress", JSON.stringify(finalAddress));
// //       }

// //       await axios.put(`https://admin.jacobs-electronics.com/api/users/${userDetails.id}`, {
// //         email: userDetails.email,
// //         Contact_1: userDetails.Contact_1,
// //         Contact_2: userDetails.Contact_2,
// //         username: userDetails.username,
// //       });

// //       message.success('User details updated successfully!');
// //       onSubmit?.();
// //       Router.push('/account/shipping');
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //       message.error('Failed to submit the form.');
// //     }
// //   };

// //   if (isLoading) return <p>Loading...</p>;
// //   if (!isLoggedIn) return null;

// //   return (
// //   <Form
// //   className="ps-form__billing-info"
// //   onFinish={handleFormSubmit}
// //   layout="vertical"
// //   style={{ maxWidth: 700, margin: '0 auto', fontSize: 16 }} // base font size increased here
// // >
// //   <h3 className="ps-form__heading" style={{ fontSize: 22, fontWeight: '600' }}>
// //     Contact Information
// //   </h3>

// //   <Form.Item
// //     name="username"
// //     initialValue={userDetails?.username || ''}
// //     label="Name"
// //     style={{ marginBottom: 12 }}
// //     labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}  // label font size increased
// //   >
// //     <Input
// //       placeholder="Username"
// //       name="username"
// //       onChange={handleChange}
// //       style={{ fontSize: 16 }}
// //     />
// //   </Form.Item>

// //   <Form.Item
// //     name="email"
// //     initialValue={userDetails?.email || ''}
// //     label="Email"
// //     style={{ marginBottom: 12 }}
// //     labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //   >
// //     <Input type="email" placeholder="Email" readOnly style={{ fontSize: 16 }} />
// //   </Form.Item>

// //   <Form.Item
// //     name="Contact_1"
// //     initialValue={userDetails?.Contact_1 || ''}
// //     label="Primary Contact"
// //     style={{ marginBottom: 12 }}
// //     labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //   >
// //     <Input
// //       type="text"
// //       placeholder="Primary Contact Number"
// //       name="Contact_1"
// //       onChange={handleChange}
// //       style={{ fontSize: 16 }}
// //     />
// //   </Form.Item>

// //   <Form.Item
// //     name="Contact_2"
// //     initialValue={userDetails?.Contact_2 || ''}
// //     label="Secondary Contact"
// //     style={{ marginBottom: 12 }}
// //     labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //   >
// //     <Input
// //       type="text"
// //       placeholder="Secondary Contact Number"
// //       name="Contact_2"
// //       onChange={handleChange}
// //       style={{ fontSize: 16 }}
// //     />
// //   </Form.Item>

// //   {existingAddresses.length > 0 ? (
// //     <>
// //       <h4 style={{ marginTop: 24, fontSize: 20, fontWeight: '600' }}>
// //         Select an Address
// //       </h4>
// //       <Radio.Group
// //         onChange={handleAddressSelection}
// //         value={selectedAddress}
// //         style={{ width: '100%', fontSize: 16 }}
// //       >
// //         {existingAddresses.map((address, index) => {
// //           const attrs = address.attributes;
// //           return (
// //             <Radio
// //               key={index}
// //               value={address.id}
// //               style={{
// //                 display: 'block',
// //                 marginBottom: 10,
// //                 border: '1px solid #d1d1d1',
// //                 borderRadius: 8,
// //                 backgroundColor: '#f2f9ff',
// //                 padding: 12,
// //                 fontSize: 16,   // increased font size here
// //                 color: '#333',
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: 'flex',
// //                   flexWrap: 'wrap',
// //                   gap: '8px',
// //                   color: '#333',
// //                   fontSize: 16,  // increased font size here
// //                 }}
// //               >
// //                 <strong>{attrs.Address},</strong>
// //                 <span>{attrs.Area},</span>
// //                 <span>{attrs.City},</span>
// //                 <span>{attrs.Country} -</span>
// //                 <span>{attrs.Postal_Code}</span>
// //               </div>
// //             </Radio>
// //           );
// //         })}
// //         <Radio
// //           value="new"
// //           style={{ display: 'block', marginTop: 10, fontSize: 16 }}
// //         >
// //           + Add New Address
// //         </Radio>
// //       </Radio.Group>
// //     </>
// //   ) : (
// //     <p style={{ marginTop: 16, fontSize: 16 }}>
// //       No saved addresses found. Please add a new address.
// //     </p>
// //   )}

// //   {(addNewAddress || existingAddresses.length === 0) && (
// //     <>
// //       <h3
// //         className="ps-form__heading"
// //         style={{ marginTop: 24, fontSize: 22, fontWeight: '600' }}
// //       >
// //         Address Information
// //       </h3>
// //       <Form.Item
// //         name="Address"
// //         label="Address"
// //         rules={[{ required: true, message: 'Enter your address!' }]}
// //         style={{ marginBottom: 10 }}
// //         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //       >
// //         <Input.TextArea rows={2} placeholder="Address" style={{ fontSize: 16 }} />
// //       </Form.Item>
// //       <Form.Item
// //         name="City"
// //         label="City"
// //         rules={[{ required: true, message: 'Enter your city!' }]}
// //         style={{ marginBottom: 10 }}
// //         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //       >
// //         <Input placeholder="City" style={{ fontSize: 16 }} />
// //       </Form.Item>
// //       <Form.Item
// //         name="Area"
// //         label="Area"
// //         rules={[{ required: true, message: 'Enter your area!' }]}
// //         style={{ marginBottom: 10 }}
// //         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //       >
// //         <Input placeholder="Area" style={{ fontSize: 16 }} />
// //       </Form.Item>
// //       <Form.Item
// //         name="Country"
// //         label="Country"
// //         rules={[{ required: true, message: 'Enter your country!' }]}
// //         style={{ marginBottom: 10 }}
// //         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //       >
// //         <Input placeholder="Country" style={{ fontSize: 16 }} />
// //       </Form.Item>
// //       <Form.Item
// //         name="Postal_Code"
// //         label="Postal Code"
// //         rules={[{ required: true, message: 'Enter your postal code!' }]}
// //         style={{ marginBottom: 20 }}
// //         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
// //       >
// //         <Input placeholder="Postal Code" style={{ fontSize: 16 }} />
// //       </Form.Item>
// //     </>
// //   )}

// //   <div
// //     className="ps-form__submit"
// //     style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
// //   >
// //     <Link href={'/account/shopping-cart'}>
// //       <i className="icon-arrow-left mr-2" />
// //       Return to shopping cart
// //     </Link>
// //     <Button type="primary" htmlType="submit" style={{ height: 48, padding: '0 24px', fontSize: 16 }}>
// //       Continue to shipping
// //     </Button>
// //   </div>
// // </Form>

// //   );
// // }
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Form, Input, Radio, Button, message } from 'antd';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function FormCheckoutInformation({ onSubmit }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [existingAddresses, setExistingAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState('');
//   const [addNewAddress, setAddNewAddress] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const Router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         if (user?.id) {
//           setIsLoggedIn(true);
//           setUserDetails(user);
//           fetchAddresses(user.id);
//         }
//       } catch (err) {
//         console.error('Error parsing userData:', err);
//       }
//     } else {
//       handleRedirectToLogin();
//     }
//     setIsLoading(false);
//   }, []);

//   const handleRedirectToLogin = () => {
//     Router.push(`/account/login?redirect=${encodeURIComponent('/account/checkout')}`);
//   };

//   const fetchAddresses = async (userId) => {
//     try {
//       const res = await axios.get(`https://admin.jacobs-electronics.com/api/cust-addresses?filters[users_permissions_user][id][$eq]=${userId}`);
//       const addresses = res?.data?.data || [];
//       const normalized = addresses.map((item) => ({ id: item.id, ...item.attributes }));
//       setExistingAddresses(normalized);
//     } catch (error) {
//       console.error('Error fetching addresses:', error);
//     }
//   };

//   const handleAddressSelection = (e) => {
//     setSelectedAddress(e.target.value);
//     setAddNewAddress(e.target.value === 'new');
//   };

//   const handleFormSubmit = async (values) => {
//     try {
//       if (!userDetails.Contact_1) {
//         return message.error('Primary contact number is required.');
//       }

//       const updatedUser = {
//         email: userDetails.email,
//         username: userDetails.username,
//         Contact_1: userDetails.Contact_1,
//         Contact_2: userDetails.Contact_2 || '',
//       };

//       await axios.put(`https://admin.jacobs-electronics.com/api/users/${userDetails.id}`, updatedUser);

//       let finalAddress;
//       if (addNewAddress) {
//         const res = await axios.post('https://admin.jacobs-electronics.com/api/cust-addresses', {
//           data: {
//             Address: values.Address,
//             Area: values.Area,
//             Country: values.Country,
//             City: values.City,
//             Postal_Code: values.Postal_Code,
//             users_permissions_user: userDetails.id,
//           },
//         });
//         finalAddress = res.data?.data;
//         message.success('New address added successfully.');
//       } else {
//         finalAddress = existingAddresses.find((a) => a.id === selectedAddress);
//       }

//       if (finalAddress) {
//         localStorage.setItem('selectedAddress', JSON.stringify(finalAddress));
//         message.success('User details updated successfully!');
//         onSubmit?.();
//         Router.push('/account/shipping');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       message.error('Submission failed.');
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (!isLoggedIn) return null;

//   return (
//     <Form
//       className="ps-form__billing-info"
//       onFinish={handleFormSubmit}
//       layout="vertical"
//       style={{ maxWidth: 700, margin: '0 auto', fontSize: 16 }}
//     >
//       <h3 className="ps-form__heading" style={{ fontSize: 22, fontWeight: '600' }}>
//         Contact Information
//       </h3>

//       <Form.Item
//         name="username"
//         initialValue={userDetails.username}
//         label="Name"
//         style={{ marginBottom: 12 }}
//         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//       >
//         <Input name="username" onChange={handleChange} style={{ fontSize: 16 }} />
//       </Form.Item>

//       <Form.Item
//         name="email"
//         initialValue={userDetails.email}
//         label="Email"
//         style={{ marginBottom: 12 }}
//         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//       >
//         <Input readOnly style={{ fontSize: 16 }} />
//       </Form.Item>

//       <Form.Item
//         name="Contact_1"
//         initialValue={userDetails.Contact_1}
//         label="Primary Contact"
//         style={{ marginBottom: 12 }}
//         rules={[{ required: true, message: 'Primary contact number is required.' }]}
//         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//       >
//         <Input name="Contact_1" onChange={handleChange} style={{ fontSize: 16 }} />
//       </Form.Item>

//       <Form.Item
//         name="Contact_2"
//         initialValue={userDetails.Contact_2}
//         label="Secondary Contact"
//         style={{ marginBottom: 12 }}
//         labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//       >
//         <Input name="Contact_2" onChange={handleChange} style={{ fontSize: 16 }} />
//       </Form.Item>

//       {existingAddresses.length > 0 ? (
//         <>
//           <h4 style={{ marginTop: 24, fontSize: 20, fontWeight: '600' }}>Select an Address</h4>
//           <Radio.Group
//             onChange={handleAddressSelection}
//             value={selectedAddress}
//             style={{ width: '100%', fontSize: 16 }}
//           >
//             {existingAddresses.map((address, index) => (
//               <Radio
//                 key={index}
//                 value={address.id}
//                 style={{
//                   display: 'block',
//                   marginBottom: 10,
//                   border: '1px solid #d1d1d1',
//                   borderRadius: 8,
//                   backgroundColor: '#f2f9ff',
//                   padding: 12,
//                   fontSize: 16,
//                   color: '#333',
//                 }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: '8px',
//                     color: '#333',
//                     fontSize: 16,
//                   }}
//                 >
//                   <strong>{address.Address},</strong>
//                   <span>{address.Area},</span>
//                   <span>{address.City},</span>
//                   <span>{address.Country} -</span>
//                   <span>{address.Postal_Code}</span>
//                 </div>
//               </Radio>
//             ))}
//             <Radio value="new" style={{ display: 'block', marginTop: 10, fontSize: 16 }}>
//               + Add New Address
//             </Radio>
//           </Radio.Group>
//         </>
//       ) : (
//         <p style={{ marginTop: 16, fontSize: 16 }}>
//           No saved addresses found. Please add a new address.
//         </p>
//       )}

//       {(addNewAddress || existingAddresses.length === 0) && (
//         <>
//           <h3 className="ps-form__heading" style={{ marginTop: 24, fontSize: 22, fontWeight: '600' }}>
//             Address Information
//           </h3>
//           <Form.Item
//             name="Address"
//             label="Address"
//             rules={[{ required: true, message: 'Enter your address!' }]}
//             style={{ marginBottom: 10 }}
//             labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//           >
//             <Input.TextArea rows={2} style={{ fontSize: 16 }} />
//           </Form.Item>
//           <Form.Item
//             name="City"
//             label="City"
//             rules={[{ required: true, message: 'Enter your city!' }]}
//             style={{ marginBottom: 10 }}
//             labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//           >
//             <Input style={{ fontSize: 16 }} />
//           </Form.Item>
//           <Form.Item
//             name="Area"
//             label="Area"
//             rules={[{ required: true, message: 'Enter your area!' }]}
//             style={{ marginBottom: 10 }}
//             labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//           >
//             <Input style={{ fontSize: 16 }} />
//           </Form.Item>
//           <Form.Item
//             name="Country"
//             label="Country"
//             rules={[{ required: true, message: 'Enter your country!' }]}
//             style={{ marginBottom: 10 }}
//             labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//           >
//             <Input style={{ fontSize: 16 }} />
//           </Form.Item>
//           <Form.Item
//             name="Postal_Code"
//             label="Postal Code"
//             rules={[{ required: true, message: 'Enter your postal code!' }]}
//             style={{ marginBottom: 20 }}
//             labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
//           >
//             <Input style={{ fontSize: 16 }} />
//           </Form.Item>
//         </>
//       )}

//       <div
//         className="ps-form__submit"
//         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
//       >
//         <Link href={'/account/shopping-cart'}>
//           <i className="icon-arrow-left mr-2" />
//           Return to shopping cart
//         </Link>
//         <Button type="primary" htmlType="submit" style={{ height: 48, padding: '0 24px', fontSize: 16 }}>
//           Continue to shipping
//         </Button>
//       </div>
//     </Form>
//   );
// }


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input, Radio, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './formcheckout.css';


export default function FormCheckoutInformation({ onSubmit }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.id) {
          setIsLoggedIn(true);
          setUserDetails(user);
          fetchAddresses(user.id);
        }
      } catch (err) {
        console.error('Error parsing userData:', err);
      }
    } else {
      handleRedirectToLogin();
    }
    setIsLoading(false);
  }, []);

  const handleRedirectToLogin = () => {
    Router.push(`/account/login?redirect=${encodeURIComponent('/account/checkout')}`);
  };

  const fetchAddresses = async (userId) => {
    try {
      const res = await axios.get(`https://admin.jacobs-electronics.com/api/cust-addresses?filters[users_permissions_user][id][$eq]=${userId}`);
      const addresses = res?.data?.data || [];
      const normalized = addresses.map((item) => ({ id: item.id, ...item.attributes }));
      setExistingAddresses(normalized);

      if (normalized.length === 0) {
        setAddNewAddress(true);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSelection = (e) => {
    setSelectedAddress(e.target.value);
    setAddNewAddress(e.target.value === 'new');
  };

  const handleFormSubmit = async (values) => {
    try {
      if (!userDetails.Contact_1) {
        return message.error('Primary contact number is required.');
      }

      const updatedUser = {
        email: userDetails.email,
        username: userDetails.username,
        Contact_1: userDetails.Contact_1,
        Contact_2: userDetails.Contact_2 || '',
      };

      await axios.put(`https://admin.jacobs-electronics.com/api/users/${userDetails.id}`, updatedUser);

      let finalAddress = null;

      if (addNewAddress || existingAddresses.length === 0) {
        const res = await axios.post('https://admin.jacobs-electronics.com/api/cust-addresses', {
          data: {
            Address: values.Address,
            Area: values.Area,
            Country: values.Country,
            City: values.City,
            Postal_Code: values.Postal_Code,
            users_permissions_user: userDetails.id,
          },
        });
        finalAddress = res.data?.data;
        message.success('New address added successfully.');
      } else if (selectedAddress) {
        finalAddress = existingAddresses.find((a) => a.id === selectedAddress);
      }

      if (finalAddress) {
        localStorage.setItem('selectedAddress', JSON.stringify(finalAddress));
        message.success('User details updated successfully!');
        onSubmit?.();
        Router.push('/account/shipping');
      } else {
        message.error('Please select or add an address before proceeding.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Submission failed.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isLoggedIn) return null;

  return (
    <Form
      className="ps-form__billing-info"
      onFinish={handleFormSubmit}
      layout="vertical"
      style={{ maxWidth: 700, margin: '0 auto', fontSize: 16 }}
    >
      <h3 className="ps-form__heading" style={{ fontSize: 22, fontWeight: '600' }}>
        Contact Information
      </h3>

      <Form.Item
        name="username"
        initialValue={userDetails.username}
        label="Name"
        style={{ marginBottom: 12 }}
        labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
      >
        <Input name="username" onChange={handleChange} style={{ fontSize: 16 }} />
      </Form.Item>

      <Form.Item
        name="email"
        initialValue={userDetails.email}
        label="Email"
        style={{ marginBottom: 12 }}
        labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
      >
        <Input readOnly style={{ fontSize: 16 }} />
      </Form.Item>

      <Form.Item
        name="Contact_1"
        initialValue={userDetails.Contact_1}
        label="Primary Contact"
        style={{ marginBottom: 12 }}
        rules={[{ required: true, message: 'Primary contact number is required.' }]}
        labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
      >
        <Input name="Contact_1" onChange={handleChange} style={{ fontSize: 16 }} />
      </Form.Item>

      <Form.Item
        name="Contact_2"
        initialValue={userDetails.Contact_2}
        label="Secondary Contact"
        style={{ marginBottom: 12 }}
        labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
      >
        <Input name="Contact_2" onChange={handleChange} style={{ fontSize: 16 }} />
      </Form.Item>

      {existingAddresses.length > 0 && (
        <>
          <h4 style={{ marginTop: 24, fontSize: 20, fontWeight: '600' }}>Select an Address</h4>
          <Radio.Group
            onChange={handleAddressSelection}
            value={selectedAddress}
            style={{ width: '100%', fontSize: 16 }}
          >
            {existingAddresses.map((address, index) => (
              <Radio
                key={index}
                value={address.id}
                style={{
                  display: 'block',
                  marginBottom: 10,
                  border: '1px solid #d1d1d1',
                  borderRadius: 8,
                  backgroundColor: '#f2f9ff',
                  padding: 12,
                  fontSize: 16,
                  color: '#333',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    color: '#333',
                    fontSize: 16,
                  }}
                >
                  <strong>{address.Address},</strong>
                  <span>{address.Area},</span>
                  <span>{address.City},</span>
                  <span>{address.Country} -</span>
                  <span>{address.Postal_Code}</span>
                </div>
              </Radio>
            ))}
            <Radio value="new" style={{ display: 'block', marginTop: 10, fontSize: 16 }}>
              + Add New Address
            </Radio>
          </Radio.Group>
        </>
      )}

      {(addNewAddress || existingAddresses.length === 0) && (
        <>
          <h3 className="ps-form__heading" style={{ marginTop: 24, fontSize: 22, fontWeight: '600' }}>
            Address Information
          </h3>
          <Form.Item
            name="Address"
            label="Address"
            rules={[{ required: true, message: 'Enter your address!' }]}
            style={{ marginBottom: 10 }}
            labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
          >
            <Input.TextArea rows={2} style={{ fontSize: 16 }} />
          </Form.Item>
          <Form.Item
            name="City"
            label="City"
            rules={[{ required: true, message: 'Enter your city!' }]}
            style={{ marginBottom: 10 }}
            labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
          >
            <Input style={{ fontSize: 16 }} />
          </Form.Item>
          <Form.Item
            name="Area"
            label="Area"
            rules={[{ required: true, message: 'Enter your area!' }]}
            style={{ marginBottom: 10 }}
            labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
          >
            <Input style={{ fontSize: 16 }} />
          </Form.Item>
          <Form.Item
            name="Country"
            label="Country"
            rules={[{ required: true, message: 'Enter your country!' }]}
            style={{ marginBottom: 10 }}
            labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
          >
            <Input style={{ fontSize: 16 }} />
          </Form.Item>
          <Form.Item
            name="Postal_Code"
            label="Postal Code"
            rules={[{ required: true, message: 'Enter your postal code!' }]}
            style={{ marginBottom: 20 }}
            labelCol={{ style: { fontSize: 16, fontWeight: '500' } }}
          >
            <Input style={{ fontSize: 16 }} />
          </Form.Item>
        </>
      )}

      <div
        className="ps-form__submit"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Link href={'/account/shopping-cart'}>
          <i className="icon-arrow-left mr-2" />
          Return to shopping cart
        </Link>
        <Button type="primary" htmlType="submit" style={{ height: 48, padding: '0 24px', fontSize: 16 }}>
          Continue to shipping
        </Button>
      </div>
    </Form>
  );
}
