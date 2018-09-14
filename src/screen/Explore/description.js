import React, { Component } from 'react';
import { StyleSheet, View,Text,ScrollView,TouchableOpacity,Icon } from 'react-native';

import TriangleCorner from '../../components/UI/TriangleCorner';
import AnimatedHeader from 'react-native-animated-header';
export default class description extends Component {
  state = {
   picture:'',
   text:'',
   title:'',
  }

 


componentDidMount() {

    this.setState({
         picture: this.props.navigation.state.params.picture,
         text: this.props.navigation.state.params.text,
         title:this.props.navigation.state.params.title
    })
}


render() {
      if(this.state.loading) {
        return (

          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>


        );

      }
  else {
        return(

      

       <AnimatedHeader 
      style = { styles.container }
      
      title = {this.state.title}
    renderRight = {() => ( <TouchableOpacity   onPress={() => { this.props.navigation.goBack()}}>
    <Icon name='ios-arrow-back'
    
     size={60} type="ionicon" color="#bb5538" style={{ marginLeft: 200 }} />
     </TouchableOpacity>)}
 backStyle = {{ marginLeft: 80, marginRight: 100 }}
titleStyle = {{ fontSize: 30, left: 1, bottom: 20, color: '#e7e7d6', fontWeight: "bold" }}
headerMaxHeight = { 500}
imageSource = {{src:this.state.picture} }
toolbarColor = '#357180'
disabled = {false}
>
<ScrollView>

 <View style={{flexDirection:"row",marginTop:5,flex:1,justifyContent: 'space-between'}}>
                    
                    <View style={{justifyContent:"flex-start",marginLeft:5}}>
                        <TriangleCorner />
                    </View >
                    <View style={{justifyContent:"flex-end",marginRight:5}}>
                        <TriangleCorner   style={styles.triangleCornerTopRight}/>
                    </View >
                    </View >
                    <View style={styles.center}>
                    <Text style={styles.Text}>{this.state.text}</Text>
                    </View>
                    <View style={{flexDirection:"row",flex:1,justifyContent: 'space-between',marginTop:5}}>
                    <View style={{justifyContent:"flex-start",marginLeft:5}}>
                        <TriangleCorner style={styles.triangleCornerBottomLeft}/>
                    </View >
                    <View style={{justifyContent:"flex-end",marginRight:5}}>
                        <TriangleCorner style={styles.triangleCornerBottomRight} />
                    </View >
                   

                    </View>
          

</ScrollView>

  </AnimatedHeader >
      


    );
  }
}
}



const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#e7e7d6',


    },
    content: {
        alignItems: 'center',
        width: "100%",
        flex: 1,



    },
    center: {

        alignItems: 'center',
        justifyContent:'center'
      


    },
    
   

    author: {

        color: "#b9b9ba",
        fontSize: 16,

    },
    title: {

        color: "#bb5538",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 2

    },
    Text: {
        fontSize: 16,
        color: "#b9b9ba",



    },
    cover: {
        width: 150,
        height: 200,
        marginTop: 5


    },
    triangleCornerBottomRight: {
        transform: [
            { rotate: '180deg' }
        ]
    },
    triangleCornerBottomLeft: {
        transform: [
          {rotate: '270deg'}
        ]
      },
      triangleCornerTopRight: {
        transform: [
          {rotate: '90deg'}
        ]
    }



})