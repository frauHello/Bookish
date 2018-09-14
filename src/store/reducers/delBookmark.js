import { DELETE_BOOKMARK } from "../actions/actionTypes";
const initialState = {
bookId:[]


};
const bookmarkReducer = (state = initialState, action) => {

    switch (action.type) {
        case DELETE_BOOKMARK:


            return {
                ...state,
                bookId:[...state.bookId,action.bookId]
                



            };
    

        default: return state;
    }


};
export default bookmarkReducer;