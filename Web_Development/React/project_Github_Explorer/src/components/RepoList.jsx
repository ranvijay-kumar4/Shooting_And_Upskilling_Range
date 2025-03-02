const RepoList = ({ repos }) => {
    return (
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4 text-blue-400">Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <h4 className="text-lg font-bold text-blue-400">{repo.name}</h4>
              <p className="text-gray-400 text-sm">⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  export default RepoList;
  