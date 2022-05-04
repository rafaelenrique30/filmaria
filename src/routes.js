import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/header';

import Home from './pages/home';

import Filme from './pages/filme';

import Favoritos from './pages/favoritos';

import NotFound from './pages/erro';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/filme/:id" component={Filme} />
                <Route exact path="/favoritos" component={Favoritos} />
                <Route path="*" component={NotFound}/>
                <Route path="/filme/*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;