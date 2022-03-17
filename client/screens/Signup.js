import React, { useState } from "react";
import { View } from "react-native";
import TextTitle from "../components/UI/TextTitle";
import Field from "../components/UI/Field";
import MyButton from "../components/UI/MyButton";
import Error from "../components/UI/Error";
import { useFetching } from "../hooks/useFetching";
import { registerHandler } from "../API/registerHandler";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backScreen = () => {
    navigation.goBack();
  }

  const [fetchRegistration, fetchRegistrationError] = useFetching(async() => {
    const response = await registerHandler(email, password)
    if(response){
      backScreen()
    }
  })

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
      <Error>{fetchRegistrationError ? `${ fetchRegistrationError }` : ""}</Error>
      <MyButton title="Sign up" onPress={ fetchRegistration } />
    </View>
  );
};
export default Signup;
