import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpSchema } from "../../validations/auth/SignUp";
import Joi from "joi";
import { useState } from "react";
import { AxiosError } from "axios";

interface SignUpFormData {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

const useSignUp = () => {
  const [status_api, setStatus_api] = useState(false);

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      try {
        const response = await instance.post(`auth/signup`, formData);
        return response;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      if (res?.status === 201) {
        toast.success("Đăng ký thành công!");
        setStatus_api(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setStatus_api(true);
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        setStatus_api(true);
      } else {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.");
        setStatus_api(true);
      }
    },
  });

  return {
    isPending,
    isError,
    error,
    mutate,
    status_api,
  };
};

export default useSignUp;
