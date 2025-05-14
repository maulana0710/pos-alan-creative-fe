"use client";

import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const MAX_SIZE = 5 * 1024 * 1024;

const ImageUploadDropzone = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue("image", file, { shouldValidate: true });

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: MAX_SIZE,
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Gambar Menu</label>
      <div
        {...getRootProps()}
        className={`flex justify-center items-center px-4 py-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          }
          ${errors.image ? "border-red-500" : ""}
        `}
      >
        <input
          {...register("image", { required: "Image is required" })}
          {...getInputProps()}
        />
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={80}
            height={80}
            className="max-h-40 rounded-md object-cover"
          />
        ) : (
          <p className="text-gray-500 text-sm text-center">
            Drag & drop an image here, or click to select one
            <br />
            <span className="text-xs text-gray-400">
              Max size 5MB. JPG, PNG, JPEG
            </span>
          </p>
        )}
      </div>
      {typeof errors.image?.message === "string" && (
        <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
      )}
    </div>
  );
};
export default ImageUploadDropzone;
