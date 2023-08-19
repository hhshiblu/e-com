import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../styles/style";
import ProductCart from "../ProductCart/ProductCart";
import { server } from "../../../serverUrl";
import InfiniteScroll from "react-infinite-scroll-component";

function FeaturedProduct() {
  // Usage in the component
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const { data } = await axios.get(
          `${server}/products/query-products?pageNumber=${page}`
        );
setLoading(true)
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCardData();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h2>For you !</h2>
        </div>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true} // You can implement your own condition to stop loading more
          loader={<p>Loading...</p>}
        >
          <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-5 lg:gap-[15px] xl:grid-cols-6 xl:gap-[15px]">
            {products.map((product, index) => (
              <ProductCart data={product} key={index} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default FeaturedProduct;
