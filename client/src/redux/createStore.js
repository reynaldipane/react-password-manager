import { 
  createStore, 
  applyMiddleware,
  combineReducers 
} from 'redux';
// import reducers from './reducer';
import thunk from 'redux-thunk';
import signInReducer from './signin/signin.reducer'

const reducers = combineReducers({
  signInReducer: signInReducer,
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store