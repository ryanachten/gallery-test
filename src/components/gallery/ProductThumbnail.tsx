import React from "react";
import { Product } from "../../constants/interfaces";
import "./ProductThumbnail.css";

type Props = {
  product: Product;
};

const ProductThumbnail = (props: Props) => {
  const {
    index,
    isExclusive,
    isSale,
    price,
    productImage,
    productName
  } = props.product;
  return (
    <article className="ProductThumbnail" key={index}>
      <img
        className="ProductThumbnail--img"
        src={`products/${productImage}`}
        alt={productName}
      />
      {isSale && <span className="ProductThumbnail--flag-sale">Sale</span>}
      {isExclusive && (
        <span className="ProductThumbnail--flag-exclusive">Exclusive</span>
      )}
      <section className="ProductThumbnail--meta">
        <p className="ProductThumbnail--name">{productName}</p>
        <p className="ProductThumbnail--price">{price}</p>
      </section>
    </article>
  );
};

export default ProductThumbnail;
