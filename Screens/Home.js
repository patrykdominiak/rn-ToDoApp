import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Checkbox from "expo-checkbox";

import { AppContext } from "../Context/AppContext";

const Home = () => {
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  const { addTask, getTodos, todoList, checkTask, loading, deleteTask } =
    useContext(AppContext);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Dodaj nowe zadanie"
          placeholderTextColor="#aaaaaa"
          onChangeText={(e) => setAddData(e)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addTask(addData);
            setAddData("");
          }}
        >
          <Text style={styles.buttonText}>Dodaj</Text>
        </TouchableOpacity>
      </View>
      {todoList.length >= 1 ? (
        <FlatList
          data={todoList}
          numColumns={1}
          renderItem={({ item }) => (
            <View>
              <View style={styles.container}>
                <View style={styles.innerContainer}>
                  <Checkbox
                    style={{ marginRight: 10 }}
                    value={item.isDone}
                    onValueChange={() => checkTask(item)}
                  />
                  <Text
                    style={[
                      {
                        textDecorationLine: `${
                          item.isDone ? "line-through" : "unset"
                        }`,
                      },
                      styles.itemHeading,
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <FontAwesome
                    name="edit"
                    color="green"
                    onPress={() => {
                      navigation.navigate("Detail", item);
                    }}
                    style={[styles.todoIcon, { marginRight: 15 }]}
                  />
                  <FontAwesome
                    name="trash-o"
                    color="red"
                    onPress={() =>
                      Alert.alert("Uwaga!", "Tej akcji nie można cofnąć", [
                        {
                          text: "Anuluj",
                          onPress: () => console.log("cancel"),
                        },
                        {
                          text: "Usuń",
                          onPress: () => deleteTask(item._id),
                        },
                      ])
                    }
                    style={styles.todoIcon}
                  />
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#C9C9C9",
              fontSize: 20,
              marginTop: 20,
            }}
          >
            Nie dodałeś jeszcze żadnych zadań
          </Text>
        </View>
      )}
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  todoIcon: {
    fontSize: 30,
  },
});
