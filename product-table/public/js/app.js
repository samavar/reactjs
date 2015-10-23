var products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
var FilterableProductTable = React.createClass({
	getInitialState: function(){
		return {products: products};
	},
	handleSearch: function(searchText){
		var p = products.filter(function(product){
			if(product.name.indexOf(searchText) > -1) {
				return true;
			}
			return false;
		});
		this.setState({products: p});
	},
	render: function() {
		return (
			<div className="FilterableProductTable">
				<SearchBar handleSearch = {this.handleSearch}/>
				<ProductTable products={this.state.products} />
			</div>
		);
	}
});

var SearchBar = React.createClass({
	handleChange: function(e){
		this.props.handleSearch(this.refs.search.value);
	},
	render: function() {
		return (
			<div className="SearchBar">
				<input ref="search" type="text" placeholder="Search ..." onChange={this.handleChange}></input>
				<br />
				<input type="checkbox" name="onlyStock">Only show products in stock</input>
			</div>
		);
	}
});

var ProductTable = React.createClass({
	render: function(){
		var rows = [],categories = [];
		this.props.products.forEach(function(product, index){
			if(categories.indexOf(product.category) < 0) {
				categories.push(product.category);
				rows.push(<ProductCategoryRow name={product.category} />)
			}		
			rows.push(<ProductRow name={product.name} price={product.price} stocked={product.stocked} />);	
		});
		return(
			<div className="ProductTable">
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Price</th>
						</tr>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
});

var ProductRow = React.createClass({
	render: function() {
		return(
			<tr>
				<td className={this.props.stocked ? "productRow" : "red"}>{this.props.name}</td>
				<td>{this.props.price}$</td>
			</tr>
		);
	}
});

var ProductCategoryRow = React.createClass({
	render: function(){
		return (
			<tr>
				<td className="mybold">{this.props.name}</td>
			</tr>
		);
	}
});

ReactDOM.render(
	<FilterableProductTable />,
	document.getElementById("content")
);