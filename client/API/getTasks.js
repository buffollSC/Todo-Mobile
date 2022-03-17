import axios from "axios";

export const getTasks = async (userId) => {
  const response = await axios.get("http://172.20.10.2:5000/api/todo", {
        headers: {
          "Content-Type": "application/json",
        },
        params: { userId },
      })
    return response
};
