import { combineReducers } from "redux";
import loginReducer from "./login";

// Kết hợp nhiều reducers thành một root reducer
const allReducers = combineReducers({
    loginReducer
    // Có thể thêm nhiều reducers khác ở đây nếu cần,

});

export default allReducers;
