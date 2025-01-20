import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({text}) {
  const [ReactQuill, setReactQuill] = useState(null);
  const [value, setValue] = useState(text);

  useEffect(() => {
    // Dynamically import ReactQuill for client-side usage
    (async () => {
      const { default: Quill } = await import('react-quill');
      setReactQuill(() => Quill); // Ensure the imported component is correctly set
    })();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Header dropdown
      ['bold', 'italic', 'underline', 'strike'], // Formatting buttons
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], // Alignment
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['link', 'image'], // Links and images
      ['clean'], // Clear formatting
    ],
  };


  if (!ReactQuill) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div>
      <style>
        {`
          @import url('https://cdn.quilljs.com/1.3.6/quill.snow.css');
        `}
      </style>
      <ReactQuill
        value={value}
        onChange={setValue}
        theme="snow" 
        modules={modules} 
/>
    </div>
  );
}