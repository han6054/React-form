import React from "react";
import FieldContext from "./FieldContext";

class Field extends React.Component {
  static contextType = FieldContext; // this.context 获取Provider里的value
  getControlled = (childProps) => {
    const { name } = this.props;
    let { getFieldValue, setFieldValue } = this.context;
    return {
      ...childProps,
      value: getFieldValue(name),
      onChange: (event) => setFieldValue(name, event.target.value),
    };
  };
  render() {
    const children = this.props.children;
    return React.cloneElement(children, this.getControlled(children.props));
  }
}

export default Field;
