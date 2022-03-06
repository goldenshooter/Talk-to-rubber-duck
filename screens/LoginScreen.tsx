import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from "expo-local-authentication";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  console.log(window?.location?.hostname);

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
    console.log('log in through biometric success!')
    navigation.navigate("Root")
  };

  // const createCredential = async () => {
  //   const mockRandomStringFromServer = uuidv4();
  //   const publicKeyCredentialCreationOptions: any = {
  //     challenge: Uint8Array.from(mockRandomStringFromServer, (c: any) =>
  //       c.charCodeAt(0)
  //     ),
  //     rp: {
  //       name: "Talk to rubber duck",
  //       id: "localhost",
  //     },
  //     user: {
  //       id: Uint8Array.from("UZSL85T9AFC", (c) => c.charCodeAt(0)),
  //       name: "steven@gmail.com",
  //       displayName: "Steven",
  //     },
  //     pubKeyCredParams: [{ alg: -7, type: "public-key" }],
  //     authenticatorSelection: {
  //       authenticatorAttachment: "platform",
  //       userVerification: "discouraged",
  //     },
  //     timeout: 60000,
  //     attestation: "direct",
  //   };
  //   const credential = await navigator.credentials.create({
  //     publicKey: publicKeyCredentialCreationOptions,
  //   });
  //   console.log(credential);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.text}>User name</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="What's your user name?"
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />
      <Button
        onPress={() => navigation.navigate("Root")}
        title="Log in"
        color="#FFB323"
        accessibilityLabel="Log in with one click"
      />
      <Button
        onPress={biometricsAuth}
        title="Authenticate"
        color="purple"
        accessibilityLabel="authenticate"
      />
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
