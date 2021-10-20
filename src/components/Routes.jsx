import {Switch, Route} from 'react-router-dom'
import Error from './Error'
import Home from './Home'
import Results from './Results'
const Routes = ({darkTheme}) => {
    return (
        <div className="p-4">
            <Switch>
                <Route exact path = "/">
                    <Home darkTheme={darkTheme}/>
                </Route>
                <Route exact path = {['/search', '/images', '/videos', '/news']}>
                    <Results/>
                </Route>
                <Route path = "*">
                    <Error/>
                </Route>
            </Switch>
        </div>
    )
}

export default Routes
