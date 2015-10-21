"use strict";

var products = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }];
var FilterableProductTable = React.createClass({
	displayName: "FilterableProductTable",

	getInitialState: function getInitialState() {
		return { products: products };
	},
	handleSearch: function handleSearch(searchText) {
		var p = products.filter(function (pr) {});
		this.setState({ products: p });
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "FilterableProductTable" },
			React.createElement(SearchBar, { handleSearch: this.handleSearch }),
			React.createElement(ProductTable, { products: this.state.products })
		);
	}
});

var SearchBar = React.createClass({
	displayName: "SearchBar",

	handleChange: function handleChange(e) {
		this.props.handleSearch(this.refs.search.value);
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "SearchBar" },
			React.createElement("input", { ref: "search", type: "text", placeholder: "Search ...", onChange: this.handleChange }),
			React.createElement("br", null),
			React.createElement(
				"input",
				{ type: "checkbox", name: "onlyStock" },
				"Only show products in stock"
			)
		);
	}
});

var ProductTable = React.createClass({
	displayName: "ProductTable",

	render: function render() {
		var rows = [],
		    categories = [];
		this.props.products.forEach(function (product, index) {
			if (categories.indexOf(product.category) < 0) {
				categories.push(product.category);
				rows.push(React.createElement(ProductCategoryRow, { name: product.category }));
			}
			rows.push(React.createElement(ProductRow, { name: product.name, price: product.price, stocked: product.stocked }));
		});
		return React.createElement(
			"div",
			{ className: "ProductTable" },
			React.createElement(
				"table",
				null,
				React.createElement(
					"tbody",
					null,
					React.createElement(
						"tr",
						null,
						React.createElement(
							"th",
							null,
							"Name"
						),
						React.createElement(
							"th",
							null,
							"Price"
						)
					),
					rows
				)
			)
		);
	}
});

var ProductRow = React.createClass({
	displayName: "ProductRow",

	render: function render() {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				{ className: this.props.stocked ? "productRow" : "red" },
				this.props.name
			),
			React.createElement(
				"td",
				null,
				this.props.price,
				"$"
			)
		);
	}
});

var ProductCategoryRow = React.createClass({
	displayName: "ProductCategoryRow",

	render: function render() {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				{ className: "mybold" },
				this.props.name
			)
		);
	}
});

ReactDOM.render(React.createElement(FilterableProductTable, null), document.getElementById("content"));