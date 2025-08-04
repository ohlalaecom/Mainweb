// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// const FormChangeUserInformation = () => {
//     const [userData, setUserData] = useState(null);
//     const [selectedAddress, setSelectedAddress] = useState(null);
//     useEffect(() => {

//         // Retrieve user data from localStorage
//         const storedData = localStorage.getItem('userData');
//         if (storedData) {
//             setUserData(JSON.parse(storedData));
//         }

//         // Retrieve the selected address from localStorage
//         const storedAddress = localStorage.getItem('selectedAddress');
//         if (storedAddress) {
//             setSelectedAddress(JSON.parse(storedAddress));
//         }
//     }, []);

//     const contact = userData?.email;
//     return (
//         <form className="ps-form--account-setting">
//             <div className="ps-form__header">
//                 <h3>Account Information</h3>
//             </div>
//             <div className="ps-form__content">
//                 <div className="form-group">
//                     <input
//                         className="form-control"
//                         type="text"
//                         placeholder="Username or email address"

//                     />
//                 </div>
//                 <div className="row">
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="First name"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Last name"
//                             />
//                         </div>
//                     </div>

//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Phone Number"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Email Address"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Address"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="City"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Country"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="form-group submit">
//                     <button className="ps-btn">Update profile</button>
//                 </div>
//             </div>
//         </form>
//     );
// };

// export default FormChangeUserInformation;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormChangeUserInformation = () => {
    const [userData, setUserData] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        contact_1: '',
        contact_2: '',
        gender: '',
        dob: '',
        address: '',
        area: '',
        city: '',
        country: '',
        postalCode: '',
    });

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const parsedUserData = JSON.parse(storedData);
            setUserData(parsedUserData);
            fetchUserDetails(parsedUserData.id);
        }
    }, []);

    const fetchUserDetails = async (id) => {
        try {
            const res = await axios.get(`https://admin.jacobs-electronics.com/api/users/${id}?populate=cust_addresses`);
            const user = res.data;
            const primaryAddress = user.cust_addresses?.[0] || {};

            setFormValues({
                username: user.username || '',
                email: user.email || '',
                contact_1: user.Contact_1 || '',
                contact_2: user.Contact_2 || '',
                gender: user.Gender || '',
                dob: user.DOB || '',
                address: primaryAddress.Address || '',
                area: primaryAddress.Area || '',
                city: primaryAddress.City || '',
                country: primaryAddress.Country || '',
                postalCode: primaryAddress.Postal_Code || '',
            });
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData) return;

        try {
            await axios.put(`https://admin.jacobs-electronics.com/api/users/${userData.id}`, {
                username: formValues.username,
                Contact_1: formValues.contact_1,
                Contact_2: formValues.contact_2,
                Gender: formValues.gender,
                DOB: formValues.dob,
            });

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <form className="ps-form--account-setting" onSubmit={handleSubmit}>
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">

                {/* Username */}
                <div className="form-group">
                    <label>Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label>Email (not editable)</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formValues.email}
                        disabled
                    />
                </div>

                {/* Contact 1 */}
                <div className="form-group">
                    <label>Contact Number 1</label>
                    <input
                        className="form-control"
                        type="text"
                        name="contact_1"
                        value={formValues.contact_1}
                        onChange={handleChange}
                    />
                </div>

                {/* Contact 2 */}
                <div className="form-group">
                    <label>Contact Number 2</label>
                    <input
                        className="form-control"
                        type="text"
                        name="contact_2"
                        value={formValues.contact_2}
                        onChange={handleChange}
                    />
                </div>

                {/* Gender */}
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        className="form-control"
                        name="gender"
                        value={formValues.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* DOB */}
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        className="form-control"
                        type="date"
                        name="dob"
                        value={formValues.dob}
                        onChange={handleChange}
                    />
                </div>

                <h4>Primary Address (Read Only)</h4>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        className="form-control"
                        type="text"
                        name="address"
                        value={formValues.address}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Area</label>
                    <input
                        className="form-control"
                        type="text"
                        name="area"
                        value={formValues.area}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input
                        className="form-control"
                        type="text"
                        name="city"
                        value={formValues.city}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Country</label>
                    <input
                        className="form-control"
                        type="text"
                        name="country"
                        value={formValues.country}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Postal Code</label>
                    <input
                        className="form-control"
                        type="text"
                        name="postalCode"
                        value={formValues.postalCode}
                        readOnly
                    />
                </div>

                <div className="form-group submit">
                    <button className="ps-btn" type="submit">
                        Update Profile
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormChangeUserInformation;