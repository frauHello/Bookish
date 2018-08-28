import{ createStore, combineReducers,compose,applyMiddleware} from'redux';
import thunk from "redux-thunk";
import uiReducer from "./reducers/ui"; 
import profileReducer from "./reducers/profile";
//import promise from 'redux-promise-middleware'

const rootReducer=combineReducers({

 ui: uiReducer,
profile:profileReducer
 });

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

};

export default configureStore;
