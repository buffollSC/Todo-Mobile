import React, { useState } from "react";
import { View } from "react-native";
import axios from "axios";
import TextTitle from "../components/UI/TextTitle";
import Field from "../components/UI/Field";
import MyButton from "../components/UI/MyButton";
import Error from "../components/UI/Error";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backScreen = () => {
    navigation.goBack();
  }

  const registerHandler = async () => {
    try {
      setError("");
      await axios
        .post("http://172.20.10.2:5000/api/auth/registration",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("created user!");
          backScreen();
        });
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <View>
      <TextTitle>Registration</TextTitle>
      <Field 
        value={ email } 
        onChangeText={ setEmail } 
        placeholder="Email.." 
      />
      <Field
        secureTextEntry={ true }
        value={ password }
        onChangeText={ setPassword }
        placeholder="Password.."
      />
      <Error>{error ? `${ error }` : ""}</Error>
      <MyButton title="Registration" onPress={ registerHandler } />
    </View>
  );
};
export default Signup;
