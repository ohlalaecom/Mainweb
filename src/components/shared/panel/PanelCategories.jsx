import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Spin } from 'antd';
import Link from 'next/link';

const { SubMenu } = Menu;

class PanelCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [], // Tracks open submenus
            categories: [], // Categories data
            products: {}, // Cached products for each category
            loadingCategories: true, // Loading state for categories
            fetchingProducts: null, // Currently fetching products for a category
        };
        this.rootSubmenuKeys = []; // Initializing with empty array
    }

    // Fetch categories from the API
    fetchCategories = async () => {
        try {
            const response = await fetch('http://157.230.29.110:1337/api/product-categories');
            const data = await response.json();
            if (data && data.data) {
                const transformedCategories = data.data.map((category) => ({
                    id: category.id,
                    text: this.formatSlugToText(category.attributes.slug),
                    slug: category.attributes.slug,
                    subMenu: category.attributes.subcategories || [],
                }));
                // Initialize the rootSubmenuKeys based on transformed categories
                this.rootSubmenuKeys = transformedCategories.map((category) => category.slug);
                this.setState({ categories: transformedCategories, loadingCategories: false });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            this.setState({ loadingCategories: false });
        }
    };

    // Fetch products for a category
    fetchProducts = async (categoryId) => {
        this.setState({ fetchingProducts: categoryId });
        try {
            const url = `http://157.230.29.110:1337/api/products?filters[category][id]=${categoryId}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.data) {
                const products = data.data.map((product) => ({
                    id: product.id,
                    text: product.attributes.title,
                    slug: product.attributes.slug,
                }));
                this.setState((prevState) => ({
                    products: { ...prevState.products, [categoryId]: products },
                    fetchingProducts: null,
                }));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ fetchingProducts: null });
        }
    };

    // Convert slugs to user-friendly text
    formatSlugToText = (slug) => {
        return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Handle open keys for the Menu
    onOpenChange = (openKeys) => {
        // Extract the latest key that was opened or closed
        const latestOpenKey = openKeys.find((key) => !this.state.openKeys.includes(key));

        if (this.rootSubmenuKeys.includes(latestOpenKey)) {
            // If a root submenu key is clicked, toggle it
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [], // If a key is clicked, open it, else close it
            });
        } else {
            // Otherwise, set the open keys as received
            this.setState({ openKeys });
        }
    };

    // Fetch categories when the component mounts
    componentDidMount() {
        this.fetchCategories();
    }

    render() {
        const { categories, loadingCategories, products, fetchingProducts, openKeys } = this.state;

        if (loadingCategories) {
            return <Spin size="large" />;
        }

        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                className="menu--mobile-2">
                {categories.map((item) => {
                    const productItems = products[item.id] || [];
                    return (
                        <SubMenu
                            key={item.slug} // Ensure each submenu has a unique key (category slug here)
                            title={
                                <div
                                    onClick={() => !products[item.id] && this.fetchProducts(item.id)}
                                >
                                    <Link href={`/category/${item.slug}`}>{item.text}</Link>
                                </div>
                            }>
                            {fetchingProducts === item.id ? (
                                <Menu.Item key="loading">
                                    <Spin size="small" />
                                </Menu.Item>
                            ) : (
                                productItems.map((product) => (
                                    <Menu.Item key={product.id}>
                                        <Link href={`/product/${product.slug}`}>{product.text}</Link>
                                    </Menu.Item>
                                ))
                            )}
                        </SubMenu>
                    );
                })}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(PanelCategories);