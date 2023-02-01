import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { ProductDetailsPage, ProductListPage } from "../pages";
const AmsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/ProductDetailsPage/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
};

export default AmsRoutes;
