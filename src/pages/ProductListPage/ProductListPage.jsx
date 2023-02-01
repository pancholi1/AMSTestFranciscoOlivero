import React, { useEffect, useState } from "react";
import styles from "./productListPage.module.scss";
import search from "../../assets/icons/searchIcon2.svg";
import CardList from "../../components/CardList/CardList";
import axios from "axios";

const ProductListPage = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    (async () => {
      const respList = await axios({
        method: "get",
        url: "https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product",
      });
      setData(respList.data);
    })();
  }, []);
  const handleChange = (event) => {
    setInputValue(event.currentTarget.value);
    const filteredData = data.filter(
      (item) =>
        item.model
          .toLowerCase()
          .includes(event.currentTarget.value.toLowerCase()) ||
        item.brand
          .toLowerCase()
          .includes(event.currentTarget.value.toLowerCase())
    );
    setData(filteredData ?? []);
  };

  return (
    <>
      <div className={styles.headerContent}>
        <div className={styles.textContent}>Celulares</div>

        <div className={styles.containerSearch}>
          <img src={search} alt="" />
          <input
            type="text"
            placeholder="Buscar"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.mosaico}>
        {data &&
          data.map((product) => {
            return <CardList product={product} key={product.id}></CardList>;
          })}
      </div>
    </>
  );
};

export default ProductListPage;
