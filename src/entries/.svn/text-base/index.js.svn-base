import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, createMemoryHistory } from 'react-router';
import store from '../store';
import Archives from '../pages/Archives';
import Featured from '../pages/Featured';
import Layout from '../layouts/Layout';
import IndexPage from '../pages/IndexPage ';
import '../../node_modules/antd/dist/antd.less';

const app = document.getElementById('app');
const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={Layout}>
        <IndexRoute component= {IndexPage} />
        <Route path="archives(/:article)" name="archives" component={Archives} />
        <Route path="featured" name="featured"component={Featured} />
      </Route>
    </Router>
  </Provider>,
app);

// <Route path="archives(/:article)" name="archives" component={Archives} />
// <Route path="featured" name="featured"component={Featured} />
// <Route path="testform" name="testform"component={TestForm} />
