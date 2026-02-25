import { useFormik } from "formik";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const RegistrationForm = () => {
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Username is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please re-type your password"),

      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile number is required"),
    }),

    onSubmit: (values) => {
      setSubmittedData(values);
      console.log("Form Data:", values); // ✅ correct
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Register</Text>

        <InputField label="Username" name="username" formik={formik} />
        <InputField label="Email" name="email" formik={formik} />
        <InputField
          label="Password"
          name="password"
          secureTextEntry
          formik={formik}
        />
        <InputField
          label="Re-type Password"
          name="confirmPassword"
          secureTextEntry
          formik={formik}
        />
        <InputField
          label="Mobile Number"
          name="mobile"
          keyboardType="numeric"
          formik={formik}
        />

        <Pressable style={styles.button} onPress={formik.handleSubmit as any}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const InputField = ({
  label,
  name,
  formik,
  secureTextEntry = false,
  keyboardType = "default",
}: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>

    <TextInput
      style={styles.input}
      value={formik.values[name]}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />

    {formik.touched[name] && formik.errors[name] && (
      <Text style={styles.error}>{formik.errors[name]}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#667eea",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    elevation: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4b0082",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#ff5e62",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default RegistrationForm;
