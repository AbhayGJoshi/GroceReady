import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Grocery App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/addItem")}
      >
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/list")}
      >
        <Text style={styles.buttonText}>Make a List</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    width: "80%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
