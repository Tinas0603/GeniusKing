import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import bg2 from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/bg2.jpg";
import hutech from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/hutech.png";
import Colors from "../Utils/Colors";
import google2 from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/google2.png";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
import { useWarmUpBrowser } from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image source={bg2} style={{ height: 700, objectFit: "contain" }} />
      <View
        style={{
          height: 500,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: -210,
          padding: 15,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            source={hutech}
            style={{ width: 100, height: 100, alignSelf: "center" }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 29,
            marginTop: 10,
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome to Genius King
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 10,
            color: Colors.WHITE,
            fontFamily: "outfit",
          }}
        >
          Please sign in to continue
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: Colors.SECONDARY,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 10,
          }}
        >
          <Image
            source={google2}
            style={{ width: 40, height: 40, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 22,
              color: Colors.WHITE,
              fontFamily: "outfit",
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
