import React from 'react';
import FroalaEditor from "react-froala-wysiwyg";
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Import Froala's CSS
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js'; // Ensure all required plugins are loaded

const Editor = ({ value, onChange }) => {
  const config = {
    placeholderText: 'Mô tả',
    imageUpload: true, // Allow image upload
    imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove', 'link'], // Enable image editing buttons
    pluginsEnabled: ['image', 'link', 'lists', 'paragraphFormat'], // Enable image plugin
    events: {
      'froalaEditor.image.beforeUpload': (e, editor, $img) => {
        // You can handle custom image upload logic here if needed
        // For now, we are using the default upload behavior.
        return true; // Allow upload to continue
      }
    }
  };

  return (
    <div>
      <FroalaEditor
        tag="textarea"
        value={value}
        onModelChange={onChange}
        config={config}
      />
    </div>
  );
};

export default Editor;
