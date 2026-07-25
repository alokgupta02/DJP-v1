import React, { useRef, useState, useEffect } from "react";
import {
  Link2,
  Image as ImageIcon,
  List,
  ListOrdered,
  AlertCircle,
  Table,
  MoreHorizontal,
} from "lucide-react";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichEditor({ 
  value, 
  onChange, 
  placeholder = "Body text (optional)",
  minHeight = "min-h-[200px]"
}: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editorEmpty, setEditorEmpty] = useState(true);
  const [editorFocused, setEditorFocused] = useState(false);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strikeThrough: false,
    superscript: false,
    unorderedList: false,
    orderedList: false,
  });

  // Initialize content once
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
      checkEditorEmpty();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount or controlled override, but we don't want cursor jumps

  const checkEditorEmpty = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText.trim();
    const html = editorRef.current.innerHTML.trim();
    const hasTags = /<(ul|ol|li|img|blockquote|table|h[1-6])/i.test(html);
    setEditorEmpty(text === "" && !hasTags);
  };

  const checkActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      superscript: document.queryCommandState("superscript"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    });
    checkEditorEmpty();
  };

  const handleInput = () => {
    checkEditorEmpty();
    checkActiveFormats();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    checkActiveFormats();
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleInsertLink = () => {
    const url = window.prompt("Enter link URL:", "https://");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const imgHtml = `<div class="my-3"><img src="${dataUrl}" alt="Uploaded image" class="max-h-80 rounded-xl border border-[var(--color-border)] shadow-sm object-contain" /></div><br/>`;
      executeCommand("insertHTML", imgHtml);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <table class="w-full border-collapse border border-[var(--color-border)] my-3 text-sm">
        <thead>
          <tr class="bg-[var(--color-bg-subtle)]">
            <th class="border border-[var(--color-border)] p-2 text-left font-bold">Header 1</th>
            <th class="border border-[var(--color-border)] p-2 text-left font-bold">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-[var(--color-border)] p-2">Data 1</td>
            <td class="border border-[var(--color-border)] p-2">Data 2</td>
          </tr>
        </tbody>
      </table><br/>`;
    executeCommand("insertHTML", tableHtml);
  };

  const handleInsertAlert = () => {
    const alertHtml = `
      <blockquote class="border-l-4 border-[var(--color-brand)] bg-[var(--color-bg-subtle)] p-3 my-2 rounded-r text-sm font-medium">
        ℹ️ <strong>Note:</strong> Type important context here...
      </blockquote><br/>`;
    executeCommand("insertHTML", alertHtml);
  };

  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-bg-surface)] focus-within:border-[var(--color-brand)] transition-colors">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="relative p-4">
        {editorEmpty && !editorFocused && (
          <div className="absolute top-4 left-4 text-base text-[var(--color-text-secondary)] pointer-events-none select-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          onFocus={() => setEditorFocused(true)}
          onBlur={() => {
            setEditorFocused(false);
            checkEditorEmpty();
          }}
          onInput={handleInput}
          onKeyUp={checkActiveFormats}
          onMouseUp={checkActiveFormats}
          className={`w-full ${minHeight} text-base text-[var(--color-text-primary)] outline-none prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-brand)] [&_blockquote]:pl-4 [&_h3]:text-xl [&_h3]:font-bold`}
        />
      </div>

      {/* Toolbar */}
      <div className="p-2 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={handleInsertLink}
          title="Insert link"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <Link2 size={16} />
        </button>
        <button
          type="button"
          onClick={handleImageClick}
          title="Upload image"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <ImageIcon size={16} />
        </button>

        <span className="h-4 w-px bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("bold")}
          title="Bold (Ctrl+B)"
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm leading-none transition-colors cursor-pointer ${
            activeFormats.bold
              ? "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          title="Italic (Ctrl+I)"
          className={`w-8 h-8 rounded-lg flex items-center justify-center italic font-serif text-sm leading-none transition-colors cursor-pointer ${
            activeFormats.italic
              ? "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          i
        </button>
        <button
          type="button"
          onClick={() => executeCommand("strikeThrough")}
          title="Strikethrough"
          className={`w-8 h-8 rounded-lg flex items-center justify-center line-through font-semibold text-xs leading-none transition-colors cursor-pointer ${
            activeFormats.strikeThrough
              ? "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          S
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h3>")}
          title="Heading"
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs tracking-tight leading-none text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          TT
        </button>

        <span className="h-4 w-px bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          title="Bullet list"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            activeFormats.unorderedList
              ? "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          title="Numbered list"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            activeFormats.orderedList
              ? "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          <ListOrdered size={16} />
        </button>
        
        <span className="h-4 w-px bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={handleInsertAlert}
          title="Alert box"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <AlertCircle size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<blockquote>")}
          title="Quote"
          className="w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm leading-none text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          66
        </button>
        <button
          type="button"
          onClick={handleInsertTable}
          title="Insert table"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <Table size={16} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertHorizontalRule")}
          title="Insert divider"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
