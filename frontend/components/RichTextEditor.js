"use client";

import { useRef, useState, useEffect } from "react";

export default function RichTextEditor({ value = "", onChange, placeholder }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value === "" && editorRef.current.innerHTML !== "") {
      editorRef.current.innerHTML = "";
    }
  }, [value]);

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateContent();
  };

  // Fix for execCommand
  useEffect(() => {
    // Enable contentEditable formatting
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }, []);

  return (
    <div className="border border-gray-300 bg-white">
      {/* Toolbar */}
      <div className="flex gap-2 border-b border-gray-200 px-3 py-2 bg-gray-50">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format('bold');
          }}
          className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format('italic');
          }}
          className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200 italic"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format('underline');
          }}
          className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200 underline"
        >
          U
        </button>
        <span className="text-gray-300 mx-1">|</span>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format('insertUnorderedList');
          }}
          className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
        >
          •
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format('insertOrderedList');
          }}
          className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
        >
          1.
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onKeyUp={updateContent}
        className="min-h-[120px] p-3 text-gray-800 outline-none"
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        [contenteditable] b, [contenteditable] strong { font-weight: 700; }
        [contenteditable] i, [contenteditable] em { font-style: italic; }
        [contenteditable] u { text-decoration: underline; }
        [contenteditable] ul { list-style: disc; padding-left: 1.5rem; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.5rem; }
      `}</style>
    </div>
  );
}