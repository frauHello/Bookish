import { EMAIL_AUTH } from "../actions/actionTypes";
import {AsyncStorage} from 'react-native';
import { PROFILE_IMAGE_EDIT } from "../actions/actionTypes";
import { SAVE_IN_REDUX } from "../actions/actionTypes";
import { ADD_FIELD } from "../actions/actionTypes";
const initialState = {

    email: "",
    name: "",
    // image:require('../../assets/images/user_profile.png'),
    image:'',
    phoneNumber: "",
    bio: "",
    gender: "",
    homeTown: "",
    education: "",
    facebook: "",
    email2: "",
    flogin: false

};
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case EMAIL_AUTH:


            return {
                ...state,
                email: action.email


            };
        case PROFILE_IMAGE_EDIT:

        if (action.image) {
            AsyncStorage.setItem('profileImage',action.image);
          }
            return {
                ...state,
                flogin: false,
                image: action.image




            };


        case SAVE_IN_REDUX:
        if (action.name) {
            AsyncStorage.setItem('username',action.name);
          } 
          if (action.image) {
            AsyncStorage.setItem('profileImage',action.image);
          }
            return {
                ...state,

                name: action.name,
                image: action.image,
                flogin: true


            };
        case ADD_FIELD:
            
            switch (action.field) {
                case "name":
                if (action.value) {
                    AsyncStorage.setItem('username',action.value);
                  }
                    return {
                        ...state,
                        name: action.value
                    };
                case "phoneNumber":
                if (action.value) {
                    AsyncStorage.setItem('phoneNumber',action.value);
                  }
                    return {
                        ...state,
                        phoneNumber: action.value
                    };



            }


        default: return state;
    }


};
export default profileReducer;