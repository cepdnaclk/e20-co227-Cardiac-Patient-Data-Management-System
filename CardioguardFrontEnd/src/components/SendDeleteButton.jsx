import { useState } from "react";

const SendDeleteButton = () => {
  const [data] = useState({
    key1: "value1",
    key2: "value2",
    // other key-value pairs
  });

  const handleSend = () => {
    // Convert data to JSON and create a Blob
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });

    // Generate a unique filename based on a timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `data_file_${timestamp}.json`;

    // Create a link element, set the download attribute with a filename, and trigger a click to download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename; // Just the filename, no path
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex space-x-4">
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-700 transition duration-300"
        onClick={handleSend}
      >
        <span>Send</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.94 17.06a1.5 1.5 0 002.12 0l2.83-2.83a1.5 1.5 0 00-2.12-2.12l-2.83 2.83a1.5 1.5 0 000 2.12zm14.12-14.12a1.5 1.5 0 00-2.12 0l-8.48 8.48a1.5 1.5 0 102.12 2.12l8.48-8.48a1.5 1.5 0 000-2.12zm-.71-.71a2.5 2.5 0 013.54 3.54l-8.48 8.48a2.5 2.5 0 01-3.54-3.54l8.48-8.48z" />
        </svg>
      </button>
    </div>
  );
};

export default SendDeleteButton;
