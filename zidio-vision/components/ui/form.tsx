import * as React from "react";
import { FormProvider, useForm, useFormContext, Controller } from "react-hook-form";

const MyForm = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormField name="name" />
        </FormItem>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

const FormItem = ({ children }) => {
  return <div>{children}</div>;
};

const FormLabel = ({ children }) => {
  return <label>{children}</label>;
};

const FormField = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <input {...field} />}
    />
  );
};

export { MyForm, FormField, FormItem, FormLabel };
