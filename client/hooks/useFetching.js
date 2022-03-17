import { useState } from "react";

export const useFetching = (callback) => {
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      await callback();
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  return [fetching, error];
};
