import EditProfileItem from '../../components/UI/EditProfileItem/EditProfileItem';
import React, { Component } from 'react';
import { Icon, Header } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProfileImage from '../../components/EditProfile/ProfileImage';
import { imageEdited } from '../../store/actions/index';
import { connect } from 'react-redux';
import { addfield } from '../../store/actions/index';


class EditProfile extends Component {
  
  state = {
    name: "",
    phoneNumber: "",
    bio: "",
    gender: "",
    homeTown: "",
    education: "",
    facebook: "",
    email2:"",
    
    imagestat: {
      value: null,
      valid: false
    }


  };

  imageEditedHandler = image => {
    this.setState({
      imagestat:{
            value: image,
            valid: true
          }
        } 
     );
     this.props.onImageEdited(image);


  }
  emailChanged = val => {

    this.setState({
      email2: val

    });
  }
  nameChanged = val => {

    this.setState({
      name: val

    });
  }
  phoneChanged = val => {

    this.setState({
      phoneNumber: val

    });
  }
  bioChanged = val => {

    this.setState({
      bio: val

    });
  }
  genderChanged = val => {

    this.setState({
      gender: val

    });
  }
  homeTownChanged = val => {

    this.setState({
      homeTown: val

    });
  }
  educationChanged = val => {

    this.setState({
      education: val

    });
  }
  facebookChanged = val => {

    this.setState({
      facebook: val

    });
  }
  editProfileHandler = () => {
    if (this.state.name.trim() !== "") {
      this.props.onEditfield(this.state.name, "name");

    }
    if (this.state.facebook.trim() !== "") {
      this.props.onEditfield(this.state.facebook, "facebook");

    }
    if (this.state.education.trim() !== "") {
      this.props.onEditfield(this.state.education, "education");

    }
    if (this.state.homeTown.trim() !== "") {
      this.props.onEditfield(this.state.homeTown, "homeTown");

    }
    if (this.state.gender.trim() !== "") {
      this.props.onEditfield(this.state.gender, "gender");

    }
    if (this.state.bio.trim() !== "") {
      this.props.onEditfield(this.state.bio, "bio");

    }
    if (this.state.phoneNumber.trim() !== "") {
      this.props.onEditfield(this.state.phoneNumber, "phoneNumber");

    }
    if (this.state.email2.trim() !== "") {
      this.props.onEditfield(this.state.email2, "email2");

    }
  }

  render() {
    let src=null;
    if(this.props.flogin){
     
      src={uri:this.props.image};
    }
    else{src =this.props.image
      
  
    };


    return (

      <View style={styles.modal}>
        <Header
          backgroundColor="#bb5538"

          rightComponent={(
            <TouchableOpacity onPress={this.editProfileHandler}
            //this.props.navigation.goBack()
            //console.warn(this.props.name)
            >
              <Icon

                name="ios-cloud-done"
                type='ionicon'
                color="#e7e7d6"
                size={35}


              />

            </TouchableOpacity>

          )}

          centerComponent={
            <Text style={styles.Text}>Edit Profile</Text>
          }
          leftComponent={(
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon

                name="trash-2"
                type='feather'
                color="#e7e7d6"
                size={35}

              />
            </TouchableOpacity>
          )}


        />
        <ScrollView >
          <View style={styles.modalContainer} >
            <ProfileImage  setImage={src} onImagePicked={this.imageEditedHandler}/>
             
          
            <View style={styles.parts}>
              {/* <View style={styles.Heading}>
                <Icon
                  name='info'
                  type='feather'
                  color='#bb5538'
                />
                <Text style={styles.head}>Basic Info</Text>
              </View> */}
              <EditProfileItem name='user' type='entypo' color="#27636d" onChangeText={this.nameChanged}defaultValue={this.props.name}>Name</EditProfileItem>
              <EditProfileItem name='man' type='entypo' color="#27636d" onChangeText={this.genderChanged} defaultValue={this.props.gender}>Gender</EditProfileItem>
              <EditProfileItem name='heart-outlined' type='entypo' color="#27636d" onChangeText={this.bioChanged}defaultValue={this.props.bio}>Bio</EditProfileItem>
              <EditProfileItem name='university' type='font-awesome' color="#27636d" onChangeText={this.educationChanged} defaultValue={this.props.education}>Education</EditProfileItem>
              <EditProfileItem name='location' type='entypo' color="#27636d" onChangeText={this.homeTownChanged}defaultValue={this.props.homeTown} >Home town</EditProfileItem>

            </View>

            <View style={styles.parts}>

              <View style={styles.Heading}>
                <Icon
                  name='globe'
                  type='feather'
                  color='#bb5538'
                />
                <Text style={styles.head}>Contact Info</Text>
              </View>
              <EditProfileItem name='mobile' type='entypo' color="#27636d" keyboardType="numeric"  onChangeText={this.phoneChanged} defaultValue={this.props.phoneNumber}>Phone</EditProfileItem>
              <EditProfileItem name='mail' type='entypo' color="#27636d" keyboardType="email-address" onChangeText={this.emailChanged} defaultValue={this.props.email2}>E-mail</EditProfileItem>
              <EditProfileItem name='facebook' type='feather' color="#27636d"  onChangeText={this.facebookChanged}defaultValue={this.props.facebook}>Facebook</EditProfileItem>

            </View>
          </View>
        </ScrollView>


      </View>









    );
  }
}



const styles = StyleSheet.create({


  container: {
    flex: 1,

    backgroundColor: "#e7e7d6",




  },
  parts: {

    marginTop: 30,
    marginBottom: 30,


  },
  horizontal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5




  },
  modal: {

    justifyContent: 'center',
    backgroundColor: "#e7e7d6",
    // alignItems: 'center',



  },
  modalContainer: {
    width: "100%"

  },
  Heading: {
    flexDirection: "row",
    alignItems: "flex-start"
  },

  icon: {

    width: "30%"
  },
  header: {

    flex: 1,
    alignItems: "center"
  },

  Image: {

    alignSelf: 'center',

    height: 40

  },
  infoSet: {
    marginTop: 15


  },

  info: {


    width: "90%",
    fontSize: 15,

    color: "#27636d",



  },

  profileCover: {

    backgroundColor: "#bb5538",
    flex: 1
  },
  Text: {
    fontSize: 20,
    color: "#e7e7d6",
    fontWeight: "bold"
  },
  buttonView: {
    backgroundColor: "#e7e7d6",
    alignItems: "center"

  },
  head: {
    color: "#bb5538",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5
  }


});
function mapDispatchToProps(dispatch) {
  return {

    onImageEdited: (image) => dispatch(imageEdited(image)),
    onEditfield: (value, field) => dispatch(addfield(value,field))



  };
};
const mapStateToProps = state => {
  return {

    email: state.profile.email,
    name: state.profile.name,
    phoneNumber: state.profile.phoneNumber,
    bio: state.profile.bio,
    gender: state.profile.gender,
    homeTown: state.profile.homeTown,
    education: state.profile.education,
    facebook: state.profile.facebook,
    image:state.profile.image,
    flogin:state.profile.flogin
    


  };

};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

