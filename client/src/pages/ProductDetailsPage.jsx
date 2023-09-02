import React, { useEffect } from "react";
import ProductDetails from "../component/ProductDetails/ProductDetails.jsx";
// import {productData} from "../staticData/data.js"
import Footer from "../component/Layout/Footer.jsx";
import {  useParams } from "react-router-dom";
import SuggestProduct from "../component/SuggestProduct.jsx";
// import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Layout/Header.jsx";

import ShopProduct from "../component/Route/ProductCart/ShopProduct.jsx";
import { get_product } from "../Redux/Action/filterproduct.js";
import ProductDetailLoader from "./../component/Loader/ProductDetailLoader";
function ProductDetailsPage() {
  const dispatch = useDispatch();

  const { product, relatedProducts, moreProducts, isloading } = useSelector(
    (state) => state.filterProduct
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(get_product(id));
  }, [id, dispatch]);

  return (
    <div>
      {isloading ? (
        <div>
          <ProductDetailLoader />
        </div>
      ) : (
        <div>
          <Header />
          {product && (
            <ProductDetails
              data={product}
              products={moreProducts}
              loading={isloading}
            />
          )}
            <ShopProduct products={moreProducts} />
            <br /> <br />
          {relatedProducts && <SuggestProduct data={relatedProducts} />}
          <div></div>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
