import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../Utils/Colors";
import { UserPointsContext } from "../Context/UserPointsContext";
import Coin from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/coin.png";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
export default function Profile() {
  const { signOut } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const { userPoints } = useContext(UserPointsContext);
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: () => {
            signOut();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  const openFacebook = () => {
    WebBrowser.openBrowserAsync(
      "https://www.facebook.com/profile.php?id=100032039688900"
    );
  };
  const openInstagram = () => {
    WebBrowser.openBrowserAsync("https://www.instagram.com/tinas0603_/");
  };
  const openDiscord = () => {
    WebBrowser.openBrowserAsync("https://discord.gg/PpapaYB8");
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 160,
          backgroundColor: Colors.PRIMARY,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
            fontSize: 35,
          }}
        >
          {/* Profile */}
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: Colors.DANGER,
            padding: 10,
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        >
          <View style={styles.rowStyle}>
            <MaterialIcons name="logout" size={15} color={Colors.WHITE} />
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 15,
                fontFamily: "outfit-medium",
              }}
            >
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: -50, alignItems: "center" }}>
        <View>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 100, height: 100, borderRadius: 99 }}
          />
        </View>
        <Text style={styles.mainText}>{user?.fullName}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Image source={Coin} style={{ width: 30, height: 30 }} />
          <Text style={styles.mainText}>{userPoints} Points</Text>
        </View>
      </View>
      <View style={{ padding: 15, marginLeft: 20, marginRight: 20 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Contact with us:
        </Text>
        <TouchableOpacity
          onPress={openFacebook}
          style={{
            backgroundColor: Colors.SECONDARY,
            padding: 10,
            borderRadius: 20,
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <View style={styles.rowStyle}>
            <AntDesign name="facebook-square" size={24} color={Colors.WHITE} />
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 20,
                fontFamily: "outfit-medium",
              }}
            >
              Facebook
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openInstagram}
          style={{
            backgroundColor: Colors.INSTAGRAM,
            padding: 10,
            borderRadius: 20,
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <View style={styles.rowStyle}>
            <AntDesign name="instagram" size={24} color={Colors.WHITE} />
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 20,
                fontFamily: "outfit-medium",
              }}
            >
              Instagram
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openDiscord}
          style={{
            backgroundColor: Colors.DISCORD,
            padding: 10,
            borderRadius: 20,
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <View style={styles.rowStyle}>
            <MaterialIcons name="discord" size={24} color={Colors.WHITE} />
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 20,
                fontFamily: "outfit-medium",
              }}
            >
              Discord
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <View style={styles.rowStyle}>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 20,
                fontFamily: "outfit-medium",
              }}
            >
              Update soon...
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: Colors.BLACK,
    fontSize: 17,
    fontFamily: "outfit",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 20,
    marginTop: 15,
    alignItems: "center",
  },
});
