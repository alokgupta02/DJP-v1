import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { getAuthToken } from "../../../features/issues/issuesApi";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  onRemove?: () => void;
  currentUrl?: string;
  accept?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({ onUpload, onRemove, currentUrl, accept = "image/*", maxSizeMB = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => inputRef.current?.click();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large (max ${maxSizeMB}MB)`);
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = await getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/djp/api/v1/uploads", {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      onUpload(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
      {currentUrl ? (
        <div className="relative inline-block rounded-xl overflow-hidden border border-[var(--color-border)]">
          <img src={currentUrl} alt="Upload" className="max-h-48 object-cover rounded-xl" />
          <button
            type="button"
            onClick={() => { onRemove?.(); }}
            className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSelect}
          disabled={uploading}
          className="flex items-center justify-center gap-2 h-24 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-subtle)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-light)]/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          {uploading ? (
            <><Loader2 className="animate-spin" size={18} /> <span className="text-sm">Uploading...</span></>
          ) : (
            <><Upload size={18} className="text-[var(--color-text-secondary)]" /> <span className="text-sm text-[var(--color-text-secondary)]">Upload Image</span></>
          )}
        </button>
      )}
      {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
