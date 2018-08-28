import { ADD_FIELD } from './actionTypes';
export const addfield = (value, field) => {
    //console.warn("inside the function addfield")
    return {
        type: ADD_FIELD,
        field: field,
        value: value


    };
}