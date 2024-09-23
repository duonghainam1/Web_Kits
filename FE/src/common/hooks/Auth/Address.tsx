import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useLocalStorage from "../Storage/useStorage";
import instance from "../../../configs/axios";
import { list_Auth } from "../../../_lib/Auth/Auth";

const Address = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  console.log(userId);

  const { data } = list_Auth(userId);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(false);

  const handleAddress = () => {
    setIsOpen(!isOpen);
    if (address) setAddress(false);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await instance.delete(`/auth/${userId}/:addressId`);
    },
  });
};

export default Address;
