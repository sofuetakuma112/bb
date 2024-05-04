import React, {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "@/features/const/validation";
import { Icon } from "@/features/ui/icon";

interface FileUploadProps {
  onFileSelect: (file: File, previewUrl: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onFileSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (!file) return;

      if (
        ACCEPTED_IMAGE_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setPreviewUrl(result);
          onFileSelect(file, result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex w-full max-w-[500px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-blue-300">
      <div
        className="p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Icon name="plus" width="32" height="32" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="m-4 size-28 rounded-md object-cover"
        />
      )}
    </div>
  );
};
