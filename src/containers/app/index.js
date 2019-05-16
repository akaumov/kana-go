import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from "../home";
import TrainingPage from "../training";
import KanaTablePage from "../kana-table";
import NotFoundPage from "../404";

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
                        path={'/kana-table/:characterType/:characterId'}
                        component={KanaTablePage}
                    />
                    <Route
                        exact
                        path={'/kana-table/:characterType'}
                        component={KanaTablePage}
                    />
                    <Route
                        exact
                        path='/training/:dialogId'
                        component={TrainingPage}
                    />
                    <Route
                        exact
                        path='/training'
                        component={TrainingPage}
                    />
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;