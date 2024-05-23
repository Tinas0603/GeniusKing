import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import RenderHtml from "react-native-render-html";
import Colors from "../../Utils/Colors";
export default function ContentItem({ description, output }) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html: description,
  };
  const outputSource = {
    html: output,
  };
  return (
    description && (
      <View>
        <RenderHtml
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagsStyles}
        />
        {output != null ? (
          <TouchableOpacity
            onPress={() => setIsRun(true)}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Text
              style={{
                padding: 10,
                backgroundColor: Colors.SECONDARY,
                borderRadius: 10,
                fontFamily: "outfit",
                width: 100,
                fontSize: 15,
                marginBottom:20,
                color: Colors.WHITE,
                textAlign: "center",
              }}
            >
              Run
            </Text>
          </TouchableOpacity>
        ) : null}
        {isRun ? (
          <>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 17,
                marginBottom: 10,
              }}
            >
              Output
            </Text>
            <RenderHtml
              contentWidth={width}
              source={outputSource}
              tagsStyles={outputStyles}
            />
          </>
        ) : null}
      </View>
    )
  );
}

const tagsStyles = {
  body: {
    fontFamily: "outfit",
    fontSize: 15,
    marginBottom:30
  },
  code: {
    backgroundColor: Colors.DRACULA_BACKGROUND,
    color: Colors.WHITE,
    padding: 15,
    borderRadius: 15,
    
  },
};

const outputStyles = {
  body: {
    fontFamily: "outfit",
    fontSize: 15,
    backgroundColor: Colors.DRACULA_BACKGROUND,
    color: Colors.WHITE,
    padding: 10,
    borderRadius: 15,
    marginBottom:50
  },
  code: {
    backgroundColor: Colors.BLACK,
    color: Colors.WHITE,
    padding: 5,
    borderRadius: 15,
  },
};
