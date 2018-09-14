import EditProfileItem from '../../components/UI/EditProfileItem/EditProfileItem';
import React, { Component } from 'react';
import { Icon, Header } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import ProfileImage from '../../components/EditProfile/ProfileImage';
import { imageEdited } from '../../store/actions/index';
import { connect } from 'react-redux';
import { addfield } from '../../store/actions/index';
import AnimatedHeader from 'react-native-animated-header';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import firebase from 'react-native-firebase';
class EditProfile extends Component {




  state = {
    name: "",
    phoneNumber: "",
    imagestat: {
      value: null,
      valid: false
    },
    profileUrl:""


  };

  imageEditedHandler = image => {
    this.setState({
      imagestat: {
        value: image,
        valid: true
      }
    }
    );
    this.props.onImageEdited(image);
    


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

  editProfileHandler = () => {
    if (this.state.name.trim() !== "") {
      this.props.onEditfield(this.state.name, "name");

    }

    if (this.state.phoneNumber.trim() !== "") {
      this.props.onEditfield(this.state.phoneNumber, "phoneNumber");
    }
    const { currentUser } = firebase.auth();
  //  console.warn(currentUser.uid)
    const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
    if (this.state.imagestat.valid){
  //  console.warn(this.state.imagestat.value.uri)
    this.uploadImage(this.state.imagestat.value.uri)
    

    }

    userRef.update({
      phoneNumber: this.state.phoneNumber,
      name: this.state.name

    })
  }

  uploadImage = (uri) => {
    const storage = firebase.storage();
    const directoryRef = storage.ref('Images');
    const imageRef = directoryRef.child('ProfileImages');
    const currentRef = imageRef.child(uri);
    currentRef.putFile(uri).then(() => {
  //   console.warn("profilepic in firestore now", uri)
      currentRef.getDownloadURL().then((url) => {
   //    console.warn("I ve got the url from firestore", url);
        this.setState({
          profileUrl: url
        }
        );
      })
    });
}


dismissHandler=()=>{






}
  render() {
    let src = null;
    if (this.props.flogin) {

      src = { uri: this.props.image };
    }
    else { src = this.props.image };


    return (
     //     leftComponent={(
      //       <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
      //         <Icon

     

      <AnimatedHeader
        style={styles.container}

        // title='Fill your profile'
        renderLeft={() => (<Image
          style={{ width: 50, height: 60 }}
          source={require('../../assets/images/editProfile.png')} />)}
        backStyle={{ marginLeft: 80, marginRight: 100 }}
        titleStyle={{ fontSize: 30, left: 1, bottom: 20, color: '#357180' }}
        headerMaxHeight={80}
        imageSource={require('../../assets/images/fill.png')}
        toolbarColor='#e7e7d6'
        disabled={true}
      >

        <ScrollView style={{ backgroundColor: "#e7e7d6" }}>
          <View style={styles.modalContainer} >
            <ProfileImage setImage={src} onImagePicked={this.imageEditedHandler} />

            <KeyboardAvoidingView>
              <View style={styles.parts}>

                <Fumi
                  label={'Name'}
                  iconClass={FontAwesomeIcon}
                  iconName={'user-circle-o'}
                  iconColor={'#357180'}
                  iconSize={30}
                  onChangeText={this.nameChanged}
                  defaultValue={this.props.name}
                  style={
                    {
                      backgroundColor: "#e7e7d6",
                      borderColor: "#357180",
                      borderWidth: 1,
                      elevation: 3

                    }
                  }
                  labelStyle={
                    {
                      color: "#357180"
                    }
                  }
                  inputStyle={
                    {
                      color: "#b9b9ba"
                    }
                  }

                />
                <Fumi
                  label={'Phone Number'}
                  iconClass={FontAwesomeIcon}
                  iconName={'phone'}
                  iconColor={'#357180'}
                  iconSize={30}
                  onChangeText={this.phoneChanged}
                  keyboardType="numeric"
                  defaultValue={this.props.phoneNumber}
                  style={
                    {
                      backgroundColor: "#e7e7d6",
                      marginTop: 20,
                      borderColor: "#357180",
                      borderWidth: 1,
                      elevation: 3
                    }
                  }
                  labelStyle={
                    {
                      color: "#357180"
                    }
                  }
                  inputStyle={
                    {
                      color: "#b9b9ba"
                    }
                  }
                />


              </View>

            </KeyboardAvoidingView>
          </View>
          <View style={
            {
              backgroundColor: "#e7e7d6",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
              marginLeft: "10%",

            }}>
            <CustomButton color="#357180" textcolor="#e7e7d6" onPress={this.dismissHandler}>
              Dismiss </CustomButton>

            <CustomButton color="#357180" textcolor="#e7e7d6" onPress={this.editProfileHandler}>
              Submit  </CustomButton>
          </View>

        </ScrollView>


      </AnimatedHeader>









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
    width: '80%',
    justifyContent: "center",
    marginLeft: "10%"


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
    width: "100%",
    backgroundColor: "#e7e7d6"

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
    onEditfield: (value, field) => dispatch(addfield(value, field))



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
    image: state.profile.image,
    flogin: state.profile.flogin



  };

};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

