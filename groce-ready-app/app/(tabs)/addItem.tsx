import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function AddItem() {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Unique item code
  const id = `ITM-${Date.now()}`;

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // ✅ safest cross-version fix
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const API_URL = "http://10.148.4.161:1337/api";
  const handleSubmit = async () => {
    if (!category || !name || !unit) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const payload = {
      id,
      category,
      subtype,
      name,
      unit,
      imageUrl,
    };

    console.log("ITEM SAVED:", payload);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("STATUS:", response.status);

      if (!response.ok) {
        const errText = await response.text();
        console.log("SERVER ERROR:", errText);
        throw new Error("Try -Failed to add item");
      }

      Alert.alert("Success", "Item added successfully", [
        {
          text: "OK",
          onPress: () => router.push("/list"),
        },
      ]);
    } catch (error) {
      console.log("POST ERROR:", error);
      Alert.alert("Error", " Catch - Failed to add item");
    }
  };

  ///

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={styles.header}>+ Add Item</Text>

          {/* Category */}
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              mode="dropdown"
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Food Grains" value="Food Grains" />
              <Picker.Item label="Oils" value="Oils" />
              <Picker.Item label="Spices" value="Spices" />
              <Picker.Item label="Packaged Food" value="Packaged Food" />
              <Picker.Item label="Beverages" value="Beverages" />
              <Picker.Item label="Dairy" value="Dairy" />
              <Picker.Item label="Personal Care" value="Personal Care" />
              <Picker.Item label="Home Care" value="Home Care" />
            </Picker>
          </View>

          {/* Subtype */}
          <Text style={styles.label}>Subtype</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. Rice, Oil"
            value={subtype}
            onChangeText={setSubtype}
          />

          {/* Item Code */}
          <Text style={styles.label}>Item Code</Text>
          <TextInput
            style={[styles.input, styles.disabled]}
            value={`ITM-${Date.now()}`}
            editable={false}
          />

          {/* Name */}
          <Text style={styles.label}>Item Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. Basmati Rice"
            value={name}
            onChangeText={setName}
          />

          {/* Unit */}
          <Text style={styles.label}>Unit *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={unit}
              onValueChange={(value) => setUnit(value)}
              mode="dropdown"
            >
              <Picker.Item label="Select Unit" value="" />
              <Picker.Item label="Kg" value="Kg" />
              <Picker.Item label="gm" value="gm" />
              <Picker.Item label="Liter" value="Liter" />
              <Picker.Item label="ml" value="ml" />
              <Picker.Item label="Nos" value="Nos" />
              <Picker.Item label="Packs" value="Packs" />
            </Picker>
          </View>

          {/* Image Picker */}
          <Text style={styles.label}>Item Image *</Text>
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
              <Text style={styles.imagePlaceholder}>Tap to select image</Text>
            )}
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register Item</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#F5FBE6",
  },
  header: {
    marginTop: 24,
    padding: 8,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#FFA47F",
    borderWidth: 1,
    borderRadius: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0a0a0a",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FBEFEF",
  },
  disabled: {
    backgroundColor: "#f2f2f2",
    color: "#777",
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#FBEFEF",
    borderRadius: 15,
    marginTop: 6,
  },
  imageBox: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  imagePlaceholder: {
    color: "#777",
    fontSize: 14,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
