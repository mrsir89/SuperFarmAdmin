import { combineReducers } from 'redux';
import   authentication   from './authentication.reducer';


const rootReducers = combineReducers({
    auth: authentication

  });

export default rootReducers;
