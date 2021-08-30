import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogs';
import notificationReducer from './reducers/notification';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
});

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;