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
        className="ProductThumbnail__img"
        src={`products/${productImage}`}
        alt={productName}
      />
      {isSale && <span className="ProductThumbnail__flag--sale">Sale</span>}
      {isExclusive && (
        <span className="ProductThumbnail__flag--exclusive">Exclusive</span>
      )}
      <section className="ProductThumbnail__meta">
        <p className="ProductThumbnail__name">{productName}</p>
        <p className="ProductThumbnail__price">{price}</p>
      </section>
    </article>
  );
};

export default ProductThumbnail;
