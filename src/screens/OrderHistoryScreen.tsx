import { View, Text, FlatList } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { formatPrice } from "../utils/formatPrice";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>Order ID: {item.id}</Text>
          <Text>Total: {formatPrice(item.total)}</Text>
        </View>
      )}
    />
  );
}
