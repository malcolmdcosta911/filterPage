import { useParams } from "react-router-dom";
import { fetchProduct, getProduct } from "../store/products";
import { useEffect } from "react";
import "./ProductPage.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const ProductPage = () => {
  const { id: productId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      // throw new Error("yeah");
      dispatch(fetchProduct(productId));
    }
  }, [productId, dispatch]);

  const product = useAppSelector((state) => getProduct(state, productId));

  const { loading } = useAppSelector((state) => state.products);

  if (!product) return <div>No product Found</div>;

  if (loading) return <div>loading...</div>;

  return (
    <div className="conatiner">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <div className="product">
        <div className="product__image">
          {product?.images.length ? (
            <img
              src={product.images[0].source}
              alt={"image-of-product-" + name}
            />
          ) : (
            "No Image"
          )}
        </div>

        <div>
          <div className="product__name">{product?.name}</div>
          <div className="product__desc">
            {product?.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Obcaecati officiis necessitatibus nihil
            praesentium dolore itaque accusamus dolorem earum, esse provident,
            illum incidunt temporibus velit doloremque, repudiandae eligendi
            laudantium ut hic? Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Cumque accusantium odit natus aliquid ipsa saepe
            minima architecto obcaecati commodi ea dolorem voluptatem harum
            doloremque, nostrum cupiditate quia voluptatibus? Sunt reprehenderit
            reiciendis rerum sed illo laudantium ipsa impedit totam expedita
            quos?
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </div>
  );
};

export default ProductPage;
