import { Ionicons } from "@expo/vector-icons";
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

const TabOneScreen = () => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const deleteTodo = () => {};

    const toggleDone = () => {};

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
          {!item.done && (
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          )}
          <Text style={styles.todoText}>{item.text}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          onPress={deleteTodo}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {todosQuery.isLoading ? <ActivityIndicator size="large" /> : null}
      {todosQuery.isError ? <Text>Couldn't load todos</Text> : null}
      <FlatList
        data={todosQuery.data}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    // alignItems: "center",
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
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
