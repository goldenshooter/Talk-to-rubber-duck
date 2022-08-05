import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from "expo-local-authentication";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";
import type { RootState } from "../store";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const biometricsAuth = async () => {
    const compatible = await hasHardwareAsync();
    console.log({ compatible });
    if (!compatible) {
      console.error(
        "This device is not compatible for biometric authentication"
      );
    }
    const enrolled = await isEnrolledAsync();
    console.log({ enrolled });
    if (!enrolled) {
      console.error("This device doesnt have biometric authentication enabled");
    }
    const result = await authenticateAsync();
    console.log({ result });
    if (!result.success) {
      console.error(result);
    }
    console.log("log in through biometric success!");
    navigation.navigate("Root");
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "910635067268-1j5ruf2a32l9841117pmbc8djttpftjr.apps.googleusercontent.com",
    iosClientId:
      "910635067268-d0uc7vgqa0ekojhrupka2nsgm7etkv94.apps.googleusercontent.com",
    androidClientId:
      "910635067268-8o1knalfsh4cavffa8v4g4o7c9a6rgf9.apps.googleusercontent.com",
    webClientId:
      "910635067268-1j5ruf2a32l9841117pmbc8djttpftjr.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authenticateAsync);
      navigation.navigate("Root");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.text}>User name</Text>
      <TextInput style={{ height: 40 }} placeholder="What's your user name?" />
      <Button
        onPress={() => navigation.navigate("Root")}
        title="Log in"
        color="#FFB323"
        accessibilityLabel="Log in with one click"
      />
      <Button
        onPress={() => {
          promptAsync();
        }}
        title="Goolge login"
        color="#4285f4"
        accessibilityLabel="Goolge login"
      />
      <Button
        onPress={biometricsAuth}
        title="Authenticate"
        color="purple"
        accessibilityLabel="authenticate"
      />
      <Text>Count:</Text>
      <Text>{count}</Text>

      <Button onPress={() => dispatch(increment())} title="add" />
      <Button onPress={() => dispatch(decrement())} title="minus" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
