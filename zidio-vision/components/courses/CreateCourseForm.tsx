"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ComboBox } from "../custom/ComboBox";

interface FormData {
  title: string;
  categoryId: string;
  subCategoryId: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and minimum 2 characters",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  subCategoryId: z.string().min(1, {
    message: "Subcategory is required",
  }),
});

interface CreateCourseFormProps {
  categories: Array<{ value: string; label: string; subCategories: string[] }>;
}

const MyForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Ex: Web Development for Beginners"
              {...field}
            />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Category</FormLabel>
            <ComboBox options={[]} {...field} /> {/* Provide initial empty options */}
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subCategoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Subcategory</FormLabel>
            <ComboBox options={[]} {...field} /> {/* Provide initial empty options */}
          </FormItem>
        )}
      />
    </>
  );
};

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ categories }) => {
  const router = useRouter(); // Ensure useRouter() is used inside the component

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/instructor/courses/${response.data.id}/basic`);
      toast.success("New Course Created");
    } catch (err: any) {
      handleSubmissionError(err);
    }
  };

  const handleSubmissionError = (error: AxiosError<any>) => {
    let errorMessage = "Something went wrong!";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    console.error("Failed to create new course", error);
    toast.error(errorMessage);
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Let's give some basics for your course
      </h1>
      <p className="text-sm mt-3">
        It's okay if you cannot think of a good title or correct category now.
        You can change them later.
      </p>
      <FormProvider {...useForm()}>
        <MyForm />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateCourseForm;
