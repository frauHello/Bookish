import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements"

var { height } = Dimensions.get('window');
var image_height = height / 4;


class ProfileImage extends Component {
 
state={

  pickedImaged:null
}
  editImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
      if (res.didCancel) {
       // console.warn("User cancelled!");
      } else if (res.error) {
      //  console.warn("Error", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
   
        this.props.onImagePicked( res.uri );
      }
    });
  }

  render() {
   
    return (
      <View style={styles.container}>
<TouchableOpacity onPress={this.editImageHandler}>
        <Avatar
          xlarge
          imageProps={{resizeMode:"stretch"}}
          source={this.props.source}
          activeOpacity={0.7}
          icon ={{name:'user-circle-o' ,size:100 , color:"#357180",type:'font-awesome' }}
        />
        
        <Text style={styles.name}> {this.props.word} profile picture</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
   
    marginTop: 10,
    backgroundColor: "#e7e7d6",
    alignItems:"center",
    marginBottom:5
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "#27636d",
    backgroundColor: "#ffffff",
    width: "45%",
    height: image_height
  },

  previewImage: {
    width: "100%",
    height: "100%"
  },
  name: {
    fontSize: 16,
    color: "#27636d",
    paddingLeft:7
    
  }

});

export default ProfileImage;





