import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import toast, { Toaster } from "react-hot-toast";

export interface BlockDetectionOptions {
  timeout: number;
}

export interface BlockDetectionStorage {
  blocking: boolean;
  timeoutId: NodeJS.Timeout | null;
}

const BlockDetection = Extension.create<
  BlockDetectionOptions,
  BlockDetectionStorage
>({
  name: "blockDetection",

  addOptions() {
    return {
      timeout: 20000,
    };
  },

  addStorage() {
    return {
      blocking: true,
      timeoutId: null,
    };
  },

  onUpdate() {
    console.log("onUpdate");
    this.storage.blocking = false;

    if (this.storage.timeoutId) {
      console.log("clearing timeout");
      clearTimeout(this.storage.timeoutId);
    }

    this.storage.timeoutId = setTimeout(() => {
      console.log("setting blocking");
      toast.error("You are blocked!");
      this.storage.blocking = true;

      this.editor?.chain().focus().run();
    }, this.options.timeout);
  },
});

export default BlockDetection;
