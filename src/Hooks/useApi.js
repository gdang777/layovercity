import { useMemo } from "react";
import Axios from "axios";
import { BASE_URL } from "../utils/env";

import { useSelector } from "react-redux";

const useApi = () => {
  const user = useSelector((state) => state.user);

  const { token } = user;

  const api = useMemo(() => {
    const apiObject = Axios.create({
      baseURL: BASE_URL,
      headers: {
        accesstoken: token,
      },
    });

    // TODO: udpate token if there is any token field present
    // in the response hanlder
    apiObject.interceptors.response.use((response) => response);

    return apiObject;
  }, [token]);

  return api;
};

export default useApi;
