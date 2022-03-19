import axios from "axios";

export const loginHandler = async (email, password) => {
  const response = await axios.post("http://172.20.10.2:5000/api/auth/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response
};
