import { View, Text } from "react-native";
import { formatPrice } from "../utils/formatPrice";

type Props = {
  item: {
    name: string;
    price: number;
    qty: number;
  };
};

export default function InvoiceCard({ item }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
      }}
    >
      <Text>
        {item.name} x{item.qty}
      </Text>
      <Text>{formatPrice(item.price * item.qty)}</Text>
    </View>
  );
}
