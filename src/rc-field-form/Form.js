import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";
/**
 *
 * @param {*} props
 * initialValues 初始值
 * onFinish 完成式回调
 */
const Form = ({ initialValues, onFinish, children }) => {
  let [formInstance] = useForm();
  formInstance.setCallbacks({
    onFinish,
  });
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
};

export default Form;
