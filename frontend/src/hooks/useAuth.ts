import { useEffect } from "react";
import {
  useUserServicePostUserLogin,
  useUserServicePostUserRegister,
} from "../../openapi/queries";
import { useLocalStorage } from "./useLocalStorage";
import { LoginUserBody, ReigsterUserBody } from "../../openapi/requests";

const TOKEN_KEY = "token";

export function useAuthToken() {
  const [token, setToken] = useLocalStorage<string | null>(TOKEN_KEY, null);

  // const registerMutation = useUserServicePostUserRegister();
  // const loginMutation = useUserServicePostUserLogin();

  // useEffect(() => {
  //   if (registerMutation.isSuccess) {
  //     console.log(registerMutation.data);
  //     setToken(registerMutation.data);
  //   }
  // }, [registerMutation.isSuccess]);

  // useEffect(() => {
  //   if (loginMutation.isSuccess) {
  //     console.log(loginMutation.data);
  //     setToken(loginMutation.data);
  //   }
  // }, [loginMutation.isSuccess]);

  // function register(body: ReigsterUserBody) {
  //   registerMutation.mutate({ requestBody: body });
  // }

  // function login(body: LoginUserBody) {
  //   loginMutation.mutate({ requestBody: body });
  // }

  return [token, setToken] as const;
}
