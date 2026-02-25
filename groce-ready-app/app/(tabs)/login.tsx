import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      Alert.alert("Success", "Login button pressed");
      console.log({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
            />

            <Pressable onPress={() => setSecure(!secure)}>
              <Text style={styles.showText}>{secure ? "Show" : "Hide"}</Text>
            </Pressable>
          </View>

          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
        </View>

        {/* Login Button */}
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5b86e5",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 15,
    elevation: 8,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  showText: {
    color: "#0072ff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff5e62",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
