import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Reactotron from "reactotron-react-native";

import {
  Todo,
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "@/api/todo";

const TabOneScreen = () => {
  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    Reactotron.log("ZUY WAS HERE");

    queryClient.prefetchQuery({
      queryKey: ["todos", 2],
      queryFn: () => getTodoById(2),
    });
  }, []);

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      console.log("success: ", data);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      console.log("success: ", data);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const updateQueryClient = (updatedTodo: Todo) => {
    queryClient.setQueryData(["todos"], (data: any) => {
      return data.map((todo: Todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: updateQueryClient,
  });

  const addTodo = () => {
    addMutation.mutate(todo);
  };

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const deleteTodo = () => {
      deleteMutation.mutate(item.id);
    };

    const toggleDone = () => {
      updateMutation.mutate({
        ...item,
        done: !item.done,
      });
    };

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
      <View style={styles.form}>
        <TextInput
          placeholder="Add todo"
          value={todo}
          onChangeText={setTodo}
          style={styles.input}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
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
  form: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
  },
});
