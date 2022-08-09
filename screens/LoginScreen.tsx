import { Pressable, StyleSheet } from "react-native";
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
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: "597967931706946",
      expoClientId: "597967931706946",
      webClientId: "597967931706946",
      responseType: ResponseType.Code,
    });

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

  const [request, response, promptAsyncGoogle] = Google.useAuthRequest({
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

  useEffect(() => {
    console.log(responseFacebook);
    if (responseFacebook?.type === "success") {
      const { code } = responseFacebook.params;
      console.log({ facebook_login_code: code });
    }
  }, [responseFacebook]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.loginButtonGoogle}>
        <Text style={styles.googleBlue}>G</Text>
        <Text style={styles.googleRed}>o</Text>
        <Text style={styles.googleYellow}>o</Text>
        <Text style={styles.googleBlue}>g</Text>
        <Text style={styles.googleBlue}>l</Text>
        <Text style={styles.googleRed}>e</Text>
      </Pressable>
      <Pressable
        style={styles.loginButtonFacebook}
        onPress={() => promptAsyncFacebook()}
      >
        <Text>Facebook</Text>
      </Pressable>
      <Pressable style={styles.loginButtonWechat}>
        <Text>WeChat</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD45C",
  },
  loginButtonGoogle: {
    backgroundColor: "#E5E5E5",
    height: "48px",
    width: "327px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 48,
  },
  googleBlue: {
    color: "#4285F4",
  },
  googleRed: {
    color: "#DB4437",
  },
  googleYellow: {
    color: "#F4B400",
  },
  googleGreen: {
    color: "#0F9D58",
  },
  loginButtonFacebook: {
    height: "48px",
    width: "327px",
    marginTop: "3em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4267B2",
    background: "#4267B2",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 48,
  },
  loginButtonWechat: {
    height: "48px",
    width: "327px",
    marginTop: "3em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09B83E",
    background: "#4267B2",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 48,
  },
});
