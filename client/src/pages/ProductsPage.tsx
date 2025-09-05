import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Searchbar from "../Components/Searchbar";
import Pricing from "../Components/Pricing";
import Content from "../Components/common/Content";
import {
  getProducts,
  loadProducts,
  type InitialStateType,
} from "../store/products";
import InfiniteScroll from "react-infinite-scroll-component";
import "./ProductsPage.css";

const ProductsPage = () => {
  const {
    // list: products,
    // loading,
    error,
    totalProducts,
    // perPage,
  }: InitialStateType = useAppSelector((state) => state.products);

  const products = useAppSelector(getProducts);

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  //first load, filter change
  useEffect(() => {
    dispatch(loadProducts({ newRequest: true }));
  }, [dispatch, searchParams]);

  const handleLoadMoreData = () => {
    dispatch(loadProducts({ newRequest: false }));
  };

  return (
    <div className="conatiner">
      {/* searchbar card */}
      <Searchbar />

      {/* pricing card */}
      <Pricing />

      {/* contents grid */}
      {error ? (
        <div className="no-products-found">{error || "Error occurred"}</div>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={handleLoadMoreData}
          hasMore={totalProducts > products.length}
          loader={
            <p>Loading...</p>
            // <div
            //   style={{
            //     display: "flex",
            //     flexWrap: "wrap",
            //   }}
            // >
            //   {[...Array(perPage)].map((_, idx) => (
            //     <div
            //       key={idx}
            //       style={{
            //         minHeight: 400,
            //         background: "white",
            //         marginRight: 26,
            //         minWidth: 300,
            //         textAlign: "center",
            //         padding: 20,
            //       }}
            //     >
            //       Loading...{" "}
            //     </div>
            //   ))}
            // </div>
          }
          endMessage={<p>No more products to load.</p>}
        >
          <div className="contents">
            {products.map((prod, idx) => (
              <Content
                key={idx}
                // {...prod}
                product={prod}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProductsPage;
