import React from "react";
import { useField } from "formik";
import { FloatingLabel, Form } from "react-bootstrap";

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

export default function CustomTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  console.log(field, props);
  
  return (
    <>
        <FloatingLabel 
            controlId={props.name}
            label={props.placeholder}
        >
          <Form.Label>{props.label}</Form.Label>
          <Form.Control {...field} {...props}/>
          {meta.touched && meta.error ? (
            <Form.Label color="red">
              {meta.error}
            </Form.Label>
          ) : null}
        </FloatingLabel>
    </> 
  );
}
