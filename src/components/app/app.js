import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LoginPage from '../login-page/login-page';
import CatalogPage from '../catalog-page/catalog-page';
import s from './app.module.scss'

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className={s.app}>
            <Switch>
                {!loggedIn && <Redirect from="/catalog-page" to="/" />}
                <Route path='/' exact component={(props) => <LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} {...props} />}  />
                <Route path={'/catalog-page'} component={CatalogPage} />
                <Route render={() => <h2>Page note found</h2>} />
            </Switch>
        </div>
    )
}

export default App;
