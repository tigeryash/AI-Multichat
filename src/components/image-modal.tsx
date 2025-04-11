const ImageModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md w-full shadow-lg">
        <img
          src="https://via.placeholder.com/150"
          alt="Modal Content"
          className="w-full h-auto rounded-lg"
        />
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
