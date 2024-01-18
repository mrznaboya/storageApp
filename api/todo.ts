const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Todos {
  id: string;
  text: string;
  done: boolean;
}

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  return await response.json();
};
