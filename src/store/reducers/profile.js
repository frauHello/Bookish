import { EMAIL_AUTH } from "../actions/actionTypes";

import { PROFILE_IMAGE_EDIT } from "../actions/actionTypes";
import { SAVE_IN_REDUX } from "../actions/actionTypes";
import { ADD_FIELD } from "../actions/actionTypes";
const initialState = {

    email: "",
    name: "",
   // image:require('../../assets/images/user_profile.png'),
image:null,
    phoneNumber: "",
    bio: "",
    gender: "",
    homeTown: "",
    education: "",
    facebook: "",
    email2:"",
    flogin:false

};
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case EMAIL_AUTH:


            return {
                ...state,
                email: action.email


            };
        case PROFILE_IMAGE_EDIT:


            return {
                ...state,
                flogin:false,
                image: action.image




            };


        case SAVE_IN_REDUX:
       // console.warn("inside the reducer profile");
   
            return {
                ...state,
               
                name: action.name,
                image: action.image,
                flogin:true


            };
        case ADD_FIELD:
            //console.warn("inside the reducer profile");
            switch (action.field) {
                case "name":

                    return {
                        ...state,
                        name:action.value
                    };

                case "facebook":

                    return {
                        ...state,
                        facebook:action.value
                    };

                case "education":

                    return {
                        ...state,
                        education:action.value
                    };
                case "homeTown":

                    return {
                        ...state,
                        homeTown:action.value
                    };
                case "gender":

                    return {
                        ...state,
                        gender:action.value
                    };
                case "bio":

                    return {
                        ...state,
                        bio:action.value
                    };
                case "phoneNumber":

                    return {
                        ...state,
                        phoneNumber:action.value
                    };
                    case "email2":

                    return {
                        ...state,
                        email2:action.value
                    };


            }


        default: return state;
    }


};
export default profileReducer;