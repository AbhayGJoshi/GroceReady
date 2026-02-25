import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------- TYPES ---------------- */

type Item = {
  id: string;
  name: string;
  unit: string;
  quantity: number; // per-item quantity
  category: string;
  subtype: string;
};

/* ---------------- CONFIG ---------------- */

/* ---------------- COMPONENT ---------------- */

export default function List() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://10.148.4.161:1337/api";
  // const API_URL = "http://192.168.0.105:1337/api";
  const QUANTITY_OPTIONS = [1, 2, 5, 10, 15, 25, 50, 100];

  /* ---------- FETCH ITEMS ---------- */
  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch items");

      const data: Item[] = await res.json();

      // Ensure each item has its own quantity
      const normalized = data.map((item) => ({
        ...item,
        quantity: item.quantity ?? 0,
      }));

      setItems(normalized);
    } catch (error) {
      Alert.alert("Error", "Unable to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "IDS FROM API 👉",
  //     items.map((i) => i.id),
  //   );
  // }, [items]);
  /* ---------- UPDATE QUANTITY (PER ITEM) ---------- */
  // const updateQuantity = (id: string, text: string) => {
  //   const numeric = text.replace(/[^0-9]/g, "");
  //   const value = numeric === "" ? 0 : Number(numeric);

  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: value } : item,
  //     ),
  //   );
  // };

  const updateQuantity = (id: string, value: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: value } : item,
      ),
    );
  };

  /* ---------- DELETE ITEM ---------- */
  const deleteItem = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      Alert.alert("Error", "Failed to delete item");
    }
  };

  /* ---------- SAVE LIST ---------- */
  const createList = async () => {
    const payload = items.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      unit: item.unit,
    }));

    console.log("FINAL PAYLOAD 👉", payload);

    // Example API call (adjust endpoint)
    /*
    await fetch(`${API_URL}/save-list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    */

    Alert.alert("Success", "List created successfully");
  };

  /* ---------- RENDER ITEM ---------- */
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      {/* ICON */}
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons
          name="shopping-outline"
          size={28}
          color="#4CAF50"
        />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* name */}
        <Text style={styles.name}>{item.name}</Text>
        {/* updateQuantity */}
        <View style={styles.qtyRow}>
          {/* Quantity Dropdown */}
          <Picker
            selectedValue={item.quantity ?? 1}
            style={styles.picker}
            onValueChange={(value) => updateQuantity(item.id, value)}
          >
            {QUANTITY_OPTIONS.map((q) => (
              <Picker.Item
                key={`${item.id}-${q}`}
                label={String(q)}
                value={q}
              />
            ))}
          </Picker>

          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>{item.unit}</Text>
          </View>
        </View>
        <Text style={styles.secondaryMeta}>
          {item.category} • {item.subtype}
        </Text>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  /* ---------- LOADER ---------- */
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  /* ---------- UI ---------- */
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>🛒 Grocery List</Text>

          <FlatList
            data={items}
            keyExtractor={(item, index) =>
              item?.id ? String(item.id) : `item-${index}`
            }
            renderItem={renderItem}
            extraData={items}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.emptyText}>No items found</Text>
            }
          />

          {/* CREATE LIST BUTTON */}
          <TouchableOpacity style={styles.createBtn} onPress={createList}>
            <Text style={styles.createBtnText}>Create List</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 16,
  },
  picker: {
    flex: 0.8,
    height: 80,
    // backgroundColor: "#aaa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#333",
    borderRadius: 10,
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    textAlign: "center",
    marginRight: 8,
  },
  unitContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  unitText: {
    fontWeight: "800",
  },
  secondaryMeta: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  actions: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  cartBtn: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  deleteBtn: {
    backgroundColor: "#E53935",
    padding: 8,
    borderRadius: 8,
  },
  createBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
});
