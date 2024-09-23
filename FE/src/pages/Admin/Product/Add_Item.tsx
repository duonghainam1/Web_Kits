import React from "react";
import Form_Item from "./_component/form";
import { CheckAuths } from "../../../common/hooks/Auth/useAuthorization";

const Add_Item = () => {
  return (
    <CheckAuths roles={["admin"]}>
      <Form_Item />
    </CheckAuths>
  );
};

export default Add_Item;
