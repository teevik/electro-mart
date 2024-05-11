import { Badge, BadgeColor } from "./badge";

interface OrderStatusProps {
  status: "Pending" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
}

export function OrderStatus(props: OrderStatusProps) {
  const { status } = props;

  let color: BadgeColor;

  switch (status) {
    case "Pending":
      color = "zinc";
      break;
    case "Paid":
      color = "blue";
      break;
    case "Shipped":
      color = "yellow";
      break;
    case "Delivered":
      color = "green";
      break;
    case "Cancelled":
      color = "red";
      break;
  }

  return <Badge color={color}>{status}</Badge>;
}
