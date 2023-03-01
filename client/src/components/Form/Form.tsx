import React, { useState } from "react";

type FormProps = {
    onSubmit: (values: object) => void;
    initialValues?: { [key: string]: any };
    children: React.ReactNode;
};

function Form({ onSubmit, initialValues, children }: FormProps) {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>(initialValues || {});
  
    function handleFormChange(name: string, value: any) {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      onSubmit(formValues);
    }
  
    return (
        <form onSubmit={handleSubmit}>
            {React.Children.map(children, (child) => {
                const label = (child as React.ReactElement).props.label;
                const defaultValue = initialValues && initialValues[label as string];
                return React.cloneElement(child as React.ReactElement, {
                    onChange: handleFormChange,
                    defaultValue,
                });
             })}
        </form>
      );
  }

export default Form