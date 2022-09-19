import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const middleware = [thunk];

const rootReducer = combineReducers(
    {
        auth: authReducer
    }
)

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store