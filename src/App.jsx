
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import RepoList from './componenet/RepoList';
import RepoList from './componenet/RepoList';
import RepoDetails from './componenet/RepoDetails';
import NotFound from './componenet/pages/NotFound';
import ErrorBoundary from './componenet/ErrorBoundary';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route exact path="/" component={RepoList} />
          <Route path="/repos/:repoName" component={RepoDetails} />
          <Route component={NotFound} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
