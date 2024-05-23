import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import CourseProgressBar from "./CourseProgressBar";
export default function CourseItem({ item, completedChapter }) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: Colors.WHITE,
        marginRight: 5,
        borderRadius: 15,
        marginLeft: 5,
      }}
    >
      <Image
        source={{ uri: item?.banner?.url }}
        style={{ width: 210, height: 110, borderRadius: 15 }}
      />
      <View style={{ padding: 5 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 17,
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 10,
            }}
          >
            <Ionicons name="book-outline" size={18} color="black" />
            <Text style={{ fontFamily: "outfit" }}>
              {item?.chapters?.length} Chapters
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 10,
            }}
          >
            <Ionicons name="time-outline" size={18} color="black" />
            <Text style={{ fontFamily: "outfit" }}>{item?.time}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 5,
              color: Colors.PRIMARY,
              fontFamily: "outfit-medium",
            }}
          >
            {item.price == 0 ? "Free" : item.price}
          </Text>
          <Image
            source={{ uri: item?.icon?.url }}
            style={{
              width: 30,
              height: 30,
              marginTop: 5,
            }}
          />
        </View>
      </View>
      {completedChapter != undefined ? (
        <CourseProgressBar
          totalChapter={item?.chapters?.length}
          completedChapter={completedChapter}
        />
      ) : null}
    </View>
  );
}
