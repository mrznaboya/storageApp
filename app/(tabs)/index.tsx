import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useEffect } from "react";
import { getTodos } from "../../api/todo";

export default function TabOneScreen() {
  useEffect(() => {
    console.log("TabOneScreen");
    getTodos().then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the first tab!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
