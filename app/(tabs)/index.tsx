import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Todo, getTodos } from "../../api/todo";
import { Text, View } from "../../components/Themed";
import { Ionicons } from "@expo/vector-icons";

export default function TabOneScreen() {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => {}}>
          {item.done && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
          {!item.done && (
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          )}
          <Text>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {todosQuery.isLoading ? <ActivityIndicator size="large" /> : null}
      {todosQuery.isError ? <Text>Couldn't load todos</Text> : null}
      <FlatList
        data={todosQuery.data}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
});
