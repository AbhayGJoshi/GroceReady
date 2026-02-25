import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Grocery App 🛒</Text>
        <Text style={styles.subtitle}>
          Manage your groceries smartly and easily.
        </Text>

        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.registerButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonText}>Register</Text>
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
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#ff5e62",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#0072ff",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
