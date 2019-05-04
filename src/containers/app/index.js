import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../home";
import PracticePage from "../practice";
import KanaTablePage from "../kana-table";

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
                        path='/kana-table'
                        component={KanaTablePage}
                    />
                    <Route
                        exact
                        path='/kana-table/:characterId'
                        component={KanaTablePage}
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