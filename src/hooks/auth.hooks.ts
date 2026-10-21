import { userLogin, userRegister } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};
