import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default TextTitle = (props) => {
  return (
    <View>
      <Text style={styles.text} {...props} />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
    padding: 30,
    textAlign: "center",
    fontSize: 30,
    marginBottom: 10,
  },
});
