import axios from "axios";

export const registerHandler = async (email, password) => {
  const response = await axios.post("http://172.20.10.2:5000/api/auth/registration",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response
};
