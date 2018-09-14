import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon,Divider } from "react-native-elements";
import { connect } from 'react-redux';
import AnimatedHeader from 'react-native-animated-header';
import TriangleCorner from '../../components/UI/TriangleCorner';

class BookPreview extends Component {



    render() {

        let { cover, title, author, description } = this.props;

        return (


            <AnimatedHeader
                style={styles.container}

                renderLeft={() => (
                <TouchableOpacity   onPress={() => { this.props.navigation.goBack()}}>
                <Icon name='ios-arrow-back'
                
                 size={60} type="ionicon" color="#bb5538" style={{ marginLeft: 200 }} />
                 </TouchableOpacity>
                  )}
                backStyle={{ marginLeft: 80, marginRight: 100 }}

                headerMaxHeight={500}
                imageSource={{ uri: cover }}
                toolbarColor='#e7e7d6'
                disabled={false}
            >


                <ScrollView>
                    <View style={styles.content}>

                        {/* <Image source={{ uri: cover }} style={styles.cover} /> */}

                        <Text style={styles.title}> {title}</Text>
                        <Text style={styles.author}>by. {author}</Text>

                    </View>
                    <View style={{flexDirection:"row",marginTop:5,flex:1,justifyContent: 'space-between'}}>
                    
                    <View style={{justifyContent:"flex-start",marginLeft:5}}>
                        <TriangleCorner />
                    </View >
                    <View style={{justifyContent:"flex-end",marginRight:5}}>
                        <TriangleCorner   style={styles.triangleCornerTopRight}/>
                    </View >
                    </View >
                    <View style={styles.center}>
                    <Text style={styles.Text}> {description}</Text>
                    </View>
                    <View style={{flexDirection:"row",flex:1,justifyContent: 'space-between',marginTop:5}}>
                    <View style={{justifyContent:"flex-start",marginLeft:5}}>
                        <TriangleCorner style={styles.triangleCornerBottomLeft}/>
                    </View >
                    <View style={{justifyContent:"flex-end",marginRight:5}}>
                        <TriangleCorner style={styles.triangleCornerBottomRight} />
                    </View >
                   

                    </View>
          

                    <View style={{flexDirection:"row",marginRight:5,marginLeft:5,marginTop:30,flex:1,borderWidth:2,justifyContent: 'space-between',alignItems:"center",borderColor:"#bb5538"}}>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('ExploreSummaries')}}>
                        <View  style={{flexDirection:"row",flex:1,elevation:15,justifyContent: 'flex-start',marginLeft:20,alignItems:"center"}}>
                    <Icon  reverse name='page-search'color='#bb5538' type="foundation" />
                        <Text style={{color:"#bb5538",fontSize:16,fontWeight:"bold"}}>Summary</Text>
                    </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => { this.props.navigation.navigate('Report')}}>
                    <View  style={{flexDirection:"row",flex:1,marginRight:20,justifyContent: 'flex-end',alignItems:"center"}}>
                    <Icon  reverse name='report'color='#bb5538' type="octicon" />
                        <Text style={{color:"#bb5538",fontSize:16,fontWeight:"bold"}}>Report</Text>
                    </View>
                    </TouchableOpacity>
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


});
const mapStateToProps = state => {
    return {
        cover: state.bookItem.cover,
        title: state.bookItem.title,
        author: state.bookItem.author,
        description: state.bookItem.description
    };

};


export default connect(mapStateToProps, null)(BookPreview);