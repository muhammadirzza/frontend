import { combineReducers } from 'redux';
import Authreducers from './authreducers';
import Headerreducers from './Headerreducers';
import Totalcartreducers from './totalcartreducers';
import Signupreducers from './Signupreducers';
import Forgotpassreducers from './ForgotpassReducers'

export default combineReducers({
    Auth:Authreducers,
    Header:Headerreducers,
    Total:Totalcartreducers,
    Sign:Signupreducers,
    Forgot:Forgotpassreducers
})