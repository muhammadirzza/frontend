import { combineReducers } from 'redux';
import Authreducers from './authreducers';

export default combineReducers({
    Auth:Authreducers
})