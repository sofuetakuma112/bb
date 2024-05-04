"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUpload } from "@/app/set-up-profile/fileUpload";
import { updateUser } from "@/features/actions/user";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_MB,
} from "@/features/const/validation";
import { Button } from "@/features/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { Input } from "@/features/ui/input";

const isFileSupported = typeof File !== "undefined";

const formSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "name must be at least 2 characters" }),
  file: isFileSupported
    ? z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          `ファイルサイズが大きすぎます。${MAX_MB}MB以下のファイルを選択してください`,
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "jpg, png, webpのいずれかの画像を選択してください",
        )
    : z.any().optional(),
});

type ProfileFormProps = {
  userId: string;
};

export default function ProfileForm({ userId }: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      file: undefined,
    },
  });

  const onFileSelect = (file: File) => {
    form.setValue("file", file);
  };

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("userName", data.userName);

      await updateUser(formData, userId);
      router.push("/home");
    },
  );

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mt-6 flex w-full flex-col items-center px-4 sm:mt-[96px] sm:px-0"
      >
        <h2 className="text-xl font-bold sm:text-2xl">
          プロフィールを設定しよう
        </h2>

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="mt-6 flex w-full flex-col items-center justify-center sm:mt-7">
              <FormLabel className="text-lg font-semibold sm:text-xl">
                あなたの名前
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  variant="round"
                  placeholder="名前を入力してください"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem className="mt-6 flex w-full flex-col items-center justify-center sm:mt-[96px]">
              <FormLabel className="text-lg font-semibold sm:text-xl">
                プロフィール画像
              </FormLabel>
              <FormControl>
                <FileUpload onFileSelect={onFileSelect} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="upload"
          className="mt-6 font-semibold sm:mt-9"
        >
          設定する
        </Button>
      </form>
    </Form>
  );
}
