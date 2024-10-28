import {
  Input,
  InputProps,
  Stack,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
} from "@mantine/core";
import get from "lodash/get";
import isNil from "lodash/isNil";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

interface CustomInputFieldProps<T extends FieldValues> {
  hForm: UseFormReturn<T>;
  name: Path<T>;
  rules?: RegisterOptions;
  title: string;
  titleProps?: TextProps;
}

export type InputFieldProps<T extends FieldValues> = CustomInputFieldProps<T> &
  Omit<TextInputProps, "name">;

function InputField<T extends FieldValues>({
  hForm,
  name,
  rules,
  title,
  titleProps,
  ...props
}: InputFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = hForm;
  const error = get(errors, name);
  return (
    <Stack gap={2}>
      {title && (
        <Text fz={20} fw={500} {...titleProps}>
          {title}
        </Text>
      )}
      <TextInput
        {...register(name, { required: rules?.required })}
        {...props}
      />
      {!isNil(error) && (
        <Text fz={10} c="red">
          This Field is required
        </Text>
      )}
    </Stack>
  );
}

export default InputField;
