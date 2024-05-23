import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState,useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChapterSection from "../Components/CourseDetailScreen/ChapterSection";
import { ScrollView } from "react-native-gesture-handler";
import { enrollCourse, getUserEnrolledCourse } from "../Services";
import { useUser } from "@clerk/clerk-expo";
import { CompleteChapterContext } from "../Context/CompletedChapterContext";
import Colors from "../Utils/Colors";

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);
  const [userEnrolledCourse,setUserEnrolledCourse]=useState([]);
  const { user } = useUser();
  useEffect(() => {
    console.log(params.course);
    if(user&&params.course)
    {
      GetUserEnrolledCourse();
    }
  }, [params.course,user]);
  useEffect(()=>{
    isChapterComplete&&GetUserEnrolledCourse();
  },[isChapterComplete])
  const UserEnrollCourse = () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress)
    .then(resp=>{
       // console.log("--",resp);
       if(resp)
       {
        ToastAndroid.show('Course Enrolled successfully!', ToastAndroid.LONG);
          GetUserEnrolledCourse();
       }
      }
    );
  };
  const GetUserEnrolledCourse =()=>{
    getUserEnrolledCourse(params.course.id, user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      //console.log("--",resp.userEnrolledCourse);
      setUserEnrolledCourse(resp.userEnrolledCourses)
    })
  }
  return params.course&& (
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color={Colors.SECONDARY} />
        </TouchableOpacity>
        <DetailSection
          course={params.course}
          userEnrolledCourse={userEnrolledCourse}
          enrollCourse={() => UserEnrollCourse()}
        />
        <ChapterSection chapterList={params.course.chapters} 
           userEnrolledCourse={userEnrolledCourse}
        />
      </ScrollView>
    )
}