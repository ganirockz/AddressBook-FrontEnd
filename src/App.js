import './App.css';
import AddressbookForm from './components/addressbook-form/addressbook-form';
import HomePage from '../../addressbook/src/components/addressbook-home/home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/addressbook">
          <AddressbookForm />
        </Route>
        <Route exact path="/addressbook/:id">
          <AddressbookForm />
        </Route>
        <Route exact path="">
          <Redirect exact from="/" to="/home" />
        </Route>
        </Switch>  
      </Router>
    </div>
  );
}

export default App;
