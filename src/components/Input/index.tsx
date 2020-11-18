import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { InputBlock } from './styles';

interface InputProps extends TextInputProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputBlock
      ref={inputRef}
      keyboardAppearance="default"
      defaultValue={defaultValue}
      onChangeText={value => {
        inputValueRef.current.value = value;
      }}
      {...rest}
    />
  );
};

export default Input;
