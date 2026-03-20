import { useCallback } from "react";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: unknown) => {
      onChange(result.info.secure_url);
    },
    [onChange],
  );
  return <div></div>;
}
