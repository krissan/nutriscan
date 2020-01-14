import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar   from './components/layout/Navbar';
import Landing  from './components/layout/Landing';
import Register from './components/auth/Register';
import Login    from './components/auth/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from './components/layout/Alert';
import Diary from './components/diary/Diary';
import CreateMeallist from './components/meal-form/CreateMeallist';
import AddPantry from './components/pantry/AddPantry';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <Provider store={store}>
        <Router>
        <Fragment>
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className="container block">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/diary" component={Diary} />
              <PrivateRoute exact path="/create-meallist" component={CreateMeallist} />
              <PrivateRoute exact path="/add-pantry" component={AddPantry} />
            </Switch>
          </section>
          </Fragment>
        </Router>
      </Provider>
)};

export default App;
