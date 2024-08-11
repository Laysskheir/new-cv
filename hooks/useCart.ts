import { useAtom } from "jotai";
import { cartAtom, CartItem } from "@/atoms/cartAtoms";

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.variantId === product.variantId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.variantId === product.variantId
            ? { ...item, quantity: item.quantity! + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== productId || item.variantId !== variantId
      )
    );
  };

  const updateCart = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.variantId === variantId
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity! > 0)
    );
  };

  const getCart = () => {
    return cart;
  };

  return { cart, addToCart, removeFromCart, updateCart, getCart };
};
