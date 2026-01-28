import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { db, auth } from "../firebase/firebaseConfig";
import { formatPrice } from "../utils/formatPrice";

const CART_ITEMS = [
  { id: "1", name: "Burger", price: 120, qty: 2 },
  { id: "2", name: "Pizza", price: 300, qty: 1 },
];

export default function PlaceOrderScreen() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const total = CART_ITEMS.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const confirmOrder = async () => {
    if (!user) {
      alert("Please wait, logging in...");
      return;
    }

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      items: CART_ITEMS,
      total,
      createdAt: Timestamp.now(),
    });

    navigation.navigate("OrderHistory");
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart Items</Text>

      <FlatList
        data={CART_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.name} x{item.qty} ={" "}
            {formatPrice(item.price * item.qty)}
          </Text>
        )}
      />

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
        Total: {formatPrice(total)}
      </Text>

      <Button title="CONFIRM ORDER" onPress={confirmOrder} />
    </View>
  );
}
