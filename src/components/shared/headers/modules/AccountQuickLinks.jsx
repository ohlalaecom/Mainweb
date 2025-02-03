import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { clearUser } from '~/redux/features/userSlide';
import { useRouter } from 'next/navigation'; // Next.js hooks

const AccountQuickLinks = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.user);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [adminName, setAdminName] = useState("");
    
    useEffect(() => {
        // Check if the component is running in the browser and access localStorage
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("userData");
            if (userData) {
                setAuthenticated(true);  // Update state based on the value in localStorage
                const userDatajson = JSON.parse(userData)
                console.log("i am hero of the code ", userDatajson);
                setAdminName(userDatajson.username);
            }
        }
    }, []);


    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
        console.log(`Dropdown visibility: ${!dropdownVisible}`);
    };

    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        if (loggedOut) {
            window.location.reload();
        }
    }, [loggedOut]);


    // Handle logout logic
    const handleLogout = (e) => {
        e.preventDefault();
        // localStorage.removeItem('authToken');
        // localStorage.removeItem('isLoggedIn');
        // localStorage.removeItem('userData');
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            setLoggedOut(true)
            router.push("/");
            dispatch(clearUser());
            
        }
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
                console.log('Clicked outside dropdown, closing it.');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Debugging: Ensure state is updating correctly
    useEffect(() => {
        console.log(`Dropdown is now: ${dropdownVisible ? 'Visible' : 'Hidden'}`);
    }, [dropdownVisible]);

    return (
        <div
            className="ps-block--user-account"
            ref={dropdownRef}
            style={{ position: 'relative', display: 'inline-block', zIndex: 9999 }}
        >
            {/* User Icon and Dropdown Toggle */}
            <div
                className="user-icon"
                onClick={toggleDropdown}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <i className="icon-user" style={{ fontSize: '20px' }} />
                {authenticated ? (
                    <span>
                        Welcome, {adminName || 'User'}{' '}
                        <span style={{ fontSize: '14px', marginLeft: '5px' }}>▼</span>
                    </span>
                ) : (
                    <span>
                        <Link href="/account/login">Login</Link> |{' '}
                        <Link href="/account/register">Register</Link>
                    </span>
                )}
            </div>

            {/* Dropdown Menu */}
            {dropdownVisible && authenticated && (
                <div
                    className="ps-dropdown-menu"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: '0',
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        zIndex: 100000,
                        padding: '10px',
                        width: '200px',
                    }}
                >
                    <ul className="ps-list--arrow" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        <li style={{ marginBottom: '8px' }}>
                            <Link href="/account/user-information">Account Information</Link>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <Link href="/account/notifications">Notifications</Link>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <Link href="/account/invoices">Invoices</Link>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <Link href="/account/addresses">Address</Link>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <Link href="/account/recent-viewed-product">Recent Viewed Product</Link>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <Link href="/account/wishlist">Wishlist</Link>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AccountQuickLinks;
