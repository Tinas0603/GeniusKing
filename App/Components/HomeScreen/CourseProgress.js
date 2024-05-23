import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import SubHeading from '../SubHeading'
import Colors from '../../Utils/Colors'
import { GetAllProgressCourse } from '../../Services'
import { useUser } from '@clerk/clerk-expo'
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";
export default function CourseProgress() {
    const {user}=useUser();
    const [progressCourseList,setProgressCourseList]=useState();
    const navigation = useNavigation();
    useEffect(()=>{
        user&&GetAllProgressCourseList()
    },[user])
    const GetAllProgressCourseList=()=>{
        GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then(resp=>{
            setProgressCourseList(resp.userEnrolledCourses)
        })
    }
  return (
    <View>
      <SubHeading text={'In Progress'}
        color={Colors.WHITE}
      /> 
    <FlatList
          data={progressCourseList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Course-Detail", {
                  course: item.course,
                })
              }
            >
              <CourseItem item={item.course} 
                completedChapter={item.completedChapter?.length}
              />
            </TouchableOpacity>
          )}
          />
    </View>
  )
}