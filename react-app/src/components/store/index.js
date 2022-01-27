import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import session from './session'
import albumReducer from "./album";
import photoReducer from "./photo";
import commentsReducer from './comments';
import editPhotoFormReducer from './showEditPhoto';
import editCommentFormReducer from './showEditComment';

const rootReducer = combineReducers({
  session,
  albumReducer,
  photoReducer,
  commentsReducer,
  editPhotoFormReducer,
  editCommentFormReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
