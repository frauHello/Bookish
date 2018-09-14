import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import SummaryItem from "./SummaryItem";
import AnimatedHeader from 'react-native-animated-header';
import { Icon } from "react-native-elements";
class ExploreSummaries extends Component {


    constructor(props) {
        super(props);
        this.sumref = firebase.firestore().collection('summaries');
        this.bookRef = firebase.firestore().collection('books').doc(this.props.bookId);
    }
    state = {

        summaries: [],
        loading: true,

    }
    getSummaries = () => {
        let summaries = [];
      //  console.warn("Hello! inside the getSummaries")
        this.bookRef.collection('itsSummaries').get().then((querySnapshot) => {
            return querySnapshot.forEach((doc) => {
           //     console.warn(doc.id, " => ", doc.data());
                const {sumid,title, text, picture, username,time,file,fileuri,fileName,videoUrl} = doc.data();
                summaries.push({
                  
                    sumid,
                    title,
                    text,
                    picture,
                    username,
                    time,
                    file,
                    fileuri,
                    fileName,
                    videoUrl
                  
                });
                //console.warn("after the push", sumid);
             //   console.warn("ids inside get ids", summaries)
            });

        }).then(() => {

            return this.setState({
                summaries,
                loading: false

            })


        })

    }



    componentDidMount() {
        this.getSummaries();

    }
    render() {
        if (this.state.loading) {
            return (

                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>


            );

        }
        else {
            return (
                <AnimatedHeader 
                style = { styles.container }
                
                title = 'Explore Summaries'
    renderRight = {() => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddSummary')}>
    <Icon  reverse name='note-add'color='#357180' />
    </TouchableOpacity>
 )}
                backStyle = {{ marginLeft: 80, marginRight: 100 }}
          titleStyle = {{ fontSize: 30, left: 1, bottom: 20, color: '#357180', fontWeight: "bold" }}
        headerMaxHeight = { 150}
      //  imageSource = { require('../../assets/images/header.jpg') }
        toolbarColor = '#e7e7d6'
        disabled = { false}
          >
              
                    <FlatList
                  horizontal={true}
                 // numColumns={2}
                  
                        data={this.state.summaries}
                        renderItem={({ item }) => <SummaryItem item={item} navigation={this.props.navigation} />}
                    />
                
                </AnimatedHeader> 

            )

        }
    }


}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e7e7d6',

    },

    title: {
        fontSize: 20,
        textAlign: 'center',
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
        borderBottomWidth: 2,
        color: "#27636d",
        width: "80%",
        alignItems: "center"
    },
    add: {
        fontSize: 12,
        color: "#27636d",

    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e7e7d6"
    },

});



const mapStateToProps = state => {
    return {
        bookId: state.bookItem.bookId,
    };

};


export default connect(mapStateToProps, null)(ExploreSummaries);