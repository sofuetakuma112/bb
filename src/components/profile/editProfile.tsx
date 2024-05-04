import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUpload } from "@/app/(authenticated)/post/fileUpload";
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
        .optional()
    : z.any().optional(),
  name: z.string().min(2, { message: "名前は2文字以上である必要があります" }),
});

type EditProfileProps = {
  userId: string;
  userName: string;
  close: () => void;
};

export default function EditProfile({
  userId,
  userName,
  close,
}: EditProfileProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      name: userName,
    },
  });

  const onSubmit = form.handleSubmit((data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("userName", data.name);
    updateUser(formData, userId).then(() => close());
  });

  const onFileSelect = (file: File) => {
    form.setValue("file", file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-col items-center px-4 sm:px-8"
      >
        <h1 className="text-lg font-bold sm:text-2xl">
          プロフィールを編集しよう
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-7 w-full">
              <FormLabel className="text-md font-semibold">
                あなたの名前
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  variant="round"
                  borderColor="blue"
                  placeholder="name"
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
            <FormItem className="mt-12 w-full">
              <FormLabel className="text-md font-semibold">
                プロフィール画像
              </FormLabel>
              <FormControl className="text-center">
                <FileUpload onFileSelect={onFileSelect} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="upload" className="mt-9 font-semibold">
          投稿する
        </Button>
      </form>
    </Form>
  );
}
