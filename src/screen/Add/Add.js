import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, ScrollView,Text, TextInput, TouchableOpacity,View } from 'react-native';
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements";
import AnimatedHeader from 'react-native-animated-header';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Uploader from "../../components/UI/Activity/Uploader"


export default class AddBookProfile extends Component {


  constructor() {
    super();
    this.ref = firebase.firestore().collection('books');


  }
  state = {
    cover: null,
    title: "",
    description: "",
    author: "",
    uri: "",
    isVisible:false,
    progress:"Uploading..."

  }
  addBook = () => {
    
    //this.uploadCover(this.state.uri);
    const storage = firebase.storage();
    const directoryRef = storage.ref('Images');
    const imageRef = directoryRef.child('CoverImages');
    const currentRef = imageRef.child(this.state.uri);
    currentRef.putFile(this.state.uri).then(() => {
   //  console.warn("cover in firestore now", this.state.uri)
      currentRef.getDownloadURL().then((url) => {
     //  console.warn("I ve got the url from firestore", url);
      
        this.ref.add({
          title: this.state.title,
          author: this.state.author,
          description: this.state.description,
          cover:url
        
    
        }).then(() => {
        //  console.warn("Document successfully written!");
      //     console.warn("firestore doc",this.state.title,this.state.author,this.state.description,
    //  url )
     // console.warn("Document written with ID: ", docRef.id);
          this.setState({
            
            title: '',
            author: '',
            description: '',
            uri: '',
            cover:null,
            isVisible:false,
            progress:"Done!"
           
    
          });
    
          console.warn("done")
        })
    
    


      })
    });
    
   

  }


  imageEditedHandler = image => {
    this.setState({
      cover: image,
    }
    );
  }
//   uploadCover = (uri) => {
//     const storage = firebase.storage();
//     const directoryRef = storage.ref('Images');
//     const imageRef = directoryRef.child('CoverImages');
//     const currentRef = imageRef.child(uri);
//     currentRef.putFile(uri).then(() => {
//      console.warn("cover in firestore now", uri)
//       currentRef.getDownloadURL().then((url) => {
//        console.warn("I ve got the url from firestore", url);
//         this.setState({
//           url: url
//         }
//         );
//       })
//     });
// }
 
  titleChanged = val => {

        this.setState({
          title: val

        });
      }
  descriptionChanged = val => {

        this.setState({
          description: val

        });
      }
  authorChanged = val => {

        this.setState({
          author: val

        });
      }
      onChange(event) {

        this.setState({ description: event.nativeEvent.text || '' });

    }
  addImageHandler = () => {
        ImagePicker.showImagePicker({ title: "Pick a picture" }, res => {
          if (res.didCancel) {
          //  console.warn("User cancelled!");
          } else if (res.error) {
          //  console.warn("Error", res.error);
          } else {

            this.setState({
              uri: res.uri

            });

            this.imageEditedHandler({ uri: res.uri, base64: res.data });

          }
        });
      }

  render() {
let disabled=( this.state.uri === '' || this.state.title==='' || this.state.author===''|| this.state.description==='');
  
let addButton=null;
if (disabled){

addButton=(
  <View style={{alignItems:"center", marginTop:20,marginBottom:20,justifyContent:"center",
  height:40,width:"80%",backgroundColor:"#e5d8ca",flex:1}}>
  <Text style= {{ color: "#8f8f8f",fontWeight:"bold"}}>Add  </Text>
</View>
);}

else{
  addButton=(
<TouchableOpacity style={{alignItems:"center",width:"80%", marginTop:20,marginBottom:20,justifyContent:"center",
         height:40,backgroundColor:"#bb5538",flex:1}}
onPress={()=>{  this.setState({isVisible: true });
            this.addBook()}}>

  <Text style= {{ color: "#e7e7d6",fontWeight:"bold"}}>Add  </Text>

</TouchableOpacity>)

}



  

        return(
         
<AnimatedHeader 
        style={styles.container}
        
        title='Expand our library'
        //renderLeft={() => (<Icon name='md-arrow-round-back'   size={30}type="ionicon"color="#e7e7d6" style={{ marginLeft: 200 }} />)}
        backStyle={{ marginLeft: 80 ,marginRight:100 }}
        titleStyle={{ fontSize: 30, left:1, bottom: 20, color: '#e7e7d6' }}
        headerMaxHeight={150}
        imageSource={require('../../assets/images/header.jpg')}
        toolbarColor='#bb5538'
        disabled={false}
      >

      <ScrollView >
<View>
          <View style={styles.Subcontainer}>
          
          <TouchableOpacity onPress={this.addImageHandler}>
            <Avatar
              xlarge
              source={this.state.cover}
              activeOpacity={0.7}
              icon ={{name:'edit' ,size:80 , color:"#27636d" }}
            />
        
            </TouchableOpacity>
            </View>

            <View style={styles.left}>
            <Text style={styles.Text}>Title</Text>
            </View>
            <View style={styles.Subcontainer}>
            <TextInput
              onChangeText={this.titleChanged}
              style={styles.input}
              placeholder='ex. Anna Karenina'
              value={this.state.title}
              underlineColorAndroid='transparent'
            />
            </View>
            <View style={styles.left}>
            <Text style={styles.Text}>Author</Text>
            </View>
            <View style={styles.Subcontainer}>
            <TextInput
              onChangeText={this.authorChanged}
              style={styles.input}
              placeholder='ex. Leo TOLSTOY'
              value={this.state.author}
              underlineColorAndroid='transparent'
            />
            </View>
            <View style={styles.left}>
            <Text style={styles.Text}>Description</Text>
            </View>
            <View style={styles.Subcontainer}>
             <AutoGrowingTextInput
                        style={styles.input}
                        placeholder={"ex. A rich and complex masterpiece..."}
                        onChange={(event) => this.onChange(event)}
                        maxHeight={200}
                        minHeight={45}
                        enableScrollToCaret
                        value={this.state.description}


                    />
                    </View>
                    <View style={styles.Subcontainer}>
            {addButton}
             </View >
             {this.state.isVisible && (<Uploader progress={this.state.progress} />)}
             </View>
      </ScrollView>
      
      </AnimatedHeader>
   

    );
  }
}



const styles = StyleSheet.create({

  container: {

    flex: 1,
 backgroundColor: '#e7e7d6',


  },
  Subcontainer: {

    flex: 1,
 backgroundColor: '#e7e7d6',
 alignItems:"center",
 marginTop:5


  },
  
left:{
paddingLeft:"10%"

},

  title: {

    fontSize: 20,

    textAlign: 'left',

    margin: 10,
    color: "#27636d"

  },
  Text: {
    fontSize: 14,
    color: "#27636d",
    marginTop: 20


  },
  input: {


    borderBottomColor: "#27636d",
    borderBottomWidth: 1,
    color: "#27636d",
    width: "80%",
    alignItems: "center"
  },
 

});














