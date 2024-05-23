import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import Colors from "../Utils/Colors";
import Gold from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/gold-medal.png";
import Silver from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/silver-medal.png";
import Bronze from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/bronze-medal.png";
import { GetAllUsers } from "../Services";
import leaderboard from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/leaderboard.jpg";
import { UserPointsContext } from "../Context/UserPointsContext";

export default function LeaderBoard() {
  const [userList, setUserList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { userPoints } = useContext(UserPointsContext);

  useEffect(() => {
    GetAllUserDetails();
  }, [userPoints]);

  const GetAllUserDetails = () => {
    GetAllUsers().then((resp) => {
      resp && setUserList(resp?.userDetails);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    GetAllUserDetails();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 ,backgroundColor:Colors.PRIMARY}}>
      <Image
        source={leaderboard}
        style={{ width: "100%", height: 200 }}
      />

      <View >
        <FlatList
          data={userList}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                backgroundColor: Colors.WHITE,
                margin: 5,
                marginLeft: 10,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 25,
                    color: Colors.GRAY,
                  }}
                >
                  {index + 1}
                </Text>
                <Image
                  source={{ uri: item.profileImage }}
                  style={{ width: 60, height: 60, borderRadius: 99 }}
                />
                <View>
                  <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
                    {item.userName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 16,
                      color: Colors.GRAY,
                    }}
                  >
                    {item.point} Points
                  </Text>
                </View>
              </View>
              {index < 3 ? (
                <Image
                  source={
                    index + 1 === 1 ? Gold : index + 1 === 2 ? Silver : Bronze
                  }
                  style={{ width: 40, height: 40 }}
                />
              ) : null}
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}
