import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogs';
import notificationReducer from './reducers/notification';
import userReducer from './reducers/user';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
});

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;