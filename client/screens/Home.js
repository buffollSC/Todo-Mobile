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
import { useFetching } from "../hooks/useFetching";
import { getTasks } from "../API/getTasks";
import { createTask } from "../API/createTask";

const Home = () => {
  const [text, setText] = useState("");
  const [textItems, setTextItems] = useState([]);
  const { userId } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();


  const [fetchTasks, fetchError] = useFetching(async () => {
    const response = await getTasks(userId)
    setTextItems(response.data)
  })

  const [fetchCreateTask, fetchCreateTaskError] = useFetching(async () => {
    const response = await createTask(text, userId)
    setTextItems([...textItems], response.data)
    setText('')
    fetchTasks()
  })
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

  const completedTask = useCallback( async (id) => {
    try {
        await axios.put(`http://172.20.10.2:5000/api/todo/complete/${id}`, {id}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setTextItems([...textItems], response.data)
            fetchTasks()
        })
    } catch (error) {
        console.log(error)
    }
}, [setTextItems, fetchTasks])

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <TextTitle>To do list</TextTitle>
          <View style={styles.items}>
            <ScrollView>
              {
                textItems.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                    >
                      <Tasks 
                        onCompleted={() => completedTask(item._id)}
                        completed={item.completed} 
                        onDelete={() => deleteTask(item._id)} 
                        text={item.text} 
                      />
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={headerHeight}
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
            <TouchableOpacity onPress={fetchCreateTask}>
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
    color: "#55BCF6",
  },
});
export default Home;
