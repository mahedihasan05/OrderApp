import { View, Text, TouchableOpacity } from "react-native";
import { formatPrice } from "../utils/formatPrice";

type Props = {
  order: {
    id: string;
    total: number;
    createdAt: any;
  };
  onPress: () => void;
};

export default function OrderItem({ order, onPress }: Props) {
  const date = order.createdAt?.toDate
    ? order.createdAt.toDate().toDateString()
    : "Unknown date";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderRadius: 6,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>Order ID</Text>
      <Text>{order.id}</Text>

      <Text>Date: {date}</Text>
      <Text>Total: {formatPrice(order.total)}</Text>
    </TouchableOpacity>
  );
}
