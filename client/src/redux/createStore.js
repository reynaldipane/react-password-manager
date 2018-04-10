import { 
  createStore, 
  applyMiddleware,
  combineReducers 
} from 'redux';
// import reducers from './reducer';
import thunk from 'redux-thunk';
import signInReducer from './signin/signin.reducer'
import passwordReducer from './password/password.reducer'

const reducers = combineReducers({
  signInReducer: signInReducer,
  passwordReducer: passwordReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store