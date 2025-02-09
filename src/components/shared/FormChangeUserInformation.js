import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const FormChangeUserInformation = () => {
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
    return (
        <form className="ps-form--account-setting">
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Username or email address"

                    />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group submit">
                    <button className="ps-btn">Update profile</button>
                </div>
            </div>
        </form>
    );
};

export default FormChangeUserInformation;
