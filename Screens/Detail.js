import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../Context/AppContext";
import { useNavigation } from "@react-navigation/native";

const Detail = ({ route }) => {
  const navigation = useNavigation();

  const { description, _id, added } = route.params;

  const [textHeading, onChangeHeadingText] = useState(description);

  const { updateTask } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        placeholder="Update task"
      />
      <Text style={{ fontWeight: "bold" }}>Added: {added}</Text>
      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updateTask(_id);
        }}
      >
        <Text style={{ textTransform: "uppercase" }}>Edytuj zadanie</Text>
      </Pressable>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#0de065",
  },
});
