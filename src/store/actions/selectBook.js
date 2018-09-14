import { SELECT_BOOK } from './actionTypes';
export const selectBook= (bookId,title,author,description,cover) => {
    //console.warn("inside the function selectBook")
    return {
        type: SELECT_BOOK,
        bookId:bookId,
        title:title,
        author:author,
        description:description,
        cover:cover
        


    };
}