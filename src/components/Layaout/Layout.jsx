import React from "react";
import logo from "../../logo.svg";
import { useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumb } from "../BreadCrumb";
import { clearHours } from "../../features/hours/hoursSlice";

const Layout = ({ children }) => {
  const count = useSelector((state) => state.counter.value);
  const hours = useSelector((state) => state.hours.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const functionTemporizator = () => {
    setTimeout(funcionWithDelay, 60000);
  };

  const funcionWithDelay = () => {
    if (hours) {
      if (Date.parse(hours) < Date.parse(new Date().toISOString())) {
        dispatch(clearHours());
      }
    }
  };

  functionTemporizator();
  return (
    <div className={styles.containerlayout}>
      <div className={styles.header}>
        <div
          className={styles.contaienrLogo}
          onClick={() => {
            return navigate(`/`);
          }}
        >
          <img src={logo} className={styles.logoHeader} alt="" />
          <div className={styles.titleHeader}>AMS </div>
        </div>
        <div>
          <BreadCrumb></BreadCrumb>
        </div>
        <div className={styles.cart}> Cart ( {count} )</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
