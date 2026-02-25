import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type FinalItem = {
  itemname: string;
  quantity: number;
  unit: string;
};

export default function FinalListScreen() {
  const { payload } = useLocalSearchParams();
  const list: FinalItem[] = payload ? JSON.parse(payload as string) : [];
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="shopping-cart" size={28} />
          <Text style={styles.header}>Final Grocery List</Text>
        </View>

        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <FlatList
        data={list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            {index + 1}. {item.itemname} – {item.quantity} {item.unit}
          </Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items found</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e2e8f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerRow: {
    backgroundColor: "#abcdef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // ⬅️ pushes date to bottom
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#334155",
  },

  item: {
    fontSize: 16,
    paddingVertical: 6,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
});
