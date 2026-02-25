import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const API_URL = "http://10.148.4.161:1337/api";
  // const API_URL = "http://192.168.0.105:1337/api";
  const QUANTITY_OPTIONS = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 25, 50, 100, 200, 500,
  ];

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

  const categories = [
    "ALL",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];

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
    const payload = items
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        itemname: item.name,
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
    router.push({
      pathname: "/displayList",
      params: { payload: JSON.stringify(payload) },
    });
  };

  /* ---------- RENDER ITEM ---------- */
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      {/* ROW 1 */}
      <View style={styles.firstRow}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.secondaryMeta}>
          {item.category} • {item.subtype}
        </Text>
      </View>

      {/* ROW 2 */}
      <View style={styles.secondRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={item.quantity ?? 1}
            onValueChange={(value) => updateQuantity(item.id, value)}
            style={styles.picker}
            mode="dropdown" // ✅ IMPORTANT (Android)
          >
            {QUANTITY_OPTIONS.map((q) => (
              <Picker.Item key={q} label={`${q}`} value={q} color="#0F172A" />
            ))}
          </Picker>
        </View>

        <View style={styles.unitContainer}>
          <Text style={styles.unitText}>{item.unit}</Text>
        </View>

        {/* Spacer pushes actions to the right */}
        <View style={{ flex: 1 }} />

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionBtnAdd}>
            <Text style={styles.actionIcon}>＋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnDelete}>
            <Text style={styles.actionIcon}>🗑</Text>
          </TouchableOpacity>
        </View>
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
  const filteredItems =
    selectedCategory === "ALL"
      ? items
      : items.filter((item) => item.category === selectedCategory);
  /* ---------- UI ---------- */
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              🛒 Grocery
            </Text>

            <View
              style={{
                backgroundColor: "#c5dedc",
                borderRadius: 8,
                borderWidth: 1,
              }}
            >
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
                mode="dropdown"
              >
                {categories.map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>
          </View>

          <FlatList
            data={filteredItems}
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
    backgroundColor: "#E7DEAF",
    padding: 8,
  },
  createBtn: {
    backgroundColor: "#640D5F",
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 8,
    backgroundColor: "#D6EFED",
    padding: 12,
    borderEndColor: "#061a12",
    borderWidth: 1,
    borderRadius: 10,
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#476EAE",
    padding: 14,
    borderRadius: 14,
    marginBottom: 6,
    width: "100%",
    elevation: 2,
  },

  /* ================= ROW 1 ================= */
  firstRow: {
    backgroundColor: "#48B3AF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    width: "100%",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
  },

  secondaryMeta: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0D1164",
    marginLeft: 8,
  },

  /* ================= ROW 2 ================= */
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 6,
  },

  pickerContainer: {
    width: 100, // slightly wider
    height: 52, // ⬅️ KEY: more vertical room
    backgroundColor: "#F6FF99",
    borderRadius: 10,
    justifyContent: "center",
  },

  picker: {
    width: "100%",
    height: 52,
    paddingVertical: 6, // ⬅️ KEY: prevents text clipping
    color: "#0F172A",
  },

  pickerItem: {
    fontSize: 16,
    height: 48,
    textAlign: "center",
    color: "#0F172A",
  },

  /* ===== Unit ===== */
  unitContainer: {
    width: 70,
    height: 48,
    marginLeft: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#A7E399",
    alignItems: "center",
    justifyContent: "center",
  },

  unitText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4d78b4",
  },

  /* ===== Spacer ===== */
  spacer: {
    flex: 1,
  },

  /* ===== Actions ===== */
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  actionBtnAdd: {
    backgroundColor: "#E0F2FE",
    padding: 8,
    borderRadius: 10,
  },

  actionBtnDelete: {
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 10,
  },

  actionIcon: {
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
