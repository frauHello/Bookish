import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { selectBook } from '../../store/actions/index';
import { Card,Icon } from 'react-native-elements';



class BookItem extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    this.userRef= firebase.firestore().collection('users').doc(currentUser.uid);
    this.bookMarkRef= this.userRef.collection("bookmarks");
   
  }
  state={
 key:'',
    }
    
bookMark=(author, key, title, description, cover)=>{

  const ref= this.bookMarkRef.doc(key);
  ref.set({
   key:key,
   author:author,
   title:title,
   description:description,
   cover:cover
 }).then(()=>{

  this.setState({
    key:key,
  })


 })
}




  render() {
    let { navigation, item, onSelectBook,isBookmarked } = this.props
    let { author, key, title, description, cover} = item
    // console.warn("inside render")
    //   console.warn(this.props.delBookmarkId)
    let bookmarkButton=null;
    
      if (isBookmarked||this.state.key===key) {
bookmarkButton=(       
<View >

<Icon
         reverse
         name='check'
         type='font-awesome'
         color='#bb5538'
       />
 
</View>)
   } else {
    bookmarkButton=(
     <TouchableOpacity onPress={() => {
    this.bookMark(author, key, title, description, cover);
     
     }}>
   <Icon
     reverse
     name='bookmark'
     type='octicon'
     color='#bb5538'
   />
    </TouchableOpacity>
    );
 
  }

for(var i of this.props.delBookmarkId){

  if(i===key){
  //  console.warn(i)
    bookmarkButton=(
      <TouchableOpacity onPress={() => {
     this.bookMark(author, key, title, description, cover);
      
      }}>
    <Icon
      reverse
      name='bookmark'
      type='octicon'
      color='#bb5538'
    />
     </TouchableOpacity>
     );
  
}
   
    

}
   



    return (
   
      <TouchableOpacity onPress={() => {
        navigation.navigate('BookPreview');
        onSelectBook(key, title, author, description, cover);
      }}>      

<Card
//title={title}
//image={{uri:cover}}
wrapperStyle={styles.container}
containerStyle={styles.card}
>
<View style={styles.data}>

{/* <Avatar
              xlarge
              source={{uri:cover}}
              activeOpacity={0.7}
            /> */}
<Image   source={{uri:cover}} style={styles.cover}     />

 </View>
 <View style={styles.data}>      
 <Text style={styles.title}>{title}</Text> 
   
<Text style={styles.author}>by. {author}</Text>

 <View style={styles.Button}>
 {bookmarkButton}
   <TouchableOpacity onPress={() => {
    navigation.navigate('BookPreview');
    onSelectBook(key, title, author, description, cover);
  }}>

<Icon
  reverse
  name='open-book'
  type='entypo'
  color='#bb5538'
/>
 </TouchableOpacity>
 {/* <TouchableOpacity onPress={() => {
   // navigation.navigate('BookPreview');
  //  onSelectBook(key, title, author, description, cover);
 this.bookMark(author, key, title, description, cover);
  
  }}>
<Icon
  reverse
  name='bookmark'
  type='octicon'
  color='#bb5538'
/>
 </TouchableOpacity> */}
 

   </View>
  </View>
</Card>

</TouchableOpacity>


    );
  
}}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#e7e7d6",
    flexDirection:"row",
     borderBottomColor:"#bb5538",
    borderTopColor:"#bb5538",
    borderRightColor:"#bb5538",
    borderLeftColor:"#bb5538",
    borderWidth:1
   

  },
  card:{
    flex: 1,
    backgroundColor: "#e7e7d6",
    alignItems:"center",
    justifyContent:"center",
   

  },
  data:{


backgroundColor: "#e7e7d6",
width:"50%",
marginTop:2,
marginBottom:2,
marginLeft:2,
marginRight:2

  },
  author:{
  
color:"#b9b9ba",
fontSize:14
  },
  title:{
  
    color:"#bb5538",
    fontSize:20,
    fontWeight:"bold",

      },

  Button:{

    alignItems:"flex-end",
    marginTop:90,
    flexDirection:"row"
    
   },
   cover:{
   width:150,
   height:200


   }

});

function mapDispatchToProps(dispatch) {
  return {
    onSelectBook: (bookId, title, author, description, cover) => dispatch(selectBook(bookId, title, author, description, cover)),
 
  };
};

const mapStateToProps = state => {
  return {
  delBookmarkId:state.bookmark.bookId
  };

};


export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
