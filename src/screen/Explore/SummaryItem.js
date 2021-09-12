import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { Icon, Card ,Avatar} from 'react-native-elements';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import FileViewer from 'react-native-file-viewer';

export default class SummaryItem extends Component {
  constructor(props) {
    super(props);
  }

  downloadFromFirestore = (url, fileName) => {
    const dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob
      .config({
        fileCache: true,
        appendExt: 'pdf',
        ///path :dirs.DownloadDir+fileName

      })
      .fetch('GET', url)
      .then((res) => {
    //    console.warn('File downloaded to ', res.path(), "dirs.DocumentDir", dirs.DocumentDir);


        FileViewer.open(res.path())
          .then(() => {
        //    console.warn('File openened successfully')
          })
          .catch(error => {
         //   console.warn(error)
          });
      })


  }

  render() {
    let { item, navigation } = this.props
    let { sumid,
      title,
      date,
      text,
      picture,
      username,
      time,
      file,
      fileuri,
      fileName,
      videoUrl
    } = item

    return (

   
 <Card

wrapperStyle={styles.container}
containerStyle={styles.card}
>

 <View style={styles.data}>      
 <Text style={styles.title}>{title}</Text> 
   
<Text style={styles.author}>by.{username}</Text>

 <View style={styles.Button}>
 
  <TouchableOpacity onPress={() => {this.props.navigation.navigate('Preview', {
                                      videoSource: videoUrl }) }}>
   <Icon reverse name='video' color='#357180' type='entypo' />
   </TouchableOpacity>
 <TouchableOpacity onPress={() => {this.downloadFromFirestore(file,fileName)}}>
 <Icon reverse name='glasses' color='#357180' type='material-community' />
   </TouchableOpacity>


   </View>
  </View>
</Card> 
//{/* <View style={styles.container}>


    );

  }
}
const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: "#e7e7d6",
   flexDirection:"row",
    borderColor:"#357180",
    borderWidth:1,
   

  },
  card:{
    width:"80%",
    backgroundColor: "#e7e7d6",
    alignItems:"center",
    justifyContent:"space-between",
   
   

  },
  data:{


backgroundColor: "#e7e7d6",
width:"100%",
marginTop:2,
marginBottom:2,
marginLeft:2,
marginRight:2

  },
  author:{
  
color:"#b9b9ba",
fontSize:12
  },
  title:{
  
    color:"#357180",
    fontSize:18,
    fontWeight:"bold",

      },

  Button:{

    alignItems:"flex-start",
  
    
   },
   cover:{
   width:150,
   height:200


   },
   username:
     {flexDirection:'row', 
     width:'60%'}
   
});


