import React, { useContext, useState } from "react";
import { View, Button } from "react-native";
import Error from "../components/UI/Error";
import Field from "../components/UI/Field";
import MyButton from "../components/UI/MyButton";
import TextTitle from "../components/UI/TextTitle";
import { AuthContext } from "../context/AuthContext";
import { useFetching } from "../hooks/useFetching";
import { loginHandler } from "../API/loginHandler";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const registrationPage = () => {
    navigation.navigate("Registration");
  };

  const [fetchLogin, fetchLoginError] = useFetching(async () => {
    const response = await loginHandler(email, password);
    login(response.data.token, response.data.userId);
  });

  return (
    <View>
      <TextTitle>Authorization</TextTitle>
      <Field value={email} onChangeText={setEmail} placeholder="Email.." />
      <Field
        secureTextEntry={true}
        value={password}
        type="password"
        onChangeText={setPassword}
        placeholder="Password.."
      />
      <Error>{fetchLoginError ? `${fetchLoginError}` : ""}</Error>
      <MyButton title="Sign in" onPress={fetchLogin} />
      <Button title="No account?" onPress={registrationPage} />
    </View>
  );
};
export default Login;
