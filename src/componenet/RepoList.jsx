import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'http://api.github.com/users/samueluchee/repos'
      );
      setRepos(response.data);
    };

    fetchData();
  }, []);

  // Pagination
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos
    .filter(repo => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>GitHub Repositories</h1>
      <input
        type="text"
        placeholder="Search by repo name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {currentRepos.map(repo => (
          <li key={repo.id}>
            <Link to={`/repos/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ reposPerPage, totalRepos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RepoList;