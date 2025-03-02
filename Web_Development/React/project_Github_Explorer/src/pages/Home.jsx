import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";

const Home = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const fetchGitHubData = async (username) => {
    setError("");
    try {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated`);

      setUser(userRes.data);
      setRepos(repoRes.data);
    } catch {
      setError("User not found. Try another username.");
      setUser(null);
      setRepos([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">GitHub Explorer</h1>
      <SearchBar onSearch={fetchGitHubData} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {user && <UserCard user={user} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
};

export default Home;
