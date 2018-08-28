import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements"


var { height } = Dimensions.get('window');
var image_height = height / 4;


class ProfileImage extends Component {
 

  editImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
      if (res.didCancel) {
        console.warn("User cancelled!");
      } else if (res.error) {
        console.warn("Error", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
        this.props.onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Avatar
          xlarge
          source={this.props.setImage}
          activeOpacity={0.7}
        />
        <TouchableOpacity onPress={this.editImageHandler}>
        <Text style={styles.name}>Edit profile picture</Text>
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
    
  }

});

export default ProfileImage;
