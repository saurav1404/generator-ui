/* istanbul ignore file */
import { Header } from 'app/components/Header';
import { LazyRoute, Routes } from 'app/Routes';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Router, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as styles from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// tslint:disable-next-line:variable-name
const Homepage = React.lazy(() => import('app/activities/Homepage'));
//# lazyroute path here

const history = createBrowserHistory();
const loading = 'Loading...';

export function App() {
  return (
    <div className={styles.app}>
      <Router history={history}>
        <Header />
        <Switch>
          <LazyRoute component={Homepage} fallback={loading} />
        </Switch>
      </Router>
    </div>
  );
}




