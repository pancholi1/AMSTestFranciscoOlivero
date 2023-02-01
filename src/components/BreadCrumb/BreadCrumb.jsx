import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./breadCrumb.module.scss";

const BreadCrumb = () => {
  const location = useLocation();
  const crumbs = location.pathname.split("/").filter((crumb) => crumb);

  return (
    <div className={styles.containerBreadCrumb}>
      {crumbs.length > 0 ? <Link to="/">Home </Link> : <>Home </>}
      {crumbs.map((name, index) => {
        const paths = `/${crumbs.slice(0, index + 1).join("/")}`;
        const isLast = index === crumbs.length - 1;
        return (
          !isLast && (
            <div key={index}>
              {name === "ProductDetailsPage" ? (
                <div> / {name}</div>
              ) : (
                <Link to={`${paths}`}> / {name}</Link>
              )}
            </div>
          )
        );
      })}
    </div>
  );
};

export default BreadCrumb;
