import React, { Component } from 'react';
import { Menu, Spin } from 'antd';

const { SubMenu } = Menu;

class PanelCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [], // Store fetched categories
            openKeys: ['sub1'],
            loading: true, // Track loading state
        };
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }

    // Fetch categories from the API
    fetchCategories = async () => {
        try {
            const response = await fetch('https://strapi-app-tntk.onrender.com/api/product-categories');
            const data = await response.json();
            if (data && data.data) {
                const transformedCategories = data.data.map((category) => ({
                    id: category.id,
                    name: this.formatSlugToText(category.attributes.slug),
                    slug: category.attributes.slug,
                }));
                this.setState({ categories: transformedCategories, loading: false });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            this.setState({ loading: false });
        }
    };

    // Convert slugs to user-friendly text
    formatSlugToText = (slug) => {
        return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Handle open keys for the Menu
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    // Fetch categories when the component mounts
    componentDidMount() {
        this.fetchCategories();
    }

    render() {
        const { categories, loading } = this.state;

        if (loading) {
            return <Spin size="large" />;
        }

        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}>
                {categories.map((category) => (
                    <Menu.Item key={category.id}>
                        <a href={`/shop?category=${category.slug}`}>{category.name}</a>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default PanelCategories;
