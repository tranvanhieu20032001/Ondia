import "froala-editor/css/froala_style.min.css";

import "froala-editor/css/froala_editor.pkgd.min.css";

// Load all plugins
import "froala-editor/js/plugins.pkgd.min.js";

// Require Editor CSS files.
import FroalaEditor from "froala-editor";

// Đảm bảo bạn đã cài các plugin cần thiết của Froala
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/image.min.js";

const FroalaEditorText = ({ value, onChange }) => {
    let config = {
        heightMin: 300,
        events: {
          contentChanged: function (e, editor) {
            console.log("test");
          }
        }
      };
  const handleModelChange = (newValue) => {
    onChange(newValue); // Gọi callback onChange với giá trị mới
  };

  return (
    <div>
         <FroalaEditor tag="textarea" model={value} config={config} onModelChange={handleModelChange(value)} />
      {/* <FroalaEditorComponent
        tag="textarea"
        model={value}
        onModelChange={handleModelChange}
        config={{
          placeholderText: "Start descriptions",
          pluginsEnabled: ["image", "markdown"], // Bật plugin Image và Markdown
          toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "alignLeft",
            "alignCenter",
            "insertHR",
            "image",
            "markdown",
          ],
          imageUploadURL: "/upload_image", // URL để upload ảnh
          imageManagerLoadURL: "/get_images", // URL để lấy ảnh từ server
          markdown: true, // Bật tính năng hỗ trợ Markdown
        }}
      /> */}
    </div>
  );
};

export default FroalaEditorText;
