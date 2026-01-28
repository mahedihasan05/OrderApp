import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { signInAnonymously } from "firebase/auth";
import { auth } from "./src/firebase/firebaseConfig";

import PlaceOrderScreen from "./src/screens/PlaceOrderScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";
import OrderDetailsScreen from "./src/screens/OrderDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    if (!auth.currentUser) {
      signInAnonymously(auth)
        .then(() => console.log("Logged in anonymously"))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlaceOrder">
        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrderScreen}
          options={{ title: "Place Order" }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{ title: "Order History" }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{ title: "Order Invoice" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
