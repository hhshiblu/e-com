import React, { useEffect, useState } from "react";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import styles from "../styles/style";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backend_URL, server } from "../serverUrl";

import { toast } from "react-toastify";
import { removeFromCart, updateQuantity } from "../Redux/Action/cart";

function ProductCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize to 0
  const [fetchedProductsData, setFetchedProductsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { allProducts, isloading } = useSelector((state) => state.products);

  // useEffect(() => {
  //   const fetchProduct = async (productId, quantity, color, size) => {
  //     try {
  //       const { data } = await axios.get(
  //         `${server}/products/get-product/${productId}`
  //       );
  //       return {
  //         product: data.product,
  //         quantity: quantity,
  //         color: color,
  //         size: size,
  //       };
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //       return null;
  //     }
  //   };

  //   const fetchProductsForCart = async () => {
  //     const fetchedProducts = [];
  //     let newTotalPrice = 0;

  //     for (const item of cart) {
  //       const productData = await fetchProduct(
  //         item.productId,
  //         item.quantity,
  //         item.color, // Assuming each cart item has a "color" property
  //         item.size // Assuming each cart item has a "size" property
  //       );
  //       if (productData) {
  //         fetchedProducts.push(productData);
  //         newTotalPrice +=
  //           productData.product.discountPrice * productData.quantity;
  //       }
  //     }

  //     setFetchedProductsData(fetchedProducts);
  //     setTotalPrice(newTotalPrice);
  //     setLoading(false);
  //   };

  //   fetchProductsForCart();
  // }, [cart]);
  useEffect(() => {
    const fetchProductsForCart = () => {
      let newTotalPrice = 0;
      const fetchedProducts = [];

      for (const item of cart) {
        const productFromAllProducts = allProducts?.find(
          (product) => product._id === item.productId
        );

        if (productFromAllProducts) {
          fetchedProducts.push({
            product: productFromAllProducts,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          });
          newTotalPrice += productFromAllProducts.discountPrice * item.quantity;
        }
      }

      setFetchedProductsData(fetchedProducts);
      setTotalPrice(newTotalPrice);
      setLoading(false);
    };

    fetchProductsForCart();
  }, [cart, allProducts]);

  useEffect(() => {
    const newTotalPrice = fetchedProductsData.reduce(
      (total, productData) =>
        total + productData.product.discountPrice * productData.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [fetchedProductsData]);

  const quantityChangeHandler = (data, quantity) => {
    dispatch(updateQuantity(data, quantity));
  };

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const redirect = () => {
    navigate("/checkout_products", {
      state: {
        products: fetchedProductsData,
        price: totalPrice,
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>this is loading...</div>
      ) : (
        <div>
          <Header />
          <div className="h-full md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px) m-auto mb-4] max-w-[1200px]  my-5 mb-8">
            {cart && cart?.length === 0 ? (
              <div className="flex items-center justify-center !h-[60vh] ">
                Cart items are empty!!
              </div>
            ) : (
              <div className="pt-5">
                <div className="flex flex-col gap-8 lg:flex-row">
                  <div className="w-full p-5 bg-white rounded shadow lg:w-8/12">
                    <div>
                      <div className="flex gap-3 p-2 bg-gray-100 rounded">
                        <div className="overflow-hidden border rounded"></div>
                        <p className="font-medium m-auto">All cart products</p>
                      </div>
                      <ul className="flex flex-col gap-6 mt-4">
                        {fetchedProductsData.map((productData, index) => (
                          <CartSingle
                            key={index}
                            data={productData.product}
                            quantity={productData.quantity}
                            quantityChangeHandler={quantityChangeHandler}
                            removeFromCartHandler={removeFromCartHandler}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12">
                    <div className="relative flex flex-col gap-4 p-4 bg-white rounded shadow ">
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
                        <p className="mb-2">Total Price </p>
                      </div>
                      <div className="flex justify-between">
                        <p>total</p>
                        <strong>৳ {totalPrice}</strong>
                      </div>
                      <hr />
                      <button
                        className="btn type-primary size-lg  opacity-50 w-full  bg-[#e44343] border-[#e4434373] py-1 rounded-md text-white font-semibold "
                        disabled=""
                        onClick={redirect}
                      >
                        <span data-content="center">Confirm Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
const CartSingle = ({
  data,
  quantity,
  quantityChangeHandler,
  removeFromCartHandler,
}) => {
  //  const initialQuantity =
  //    parseInt(localStorage.getItem(`quantity_${data._id}`)) || 1;
  //  const [value, setValue] = useState(initialQuantity);
  //  const totalPrice = data.discountPrice * value;

  const [value, setValue] = useState(quantity);
  const totalPrice = data.discountPrice * value;
  useEffect(() => {
    setValue(quantity);
  }, [quantity]);
  const increment = () => {
    if (data.stock < value + 1) {
      toast.error("Product stock limited!");
    } else {
      const updatedQuantity = value + 1;
      setValue(updatedQuantity);
      quantityChangeHandler(data._id, updatedQuantity);
    }
  };
  const decrement = () => {
    if (value > 1) {
      const updatedQuantity = value - 1;
      setValue(updatedQuantity);

      quantityChangeHandler(data._id, updatedQuantity);
    }
  };

  return (
    <li className="flex gap-3">
      <div>
        <div>
          <img
            alt={data.name}
            loading="lazy"
            width="80"
            height="80"
            decoding="async"
            data-nimg="1"
            className="mx-auto text-transparent transition-opacity duration-300 ease-in-out opacity-100 undefined"
            src={`${backend_URL}upload/${data?.images[0]}`}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col justify-between flex-1">
          <p className="text-base line-clamp-1">{data.name}</p>
          <div className="inline-flex">
            <div
              className={`bg-[#e44343] border-[#e4434373] mt-2 rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
              onClick={increment}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="inline-flex justify-center w-8 p-2 px-5">
              {value}
            </span>
            <div
              className="bg-[#a7abb14f] rounded-full w-[25px] mt-2 h-[25px] flex items-center justify-center cursor-pointer"
              onClick={decrement}
            >
              <HiOutlineMinus size={16} color="#7d879d" />
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-end">
          <p className="text-lg">
            ৳ <span> </span>
            {totalPrice}
          </p>
          <button
            className="mt-2 font-medium text-gray-500 underline"
            onClick={() => removeFromCartHandler(data._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCart;
