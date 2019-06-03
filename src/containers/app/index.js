import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    withRouter,
    matchPath
} from "react-router-dom";

import HomePage from "../home";
import TrainingPage from "../training";
import KanaTablePage from "../kana-table";
import NotFoundPage from "../404";
import {usePrevious} from "use-hooks";

const RouterWrapper = (App) => (props) => (
    <Router>
        {
            <App/>
        }
    </Router>
);

const withAdditionalProperties = (Component, additionalProps) => (props) => (
    <Component
        {...props}
        {...additionalProps}
    />
);

const App = (props) => {
    const {location} = props;
    const prevPath = usePrevious(location.pathname);

    const additionalProperties = {
        isOpenedFromHomePage: !!matchPath(prevPath, {
            path: '/',
            exact: true,
            strict: false
        })
    };

    return (
        <Switch>
            <Route
                exact
                path='/'
                component={withAdditionalProperties(HomePage, additionalProperties)}
            />
            <Route
                exact
                path={'/kana-table/:characterType/:characterId'}
                component={withAdditionalProperties(KanaTablePage, additionalProperties)}
            />
            <Route
                exact
                path={'/kana-table/:characterType'}
                component={withAdditionalProperties(KanaTablePage, additionalProperties)}
            />
            <Route
                exact
                path='/training/:dialogId'
                component={withAdditionalProperties(TrainingPage, additionalProperties)}
            />
            <Route
                exact
                path='/training'
                component={withAdditionalProperties(TrainingPage, additionalProperties)}
            />
            <Route component={NotFoundPage}/>
        </Switch>
    );
};

export default RouterWrapper(withRouter(App));