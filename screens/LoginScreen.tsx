import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
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
