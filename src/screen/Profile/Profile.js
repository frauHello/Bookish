import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import ConfirmSignOut from '../../utility/ConfirmSignOut';
import { emailAuth } from '../../store/actions/index';
import { Icon, Header, Avatar } from "react-native-elements";




class Profile extends Component {
  

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.props.onEmailAuth({ currentUser });
   

  };

  render() {
    let src=null;
    if(this.props.flogin){
     
      src={uri:this.props.image};
    }
    else{src =this.props.image
      
  
    };


    return (


      <View style={styles.container}>
        <Header
          backgroundColor="#bb5538"

          rightComponent={(
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EditProfile') }} >
              <View>
                < Icon
                  type="foundation" size={35}
                  name='page-edit' color='#e7e7d6'
                />
              </View>
            </TouchableOpacity>
          )}
          centerComponent={
            <Image style={styles.Image}
              resizeMode="cover"
              source={require('../../assets/images/cover.png')} />
          }

        />
        <View style={styles.container}>

        
          <View style={styles.ProfileImage}>
            <Avatar
              xlarge
              source={src}
              activeOpacity={0.7}
            />
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.bio}>{this.props.bio}</Text>
          </View>
          
          <View style={styles.infoSet}>
            <View style={styles.horizontal}>
              <Icon name='email' color="#bb5538" />
              <Text style={styles.info}>{this.props.email}</Text>
            </View>
            <View style={styles.horizontal}>
              <Icon name='phone' color="#bb5538" />
              <Text style={styles.info}>{this.props.phoneNumber}</Text>
            </View >
          </View >
        </View >
        <View style={styles.button}>
          <CustomButton color="#bb5538"
            textcolor="#e7e7d6"
            onPress={() => ConfirmSignOut()}>Sign Out</CustomButton>
        </View>
      </View>









    );
  }
}



const styles = StyleSheet.create({


  container: {
    flex: 1,

    backgroundColor: "#e7e7d6",




  },

  horizontal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5




  },
  ProfileImage: {
    //width: "100%",
    marginTop: 10,
    backgroundColor: "#e7e7d6",
    alignItems: "center",
    marginBottom: 5,
    justifyContent:"center"

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


  Text: {
    fontSize: 20,
    color: "#e7e7d6",
    fontWeight: "bold"
  },
  buttonView: {
    backgroundColor: "#e7e7d6",
    alignItems: "center"

  },
  name:{

    fontSize: 20,
    color: "#27636d",
    fontWeight:"bold"



  },
  bio:{

    fontSize: 14,
    color: "#27636d",
    fontStyle:"italic",
    textAlign:"center"
    


  } 


});
function mapDispatchToProps(dispatch) {
  return {
    onEmailAuth: (user) => dispatch(emailAuth(user))
   

    // onResetPassw: (requiredMail, authMode) => dispatch(resetPassw(requiredMail, authMode))
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

