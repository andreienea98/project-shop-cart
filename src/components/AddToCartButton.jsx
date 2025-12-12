export default function AddToCartButton({ addToCart, product }) {
  return (
    <button onClick={() => addToCart(product)}>
      Add to cart
    </button>
  );
}
