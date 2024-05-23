import { View, Text, ToastAndroid,ScrollView } from "react-native";
import React, { useEffect,useContext } from "react";
import Content from "../Components/ChapterContent/Content";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MarkChapterCompleted } from "../Services";
import { CompleteChapterContext } from "../Context/CompletedChapterContext";
import { useUser } from "@clerk/clerk-expo";
import { UserPointsContext } from "../Context/UserPointsContext";

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const {user}=useUser();
  const {userPoints,setUserPoints}=useContext(UserPointsContext);
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);
  //ChapterId
  //RecordId
  useEffect(() => {
    // console.log("ChapterId", param.chapterId);
    // console.log("RecordId", param.userCourseRecordId);
  }, [param]);
  const onChapterFinish = () => {
    const totalPoints=Number(userPoints)+param.content?.length*10;
    MarkChapterCompleted(param.chapterId, param.userCourseRecordId,
      user.primaryEmailAddress.emailAddress,totalPoints).then(resp => {
      if (resp) {
        ToastAndroid.show("The course is completed!", ToastAndroid.LONG);
        setIsChapterComplete(true)
        setUserPoints(totalPoints);
        navigation.goBack();
      }
    });
  };
  return (
    param.content && (
      <View>
        <Content
          content={param.content}
          onChapterFinish={() => onChapterFinish()}
        />
      </View>
    )
  );
}
