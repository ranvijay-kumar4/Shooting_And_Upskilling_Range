const UserCard = ({ user }) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mt-5">
        <img src={user.avatar_url} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-400" />
        <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
        <p className="text-gray-400">{user.bio}</p>
        <p className="text-sm mt-2">📍 {user.location || "Not Available"}</p>
        <p className="text-sm">🏢 {user.company || "Not Available"}</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub Profile
          </a>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  