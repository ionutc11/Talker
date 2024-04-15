import React, { useMemo, ChangeEvent } from "react";
import { useController } from "react-hook-form";

import {
  CustomInput,
  ErrorContainer,
  HeaderContainerd,
  InputContainer,
  Label,
  RemoveButton,
} from "./style";

interface IInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  type: React.HTMLInputTypeAttribute;
  validation?: (
    name: string,
    currentFieldValue: string | number,
    allFieldsValues?: Record<string, string | number>
  ) => boolean | string;
  sideChangeEffect?: (event: ChangeEvent<HTMLInputElement>) => void;
  removeField?: () => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  readOnly?: boolean;
}

const Input = ({
  control,
  name,
  type,
  required,
  validation,
  label,
  placeholder,
  readOnly,
  sideChangeEffect,
  removeField,
}: IInput) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: required ? "Input is required" : false,
      validate: (currentFieldValue, allFieldsValues) => {
        return validation
          ? validation(name, currentFieldValue, allFieldsValues)
          : true;
      },
    },
  });
  const elementId: string = useMemo(() => `${name}-id`, [name]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    sideChangeEffect?.(event);
    field.onChange(event);
  };

  return (
    <InputContainer width="100%">
      <HeaderContainerd>
        {label && <Label htmlFor={elementId}>{label}</Label>}
        {removeField && (
          <RemoveButton type="button" onClick={removeField}>
            -
          </RemoveButton>
        )}
      </HeaderContainerd>
      <CustomInput
        type={type}
        onChange={onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        id={elementId}
        placeholder={placeholder}
        readOnly={readOnly}
      />

      <ErrorContainer>
        {fieldState.error && <p>{fieldState.error.message}</p>}
      </ErrorContainer>
    </InputContainer>
  );
};

export default Input;
