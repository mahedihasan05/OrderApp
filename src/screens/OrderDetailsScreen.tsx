import { View, Text, Button } from "react-native";
import InvoiceCard from "../components/InvoiceCard";
import { formatPrice } from "../utils/formatPrice";

export default function OrderDetailsScreen({ route }: any) {
  const { order } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>INVOICE</Text>

      {order.items.map((item: any, index: number) => (
        <InvoiceCard key={index} item={item} />
      ))}

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
        Grand Total: {formatPrice(order.total)}
      </Text>

      <Button title="Reorder" onPress={() => {}} />
    </View>
  );
}
