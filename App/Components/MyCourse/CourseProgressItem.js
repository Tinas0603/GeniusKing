import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import CourseProgressBar from '../HomeScreen/CourseProgressBar';

export default function CourseProgressItem({ item, completedChapter }) {
  // Tính phần trăm tiến trình hoàn thành
  const totalChapters = item?.chapters?.length ?? 1;
  const percentCompleted = ((completedChapter ?? 0) / totalChapters) * 100;

  // Kiểm tra nếu tất cả các bài giảng đã hoàn tất thì không tính vào tiến trình
  const allChaptersCompleted = completedChapter === totalChapters;

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: Colors.WHITE,
        marginRight: 15,
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: item?.banner?.url }}
        style={{ width: "100%", height: 170, borderRadius: 15 }}
      />
      <View style={{ padding: 7 }}>
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
              marginTop: 5,
            }}
          >
            <Ionicons name="book-outline" size={18} color="black" />
            <Text style={{ fontFamily: 'outfit' }}>{totalChapters} Chapters</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <Ionicons name="time-outline" size={18} color="black" />
            <Text>{item?.time}</Text>
          </View>
        </View>
        {!allChaptersCompleted && (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
              {percentCompleted.toFixed(0)}% Completed
            </Text>
          </View>
        )}
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
