import { DELETE_BOOKMARK } from './actionTypes';
export const deleteBookmark= (bookId) => {
    //console.warn("inside delete bookmark",bookId)
    return {
        type:DELETE_BOOKMARK,
        bookId:bookId
        
        


    };
}