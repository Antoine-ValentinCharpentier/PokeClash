import React from "react";

import '../../assets/style/components/Form/FormItem.css'

type FormItemProps = {
  label: string;
  name: string;
  children: React.ReactNode;
  onChange?: (name: string, value: any) => void;
  defaultValue?: any;
};

type PropsInputsToModify = {
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: any;
}

function cloneChildren(children: React.ReactNode, props: PropsInputsToModify) {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps: any = {};

      if (child.props.children) {
        childProps.children = cloneChildren(child.props.children, props);
      }

      if (child.type === "input") {
        childProps.id = props.name;
        childProps.name = props.name;
        childProps.onChange = props.onChange;
        childProps.value = props.defaultValue;
      }

      return React.cloneElement(child, childProps);
    }

    return child;
  });
}

function FormItem({label, name, children, onChange, defaultValue}: FormItemProps) {
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(onChange) {
        onChange(name, event.target.value);
    }
  }

  const clonedChildren = cloneChildren(children, {name, onChange: handleInputChange, defaultValue});

  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      {clonedChildren}
    </div>
  );
}

export default FormItem;
