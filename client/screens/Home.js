import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import axios from "axios";
import { Tasks } from "../components/TaskItem/Tasks";
import Field from "../components/UI/Field";
import TextTitle from "../components/UI/TextTitle";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [text, setText] = useState("");
  const [textItems, setTextItems] = useState([]);
  const { userId } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();

  const getTasks = async () => {
    try {
      await axios
        .get("http://172.20.10.2:5000/api/todo", {
          headers: {
            "Content-Type": "application/json",
          },
          params: { userId },
        })
        .then((response) => {
          setTextItems(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = useCallback(async () => {
    if (!text) return;
    try {
      await axios
        .post("http://172.20.10.2:5000/api/todo/add",
          { text, userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setTextItems([...textItems], response.data);
          setText("");
          getTasks();
        });
    } catch (error) {
      console.log(error);
    }
  }, [text, userId, textItems]);

  const deleteTask = useCallback(
    async (id) => {
      try {
        await axios
          .delete(`http://172.20.10.2:5000/api/todo/delete/${id}`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => getTasks());
      } catch (error) {
        console.log(error);
      }
    },
    [getTasks]
  );

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Today's Task*/}
        <View style={styles.tasksWrapper}>
          <TextTitle>To do list</TextTitle>
          <View style={styles.items}>
            {/* This is where the tasks will go!*/}
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              {textItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => deleteTask(item._id)}
                  >
                    <Tasks text={item.text} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
        {/*Write a task */}
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={headerHeight}
          // style={styles.writeTaskWrapper}
          contentContainerStyle={{
            paddingBottom: 20,
            marginBottom: 40,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Field
              style={styles.input}
              placeholder="Write a task"
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity onPress={createTask}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  items: {
    marginTop: 30,
    flex: 1,
  },
  writeTaskWrapper: {
    // position: "absolute",
    // bottom: 60,
    width: "100%",
    paddingBottom: 50,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginLeft: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    marginRight: 20,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 22,
    color: "blue",
  },
});
export default Home;
