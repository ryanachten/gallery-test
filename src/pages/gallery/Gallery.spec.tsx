import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { Gallery } from "./Gallery";
import { Product, Size } from "../../constants/interfaces";

describe("Page: Gallery", () => {
  const initProps = {
    getProducts: jest.fn(),
    products: []
  };

  const productTemplate: Product = {
    index: 0,
    isSale: true,
    isExclusive: false,
    price: "$18.88",
    productImage: "product-1.jpg",
    productName: "Striped shirt",
    size: [Size.XS, Size.S, Size.L, Size.XL]
  };

  it("renders correctly", () => {
    const tree = renderer.create(<Gallery {...initProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call getProducts on mount", () => {
    const products = [{ ...productTemplate }];
    const getProducts = jest.fn().mockImplementation(() => products);
    shallow(<Gallery {...initProps} getProducts={getProducts} />);
    expect(getProducts).toHaveBeenCalled();
  });

  it("should set filtered products on filter change", () => {
    const smallProduct = { ...productTemplate, size: [Size.S] };
    const largeProduct = { ...productTemplate, size: [Size.L] };
    const products = [smallProduct, largeProduct];
    const wrapper = shallow(<Gallery {...initProps} products={products} />);
    const instance: any = wrapper.instance();

    // Scenario 1: should filter only small products
    instance.onFilterChange({
      target: {
        value: Size.S
      }
    });
    expect(instance.state.filteredProducts).toEqual([smallProduct]);

    // Scenario 2: should filter only large products
    instance.onFilterChange({
      target: {
        value: Size.L
      }
    });
    expect(instance.state.filteredProducts).toEqual([largeProduct]);

    // Scenario 3: should clear filter to view to all products
    instance.onFilterChange({
      target: {
        value: Size.ALL
      }
    });
    expect(instance.state.filteredProducts).toEqual(products);
  });
});
