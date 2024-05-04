'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FileUpload } from '@/app/(authenticated)/post/fileUpload';
import { createPost } from '@/features/actions/post';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_MB } from '@/features/const/validation';
import { Button } from '@/features/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/features/ui/form';
import { Input } from '@/features/ui/input';
import { Textarea } from '@/features/ui/textarea';

const isFileSupported = typeof File !== 'undefined';
const hashTagWords = z
  .string()
  .regex(
    /^#([\p{L}\p{N}_]+)(\s+#[\p{L}\p{N}_]+)*$/u,
    "各単語は'#'で始まり、単語はスペースで区切られます。ハッシュタグには文字と数字が使用できます"
  );

const formSchema = z.object({
  file: isFileSupported
    ? z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          `ファイルサイズが大きすぎます。${MAX_MB}MB以下のファイルを選択してください`
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'jpg, png, webpのいずれかの画像を選択してください'
        )
    : z.any().optional(),
  prompt: z.string().min(2, { message: 'promt must be at least 2 characters' }),
  imageName: z.string().min(2, { message: 'promt must be at least 2 characters' }),
  imageAge: z.string().min(1, { message: 'promt must be at least 1 characters' }),
  hashtag: hashTagWords,
});

type UploadProps = {
  userId: string;
};

export default function Upload({ userId }: UploadProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      prompt: '',
      hashtag: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('file', data.file as File);
    formData.append('imageName', data.imageName);
    formData.append('imageAge', data.imageAge);
    formData.append('prompt', data.prompt);
    formData.append('hashTag', data.hashtag);
    await createPost(formData, userId);
  });

  const onFileSelect = (file: File) => {
    form.setValue('file', file);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="mt-8 flex flex-col items-center px-4 sm:mt-8"
        >
          <h1 className="text-xl font-bold sm:text-2xl">さあ、写真をアップロードしよう</h1>
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem className="mt-6 w-full text-center sm:mt-12 flex items-center flex-col">
                <FormLabel>デスクトップから写真をドラッグできます。</FormLabel>
                <FormControl>
                  <FileUpload onFileSelect={onFileSelect} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageName"
            render={({ field }) => (
              <FormItem className="mt-4 w-full sm:mt-7 flex items-center flex-col">
                <FormLabel className="text-xl font-semibold">画像の女性の名前</FormLabel>
                <FormControl>
                  <Input type="text" variant="round" placeholder="maria" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageAge"
            render={({ field }) => (
              <FormItem className="mt-4 w-full sm:mt-7 flex items-center flex-col">
                <FormLabel className="text-xl font-semibold">画像の女性の年齢</FormLabel>
                <FormControl>
                  <Input type="text" variant="round" placeholder="22" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="mt-4 w-full sm:mt-7 flex items-center flex-col">
                <FormLabel className="text-xl font-semibold">プロンプト</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="An astronaut playing guitar at Coachella, psychodelic background, photorealistic, f1.4, 4k..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hashtag"
            render={({ field }) => (
              <FormItem className="mt-4 w-full sm:mt-7 flex items-center flex-col">
                <FormLabel className="text-xl font-semibold">ハッシュタグ</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    variant="round"
                    placeholder="#ブロンド #ブルベ #高身長"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="upload" className="mt-5 font-semibold sm:mt-9">
            投稿する
          </Button>
        </form>
      </Form>
    </>
  );
}
