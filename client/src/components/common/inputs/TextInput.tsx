import React from "react";
import { useField } from "formik";
import { FloatingLabel, Form, FormLabel } from "react-bootstrap";

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

export default function CustomTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <>
        <FloatingLabel 
            controlId={props.name}
            label={props.placeholder}
        >
          <Form.Control {...field} {...props} /> 
        </FloatingLabel>
        {meta.touched && meta.error ? (
            <FormLabel className="text-danger">
              {meta.error}
            </FormLabel>
          ) : null}
    </> 
  );
}
