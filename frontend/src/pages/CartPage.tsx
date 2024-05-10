import { useProductServiceGetProductsById } from "../../openapi/queries";
import { ApiError, OrderItem } from "../../openapi/requests";
import { Spinner } from "../components/Spinner";
import { Table, TableBody, TableCell, TableRow } from "../components/table";
import { useCart } from "../state/cart";

function CartItem(props: OrderItem) {
  const { product_id, quantity } = props;

  const query = useProductServiceGetProductsById({ id: product_id });

  if (query.isLoading) {
    return (
      <TableRow>
        <TableCell>
          <Spinner />
        </TableCell>
      </TableRow>
    );
  }

  if (query.isError) {
    return (
      <TableRow>
        <TableCell>
          Error loading product: {(query.error as ApiError).message}
        </TableCell>
      </TableRow>
    );
  }

  const product = query.data!;
  return (
    <TableRow>
      <TableCell className="flex">
        <img
          src={product.image_url}
          alt=""
          className="object-contain w-16 h-16"
        />
        <p className="my-auto">{product.name}</p>
      </TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{quantity}</TableCell>
    </TableRow>
  );
}

export function CartPage() {
  const cart = useCart();

  const { items } = cart;

  return (
    <>
      <Table>
        <TableBody>
          <TableRow></TableRow>

          {items.map((item) => (
            <CartItem key={item.product_id} {...item} />
          ))}
        </TableBody>
      </Table>
      <p>Subtotal: 10</p>
    </>
  );
}
