import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cardList.module.scss";

const CardList = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.containerCardList}
      onClick={() => {
        return navigate(`/ProductDetailsPage/${product.id}`);
      }}
    >
      <img src={product.imgUrl} alt="" />
      <div className={styles.containerDetails}>
        <div className={styles.titleModel}>{product.model}</div>
        <div className={styles.subtitleBrandPrice}>
          <div>{product.brand}</div>
          {product.price && (
            <div className={styles.priceHoverContainer}>
              <div className={styles.priceHover}>{product.price} €</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardList;
