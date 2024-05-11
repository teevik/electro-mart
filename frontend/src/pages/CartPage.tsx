import { useEffect } from "react";
import { components } from "../../openapi/openapi";
import { api } from "../api";
import { Button } from "../components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { useCart } from "../state/cart";
import { useLocation } from "wouter";
import { Strong, Text } from "../components/text";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

type Product = components["schemas"]["Product"];

interface OrderItemProps {
  product: Product;
  quantity: number;
  onRemove: () => void;
}

function CartItem(props: OrderItemProps) {
  const { product, quantity, onRemove } = props;

  return (
    <TableRow>
      <TableCell className="flex justify-between items-center">
        <p className="">{product.name}</p>
        <img
          src={product.image_url}
          alt=""
          className="object-contain w-16 h-16"
        />
      </TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        <Button plain onClick={onRemove}>
          <XMarkIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function CartPage() {
  const cart = useCart();

  const { items } = cart;

  const productsQuery = api.products.productById.useSuspenseQueries({
    queries: items.map((item) => ({
      parameters: {
        path: {
          id: item.product_id,
        },
      },
    })),
  });

  const productCart = productsQuery.map((query, i) => ({
    product: query.data,
    quantity: items[i].quantity,
  }));

  const subtotal = productCart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const orderMutation = api.orders.createOrder.useMutation();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (orderMutation.isSuccess) {
      cart.clearCart();

      const orderId = orderMutation.data;
      setLocation(`/orders/${orderId}`);
    }
  }, [orderMutation.isSuccess]);

  function onOrder() {
    orderMutation.mutate({
      body: {
        items,
      },
    });
  }

  if (items.length === 0) {
    return (
      <div className="text-center mt-32">
        <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          No items in cart
        </h3>
      </div>
    );
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Product</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {productCart.map((cartItem) => (
            <CartItem
              key={cartItem.product.id}
              onRemove={() => cart.removeFromCart(cartItem.product.id)}
              {...cartItem}
            />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center mt-6 gap-4">
        <Text>
          Subtotal: <Strong>${subtotal.toFixed(2)}</Strong>
        </Text>
        <Button onClick={onOrder}>Order</Button>
      </div>
    </>
  );
}
