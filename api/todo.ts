const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const getTodos = async () => {
  // await sleep(2000);
  const response = await fetch(`${API_URL}/todos`);
  const result = await response.json();
  return result;
};
