import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import ConfirmSignOut from '../../utility/ConfirmSignOut';
import { emailAuth } from '../../store/actions/index';
import { Icon, Header, Avatar } from "react-native-elements";
import { addfield } from '../../store/actions/index';
import { imageEdited } from '../../store/actions/index';

class Profile extends Component {

 
  componentDidMount() {
  const { currentUser } = firebase.auth();
  this.props.onEmailAuth({ currentUser });
  }
componentWillMount(){
const { currentUser } = firebase.auth();
 const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
 userRef.get().then((doc)=> {
    if (doc.exists) {
     const{name,phoneNumber,profilePic}=doc.data();
    //  console.warn(name, profilePic,phoneNumber)
     this.props.onEditfield(name,"name")
     this.props.onEditfield(phoneNumber,"phoneNumber")
     this.props.onImageEdited(profilePic)
   
      
    } else {
         // doc.data() will be undefined in this case
         //console.warn("No such document!");
    }
 }).catch(function(error) {
     console.warn("Error getting document:", error);
 });
}


  render() {
    let src =null;
    if (this.props.image.trim() !== "") {

      src ={uri:this.props.image};
    }
    else 
     {src =require('../../assets/images/user_profile.png')};
    const admin = "yamama@hotmail.com";
    let Reports = null;
    let isAdmin = (this.props.email === admin)
    if (isAdmin) {

      Reports = (
        <CustomButton color="#bb5538" textcolor="#e7e7d6" onPress={()=>this.props.navigation.navigate('Reports')}>
          View Reports
</CustomButton>


      );



    }

    return (


      <View style={styles.container}>
        <Header
          backgroundColor="#bb5538"

          rightComponent={(
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('EditProfile',{
              profilePic: this.props.image
          }) }} >
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
        


          <View style={styles.ProfileImage}>
            <Avatar
              xlarge
              source={src}
              activeOpacity={0.7}
              imageProps={{resizeMode:"stretch"}}
            />
            <Text style={styles.name}>{this.props.name}</Text>
            </View>
            <View style={{marginTop:30 ,flexDirection:"row",justifyContent:"space-between" ,marginLeft:"5%",marginRight:"5%"}}>
         <Icon name='book-open-page-variant' color="#bb5538"size={35}  containerStyle={{justifyContent:"flex-start"}} type='material-community'/>
         <Icon name='book-open-page-variant' color="#bb5538"size={35}  containerStyle={{justifyContent:"flex-end"}} type='material-community'/>
          </View>
            
          <View style={{borderColor:"#bb5538",borderWidth:3,alignSelf:"center",width:"80%",alignItems:"center",justifyContent:"center"}}>
            <View style={styles.horizontal}>
              <Icon name='email' color="#bb5538" />
              <Text style={styles.info}>{this.props.email}</Text>
            </View>
            <View style={styles.horizontal}>
              <Icon name='phone' color="#bb5538" />
              <Text style={styles.info}>{this.props.phoneNumber}</Text>
            </View >
            
          </View >
          <View style={{flexDirection:"row",justifyContent:"space-between" ,marginLeft:"5%",marginRight:"5%"}}>
         <Icon name='book-open-page-variant' color="#bb5538"size={35}  containerStyle={{justifyContent:"flex-start"}} type='material-community'/>
         <Icon name='book-open-page-variant' color="#bb5538"size={35}  containerStyle={{justifyContent:"flex-end"}} type='material-community'/>
          </View>
        <View style={{alignSelf:"center",width:"82.5%" ,position: 'absolute',
    bottom:5}}>
     
          {Reports}
          <CustomButton color="#bb5538"
            textcolor="#e7e7d6"
            
            onPress={() => ConfirmSignOut()}>Sign Out</CustomButton>
      </View >
      </View>









    );
  }
}



const styles = StyleSheet.create({


  container: {
    flex: 1,
   // alignItems:"center",
   // justifyContent:"center",
    backgroundColor: "#e7e7d6",




  },

  horizontal: {
   // width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
   
    marginBottom:5




  },
  ProfileImage: {
    //width: "100%",
    marginTop: 10,
    backgroundColor: "#e7e7d6",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "center"

  },


  Image: {

    alignSelf: 'center',

    height: 40

  },

  info: {


   // width: "90%",
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
  name: {

    fontSize: 20,
    color: "#27636d",
    fontWeight: "bold"



  }


});
function mapDispatchToProps(dispatch) {
  return {
    onEmailAuth: (user) => dispatch(emailAuth(user)),
    onEditfield: (value, field) => dispatch(addfield(value, field)),
    onImageEdited: (image) => dispatch(imageEdited(image)),
   
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

