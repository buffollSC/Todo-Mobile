import axios from "axios";

export const createTask = async (text, userId) => {
  if (!text) {
    return;
  } else {
    const response = await axios.post("http://172.20.10.2:5000/api/todo/add",
      { text, userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response
  }
}
