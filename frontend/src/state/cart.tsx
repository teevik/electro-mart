import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, useContext } from "react";
import { OrderItem } from "../../openapi/requests";

const CART_KEY = "cart";

interface Cart {
  items: OrderItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<Cart | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const cart = useCartProvider();

  return <CartContext.Provider value={cart}>{children} </CartContext.Provider>;
}

function useCartProvider(): Cart {
  const [items, setItems] = useLocalStorage<OrderItem[]>(CART_KEY, []);

  function addToCart(productId: number) {
    setItems((prevCart) => {
      const existingEntry = prevCart.find(
        (item) => item.product_id === productId
      );

      if (existingEntry !== undefined) {
        return prevCart.map((item) => {
          if (item.product_id === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        });
      }

      return [...prevCart, { product_id: productId, quantity: 1 }];
    });
  }

  function removeFromCart(productId: number) {
    setItems((prevCart) => {
      return prevCart.filter((item) => item.product_id !== productId);
    });
  }

  function updateQuantity(productId: number, quantity: number) {
    setItems((prevCart) => {
      return prevCart.map((item) => {
        if (item.product_id === productId) {
          return { ...item, quantity };
        }

        return item;
      });
    });
  }

  return { items, addToCart, removeFromCart, updateQuantity };
}

export function useCart(): Cart {
  const cart = useContext(CartContext);

  if (cart === null) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return cart;
}
