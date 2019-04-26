import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../home";
import PracticePage from "../practice";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={HomePage}
                    />
                    <Route
                        exact
                        path='/practice'
                        component={PracticePage}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;