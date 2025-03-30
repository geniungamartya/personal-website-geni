import { createFileRoute } from "@tanstack/react-router";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export const Route = createFileRoute("/_layout/blog/editor")({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = useState("**Hello World!**");

  return (
    <div className="flex flex-col">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Markdown Editor
        </h1>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <MDEditor
            value={value}
            onChange={(val) => setValue(val ?? "")}
            className="min-h-[300px]"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
          Preview
        </h2>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    </div>
  );
}
