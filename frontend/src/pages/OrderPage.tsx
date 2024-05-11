import { api } from "../api";
import { Spinner } from "../components/Spinner";
import { Text, TextLink } from "../components/text";
import { Page } from "../Page";
import { Table, TableBody, TableCell, TableRow } from "../components/table";
import { components } from "../../openapi/openapi";
import { Button } from "../components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "../components/dialog";
import { useEffect, useState } from "react";
import { Field, FieldGroup, Label } from "../components/fieldset";
import { Input } from "../components/input";

type OrderItem = components["schemas"]["OrderItem"];
type PaymentBody = components["schemas"]["PaymentBody"];

interface ProductListItemProps {
  item: OrderItem;
}

function ProductListItem(props: ProductListItemProps) {
  const { item } = props;

  const query = api.products.productById.useQuery({
    path: { id: item.product_id },
  });

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Text>Error loading product</Text>;
  }

  const product = query.data!;

  return (
    <li>
      {product.name} ({item.quantity})
    </li>
  );
}

interface OrderPageProps {
  id: string;
}

export function OrderPage(props: OrderPageProps) {
  const { id } = props;
  const numericId = parseInt(id);

  const [payDialogOpen, setPayDialogOpen] = useState(false);

  const query = api.orders.getOrder.useQuery({ path: { id: numericId } });

  const payMutation = api.orders.payOrder.useMutation();

  // On success
  useEffect(() => {
    if (payMutation.isSuccess) {
      query.refetch();
      setPayDialogOpen(false);
    }
  }, [payMutation.isSuccess]);

  function onSubmitPayForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const requestBody = Object.fromEntries(formData) as PaymentBody;

    payMutation.mutate({ path: { id: numericId }, body: requestBody });
  }

  const isLoading = payMutation.isPending;

  if (query.isError) {
    return (
      <Page title="Order not found">
        <Text>
          Order with id {id} not found.
          <br />
          <TextLink href="/">Go back home.</TextLink>
        </Text>
      </Page>
    );
  }

  if (query.isLoading) {
    return (
      <Page title="Loading order">
        <Spinner />
      </Page>
    );
  }

  const order = query.data!;
  const isPaid = order.payment != null;

  return (
    <Page title="Order">
      <Table className="max-w-lg">
        <TableBody>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>{order.id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell>
              <ul>
                {order.items.map((item) => (
                  <ProductListItem key={item.product_id} item={item} />
                ))}
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Order date</TableCell>
            <TableCell>
              {new Date(order.order_date).toLocaleDateString()}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total price</TableCell>
            <TableCell>{order.total_price}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>

          {isPaid && (
            <>
              <TableRow>
                <TableCell>Payment method</TableCell>
                <TableCell>{order.payment!.payment_method}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Payment date</TableCell>
                <TableCell>
                  {new Date(order.payment!.payment_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>

      {!isPaid && (
        <div className="mt-8">
          <Dialog open={payDialogOpen} onClose={setPayDialogOpen}>
            <DialogTitle>Pay order</DialogTitle>

            <form onSubmit={onSubmitPayForm}>
              <DialogBody>
                <FieldGroup>
                  <Field disabled={isLoading}>
                    <Label>Payment Method</Label>
                    <Input
                      name="payment_method"
                      required
                      placeholder="PayPal"
                    />
                  </Field>
                </FieldGroup>

                <Text className="mt-4">
                  This is just a demo, with no real payments.
                  <br />
                  In a real-world application, you would integrate with a
                  payment provider.
                </Text>
              </DialogBody>

              <DialogActions className="justify-between">
                <Button type="submit" disabled={isLoading}>
                  Pay
                  {isLoading && <Spinner />}
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          <Button onClick={() => setPayDialogOpen(true)}>Pay order</Button>
        </div>
      )}
    </Page>
  );
}
