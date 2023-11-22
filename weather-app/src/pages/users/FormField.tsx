//FormField.tsx
import React from "react";
import styled from "styled-components";

const FieldContainer = styled.div`
  margin-bottom: 20px;
  // border: none;
  border-bottom: 2px solid #5d6dbe;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #5d6dbe;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  // border-radius: 4px;
  font-family: "Jua", sans-serif;
`;

type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  readOnly?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  maxLength,
  readOnly,
}) => {
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        readOnly={readOnly}
      />
    </FieldContainer>
  );
};

export default FormField;
