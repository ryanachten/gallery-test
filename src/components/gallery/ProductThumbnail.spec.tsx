import React from "react";
import renderer from "react-test-renderer";
import ProductThumbnail from "./ProductThumbnail";
import { Product, Size } from "../../constants/interfaces";

describe("Component: ProductThumbnail", () => {
  const productTemplate: Product = {
    index: 0,
    isSale: true,
    isExclusive: false,
    price: "$18.88",
    productImage: "product-1.jpg",
    productName: "Striped shirt",
    size: [Size.XS, Size.S, Size.L, Size.XL]
  };

  const initProps = {
    getProducts: jest.fn(),
    product: productTemplate
  };

  it("renders correctly", () => {
    const tree = renderer.create(<ProductThumbnail {...initProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
