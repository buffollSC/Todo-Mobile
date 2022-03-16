import React, { useContext, useState } from "react";
import { View, Button } from "react-native";
import axios from "axios";
import Error from "../components/UI/Error";
import Field from "../components/UI/Field";
import MyButton from "../components/UI/MyButton";
import TextTitle from "../components/UI/TextTitle";
import { AuthContext } from "../context/AuthContext";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const registrationPage = () => {
    navigation.navigate("Registration");
  };

  const loginHandler = async () => {
    try {
      await axios
        .post("http://172.20.10.2:5000/api/auth/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          login(response.data.token, response.data.userId);
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
      <TextTitle>Authorization</TextTitle>
      <Field 
        value={ email } 
        onChangeText={setEmail} 
        placeholder="Email.." 
      />
      <Field
        secureTextEntry={ true }
        value={ password }
        type="password"
        onChangeText={setPassword}
        placeholder="Password.."
      />
      <Error>{error ? `${ error }` : ""}</Error>
      <MyButton title="Authorization" onPress={ loginHandler } />
      <Button title="No account?" onPress={ registrationPage } />
    </View>
  );
};
export default Login
