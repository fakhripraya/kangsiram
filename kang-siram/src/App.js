import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchAppBar from './Components/Navigation/SearchAppBar';
import BottomNavigation from './Components/Navigation/BottomNavigation';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PlotAddress from './Pages/PlotAddress';
import PVUBot from './Pages/PVUBot';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function SimpleContainer() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router history={history}>
          <SearchAppBar />
          <Switch>
            <Route path='/' exact component={PlotAddress} />
            {/* <Route path='/bot' exact component={PVUBot} /> */}
          </Switch>
          <br />
          <BottomNavigation />
        </Router>
      </Container>
    </Fragment>
  );
}


function App() {
  return (
    <SimpleContainer />
  );
}

export default App;
