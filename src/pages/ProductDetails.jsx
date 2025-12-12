import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatBRL } from "../utils/formatPrice";
import ProductsList from "../components/ProductsList";
import { addToCart, increaseQuantity, decreaseQuantity } from "../utils/helpers";
import Cart from "../components/Cart";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductDetails(props) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // console.log(product.rating.rate)

  return (
    <>
      <Cart
        cart={cart}
        increaseQuantity={(id) => increaseQuantity(id, setCart)}
        decreaseQuantity={(id) => decreaseQuantity(id, setCart, setIsCartOpen)}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
      />
      <div>
        <h3>{product.title}</h3>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "200px" }}
        />
        <p>Rating: {product.rating?.rate}</p>
        <p>{product.price && formatBRL(product.price)}</p>
        <p>{product.description}</p>
        <AddToCartButton
          addToCart={(product) => addToCart(product, setCart)}
          product={product}
        />
      </div>
    </>
  );
}
