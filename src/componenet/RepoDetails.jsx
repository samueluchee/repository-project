import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RepoDetails = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.github.com/repos/samueluchee/${repoName}`
      );
      setRepo(response.data);
    };

    fetchData();
  }, [repoName]);

  if (!repo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Language: {repo.language}</p>
    </div>
  );
};

export default RepoDetails;