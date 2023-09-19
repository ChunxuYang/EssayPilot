"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    content: ``,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert h-full w-full m-10 focus:outline-none",
      },
    },
  });

  return (
    <div className="border rounded-lg shadow-sm h-full">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
