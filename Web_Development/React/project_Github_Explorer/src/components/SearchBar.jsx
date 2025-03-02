import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        placeholder="Enter GitHub username..."
        className="p-2 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-600"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
