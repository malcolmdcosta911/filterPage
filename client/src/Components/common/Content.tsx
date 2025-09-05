import "./Content.css";
import type { Product } from "../../models/Product";
import { useNavigate } from "react-router-dom";

const Content = ({ product }: { product: Partial<Product> }) => {
  const navigate = useNavigate();
  const { _id, price, brand, name, images } = product;
  return (
    <div className={"content__card"} onClick={() => navigate("/" + _id)}>
      <div className="card__body">
        {images && images.length ? (
          <img src={images[0].source} alt={"image-of-product-" + name} />
        ) : (
          "No Image"
        )}{" "}
      </div>
      <div className="card__footer">
        <div className="product-name">{brand}</div>
        <div className="product-brand">{name}</div>
        <div className="product-price">{Number(price).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Content;
