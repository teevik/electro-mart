import { PlusIcon } from "@heroicons/react/20/solid";
import { api } from "../api";
import { Button } from "../components/button";
import { Link } from "../components/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export function OrdersPage() {
  const query = api.orders.allOrders.useSuspenseQuery(undefined);
  const orders = query.data;

  if (orders.length === 0) {
    return (
      <div className="text-center mt-32">
        <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          No orders found
        </h3>
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Id</TableHeader>
          <TableHeader>Order date</TableHeader>
          <TableHeader>Total price</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <Button plain href={`/orders/${order.id}`} className="size-10">
                {order.id}
              </Button>
            </TableCell>

            <TableCell>
              {new Date(order.order_date).toLocaleDateString()}
            </TableCell>
            <TableCell>{order.total_price}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
