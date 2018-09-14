import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { Icon, Card ,Avatar} from 'react-native-elements';
import FileViewer from 'react-native-file-viewer';




export default class SummaryComponent extends Component {
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
        <TouchableOpacity>
        <View style={styles.card}>

          <Image style={styles.cardImage} source={{uri:picture}}/>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.socialBarContainer}>
                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/ffffff/hearts.png'}}/>
                    <Text style={styles.socialBarLabel}>78</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ios-glyphs/75/ffffff/comments.png'}}/>
                    <Text style={styles.socialBarLabel}>25</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/material/50/ffffff/retweet.png'}}/>
                    <Text  style={styles.socialBarLabel}>13</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
     
    );

  }
}
const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: "#e7e7d6",
   // flexDirection:"row",
   
    borderColor:"#357180",
    borderWidth:1,
   

  },
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 1,
  },
  /******** card **************/
  card:{
    margin: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    //overlay efect
    flex: 1,
    height: 200,
    width: null,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:22,
    color: "#ffffff",
    marginTop: 10,
    fontWeight:'bold'
  },
  time:{
    fontSize:13,
    color: "#ffffff",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    color: "#ffffff",
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

 
});
