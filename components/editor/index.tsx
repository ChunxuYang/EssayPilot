"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Loader2 } from "lucide-react";
import { useCompletion } from "ai/react";
import { getPrevText } from "@/lib/editor";

const BLOCK_TIMEOUT = 5000;

const Editor = () => {
  const { toast } = useToast();
  // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

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
        class: "prose dark:prose-invert h-full w-full focus:outline-none",
      },
    },

    onUpdate() {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      const timeout = setTimeout(() => {
        toast({
          title: "Seems like you are blocked",
          description: "Would you like AI to finish your sentence?",
          action: (
            <ToastAction
              altText="Try AI"
              onClick={() => {
                if (editor) {
                  complete(
                    getPrevText(editor, {
                      chars: 5000,
                    })
                  );
                }
              }}
            >
              <Sparkles />
            </ToastAction>
          ),
        });

        setFocus();
      }, BLOCK_TIMEOUT);

      timeoutId.current = timeout;
    },
  });

  const prev = useRef("");

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "essaypilot",
    api: "/api/generate",
  });

  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    if (diff) {
      editor?.commands.insertContent(diff);
    }
  }, [completion, isLoading]);

  const setFocus = () => {
    editor?.chain().focus().run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className="relative border rounded-lg shadow-sm h-full p-10 bg-card flex flex-col overflow-auto"
      onClick={setFocus}
    >
      <EditorContent editor={editor} />
      <Toaster />
    </div>
  );
};

export default Editor;
