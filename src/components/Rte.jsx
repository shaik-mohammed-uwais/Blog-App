import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function Rte({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={conf.tinymceApikey}
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "media",
                  "table",
                  "preview",
                  "visualblocks",
                  "wordcount",
                  "fullscreen",
                  "code",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "insertdatetime",
                  "help",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | preview code fullscreen | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
