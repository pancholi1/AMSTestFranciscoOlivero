import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { increment } from "../../features/counter/counterSlice";
import { setHours } from "../../features/hours/hoursSlice";
import styles from "./productDetailsPage.module.scss";

const getCurrentDateString = () => {
  let currentDateObj = new Date();
  let numberOfMlSeconds = currentDateObj.getTime();
  let addMlSeconds = 60 * 60000;
  return new Date(numberOfMlSeconds + addMlSeconds).toISOString();
};
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();

  const [inputProduct, setInputProduct] = useState({
    storageCode: "",
    colorCode: "",
    id,
  });

  useEffect(() => {
    (async () => {
      const product = await axios({
        method: "get",
        url: `https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product/${id}`,
      });
      setInputProduct({
        ...inputProduct,
        colorCode: product.data.options.colors[0].code,
        storageCode: product.data.options.storages[0].code,
      });
      setProduct(product.data);
    })();
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    setInputProduct({ ...inputProduct, [name]: event.target.value });
  };
  const handleSubmit = async () => {
    const responseInput = await axios.post(
      "https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/cart",
      inputProduct
    );
    responseInput.data && dispatch(increment());
    dispatch(setHours(getCurrentDateString()));
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerImg}>
        <img src={product.imgUrl} className={styles.imgProduct} alt="" />
      </div>
      <div className={styles.contaienrDetails}>
        <div className={styles.titleDetails}>
          Caracteristicas de {product.brand} {product.model}
        </div>
        <div className={styles.containerListDetails}>
          <div>
            CPU: <strong>{product.cpu}</strong>
          </div>
          <div>
            RAM: <strong>{product.ram}</strong>
          </div>
          <div>
            Sistema operativo: <strong>{product.os}</strong>
          </div>
          <div>
            Resolucion de pantalla: <strong>{product.displayResolution}</strong>
          </div>
          <div>
            Bateria: <strong>{product.battery}</strong>
          </div>
          <div>
            Camaras: <strong>{product.primaryCamera}</strong>
          </div>

          {product.dimentions && (
            <div>
              Dimensiones: <strong>{product.dimentions}</strong>
            </div>
          )}
          {product.weight && (
            <div>
              Peso :<strong>{product.weight}</strong>
            </div>
          )}
        </div>
        <div className={styles.actionsContainer}>
          <div className={styles.containerSelect}>
            <select name="colorCode" onChange={handleChange}>
              {product.options &&
                product.options.colors.map((color, index) => {
                  return (
                    <option value={color.code} key={index}>
                      {color.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={styles.containerSelect}>
            <select
              className={styles.colorselect}
              name="storageCode"
              onChange={handleChange}
            >
              {product.options &&
                product.options.storages.map((memory, index) => {
                  return (
                    <option value={memory.code} key={index}>
                      {memory.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={styles.addButton} onClick={handleSubmit}>
            ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
