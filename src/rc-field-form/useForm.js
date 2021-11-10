import React from "react";

class FormStore {
  constructor(forceRootRender) {
    this.store = Object.create({}); // 存放表单的对象
    this.callbacks = {};
    this.forceRootRender = forceRootRender;
  }
  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };
  };
  setFieldValue = (name, value) => {
    return (this.store[name] = value);
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  getFieldsValue = () => {
    return this.store;
  };
  setCallbacks = (callbacks) => {
    this.callbacks = callbacks;
  };
  submit = () => {
    const { onFinish } = this.callbacks;
    onFinish && onFinish(this.store);
  };
  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  };
}

export default function useForm() {
  let formRef = React.useRef();
  let [, forceUpdate] = React.useState({});
  if (!formRef.current) {
    const forceReRender = () => {
      forceUpdate({}); // 让组件刷新
    };
    let formStore = new FormStore(forceReRender);
    let formInstance = formStore.getForm();
    formRef.current = formInstance;
  }

  return [formRef.current];
}
