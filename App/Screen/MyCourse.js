import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import Colors from "../Utils/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { GetAllProgressCourse } from "../Services";
import CourseProgressItem from "../Components/MyCourse/CourseProgressItem";
import banner from "D:/GeniusKing Learning Application/GeniusKing_Learning_Application/assets/images/banner.jpg";

export default function MyCourse() {
  const { user } = useUser();
  const [progressCourseList, setProgressCourseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    GetAllProgressCourseList();
    setRefreshing(false);
  };

  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user]);

  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then((resp) => {
      setProgressCourseList(resp.userEnrolledCourses);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
      <Image source={banner} style={{ width: "100%", height: 200 }} />
      {progressCourseList.length === 0 ? (
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 22, color: Colors.BLACK,padding:5,margin:5 }}>
            You have not participated in any courses yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={progressCourseList}
          style={{ marginTop: -40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ margin: 10, padding: 5 }}
              onPress={() =>
                navigation.navigate("Course-Detail", {
                  course: item.course,
                })
              }
            >
              <CourseProgressItem
                item={item.course}
                completedChapter={item.completedChapter?.length}
              />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
