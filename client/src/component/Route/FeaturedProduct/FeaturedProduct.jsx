import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../styles/style";
import ProductCart from "../ProductCart/ProductCart";
import { server } from "../../../serverUrl";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadProductLoader from "../../Loader/LoadProductLoader";

function FeaturedProduct() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more products to load

  useEffect(() => {
    const getCardData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${server}/products/query-products?pageNumber=${page}`
        );

        if (data.products.length === 0) {
          setHasMore(false); // No more products to load
        }

        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Make sure to set loading to false on error as well
      }
    };

    getCardData();
  }, [page]);

  const fetchMoreData = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  console.log();

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h2>For you !</h2>
        </div>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore} // Pass the hasMore state here
        >
          <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-6 xl:gap-[10px]">
            {products.map((product, index) => (
              <ProductCart data={product} key={index} />
            ))}
          </div>
        </InfiniteScroll>
        <div className="flex  items-center justify-center pt-10">
          {isLoading && <LoadProductLoader />} {/* Show loader when loading */}
          {!isLoading && !hasMore && <p>No more products to show.</p>}{" "}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
