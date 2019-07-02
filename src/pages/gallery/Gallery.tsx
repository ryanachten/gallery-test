import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "../../components/gallery/ProductThumbnail";
import { Product, Size } from "../../constants/interfaces";
import { productActions } from "../../reducers/product";
import "./Gallery.css";

type Props = {
  getProducts: () => Promise<void>;
  products: Product[];
};

type State = {
  filteredProducts: Product[];
  selectedSize: Size;
};

export class Gallery extends Component<Props, State> {
  sizes: Size[];
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredProducts: [],
      selectedSize: Size.ALL
    };
    this.getProducts = this.getProducts.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.sizes = [Size.XS, Size.S, Size.M, Size.L, Size.XL];
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    await this.props.getProducts();
    this.setState({
      filteredProducts: this.props.products
    });
  }

  onFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    const value: any = e.target.value;
    const products = this.props.products;
    // If the filter is not set, we reset the filtered products
    // Otherwise, we filter the products by whether or not they
    // have the have the selected size available
    const filteredProducts: Product[] =
      value === Size.ALL
        ? products
        : products.filter((product: Product) => product.size.includes(value));

    this.setState({
      filteredProducts,
      selectedSize: value
    });
  }

  render() {
    const { filteredProducts, selectedSize } = this.state;
    return (
      <div className="Gallery">
        <header className="Gallery__header">
          <h1 className="Gallery__title">Women's tops</h1>
          <select
            aria-label="filter"
            className="Gallery__filter"
            onChange={this.onFilterChange}
            value={selectedSize}
          >
            <option value={Size.ALL}>
              {selectedSize === Size.ALL ? "Filter by size" : "Clear filter"}
            </option>
            {this.sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </header>
        <main className="Gallery__grid">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product: Product) => (
              <ProductThumbnail key={product.index} product={product} />
            ))}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ product }: any) => ({
  products: product.products
});

const mapDispatchToProps = {
  getProducts: productActions.getProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
