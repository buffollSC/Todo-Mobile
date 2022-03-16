import React from "react";
import { View, Button } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Signup from "./screens/Signup";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

export const Navigation = (isLogin, logout) => {
  return (
    <NavigationContainer>
      {isLogin ? (
        <Stack.Navigator
          screenOptions={{
            headerRight: () => (
              <View>
                <Button 
                  title='Logout'
                  onPress={logout}
                />
              </View>
            ),
          }}
        >
          <Stack.Screen
            name="HomePage"
            component={Home}
            options={{ title: "Home" }}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <Stack.Screen
            name="Authorization"
            component={Login}
            options={{ title: "LogIn" }}
          />
          <Stack.Screen
            name="Registration"
            component={Signup}
            options={{ title: "SignUp" }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}