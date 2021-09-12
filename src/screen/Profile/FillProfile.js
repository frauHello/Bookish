import React, { Component } from 'react';
import { StyleSheet, View,ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import ProfileImage from '../../components/EditProfile/ProfileImage';
import { imageEdited } from '../../store/actions/index';
import { connect } from 'react-redux';
import { addfield } from '../../store/actions/index';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import firebase from 'react-native-firebase';
import { Icon, Header } from "react-native-elements";

class FillProfile extends Component {

  state = {
    name: "",
    phoneNumber: "",
    imagestat: {
      image: '',
      valid: false
    },

    profileUrl: "",
    visible: false

  };

  imageEditedHandler = image => {
    this.setState({
      imagestat: {
        image: image,
        valid: true
      }

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

  editProfileHandler = () => {
    this.setState({visible:true})
    if (this.state.name.trim() !== "") {
      this.props.onEditfield(this.state.name, "name");

    }

    if (this.state.phoneNumber.trim() !== "") {
      this.props.onEditfield(this.state.phoneNumber, "phoneNumber");
    }
    if (this.state.imagestat.image.trim() !== "") {
      this.props.onImageEdited(this.state.imagestat.image)
    }
    const { currentUser } = firebase.auth();
    console.warn(currentUser.uid)
    const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
    if (this.state.imagestat.valid) {

      const storage = firebase.storage();
      const directoryRef = storage.ref('Images');
      const imageRef = directoryRef.child('ProfileImages');
      const currentRef = imageRef.child(this.state.image);
      currentRef.putFile(this.state.imagestat.image).then(() => {
      //  console.warn("profilepic in storage now", this.state.imagestat.image)
        currentRef.getDownloadURL().then((url) => {
        //  console.warn("I ve got the url from storage", url);
          this.setState({
            profileUrl: url
          });
          userRef.set({
            uid: currentUser.uid,
            profilePic: this.state.profileUrl,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber


          })
          this.props.navigation.navigate('MainTabNavigator')
        })
      });

    }
    else {
      userRef.set({
        uid: currentUser.uid,
        profilePic: '',
        name: this.state.name,
        phoneNumber: this.state.phoneNumber
      })
      this.props.navigation.navigate('MainTabNavigator')

    }
  }




  dismissHandler = () => {

    try {
      AsyncStorage.getItem('username').then((userId) => { console.warn(userId) })

    } catch (error) {
      // Error retrieving data
      console.warn(error.message);
    }






  }
  render() {
    let src = null;
    if (this.state.imagestat.image.trim() !== "") {

      src = { uri: this.state.imagestat.image };
    }
    else { src = require('../../assets/images/user_profile.png') };
    let submitButton = null;
    let rightComponent=null;
    if (this.state.visible){
      submitButton = (<ActivityIndicator />)
    }
    else{submitButton = (<View style={
      {
        backgroundColor: "#e7e7d6",
        flex: 1,
        width: "80%",
        marginLeft: "10%",

      }}>


      <CustomButton color="#357180" textcolor="#e7e7d6" onPress={this.editProfileHandler}>
        Submit  </CustomButton>
    </View>)
    
    rightComponent=( <TouchableOpacity onPress={() => { this.props.navigation.navigate('MainTabNavigator') }} >
    <View>
      < Icon
        type="entypo" size={35}
        name='cross' color='#357180'
      />
    </View>
  </TouchableOpacity>);
  
  }
    return (


      <View style={styles.container}>
        <Header
          backgroundColor="#e7e7d6"
          outerContainerStyles={{ borderBottomColor: "#e7e7d6" }}
          rightComponent={rightComponent}
        />

        <ScrollView style={{ backgroundColor: "#e7e7d6" }}>
          <View style={styles.modalContainer} >
            <ProfileImage
            word='Add'
              source={src}
              onImagePicked={this.imageEditedHandler} />

            <KeyboardAvoidingView style={styles.parts} behavior="padding">

              <Fumi
                label={'Name'}
                iconClass={FontAwesomeIcon}
                iconName={'user-circle-o'}
                iconColor={'#357180'}
                iconSize={30}
                onChangeText={this.nameChanged}
               // defaultValue={this.props.name}
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
                    color: "#757468"
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
              //  defaultValue={this.props.phoneNumber}
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
                    color: "#757468"
                  }
                }
              />




            </KeyboardAvoidingView>
          </View>

          {submitButton}
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
  },
  Image: {

    alignSelf: 'center',
    height: 40,
    marginRight: 40


  },


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
    image: state.profile.image,
    flogin: state.profile.flogin



  };

};

export default connect(mapStateToProps, mapDispatchToProps)(FillProfile);

