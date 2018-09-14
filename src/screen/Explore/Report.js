import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import CustomButton from "../../components/UI/CustomButton/CustomButton";

class Report extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('Reports');

    }

    state = { textArea: "", }

    onChange(event) {

        this.setState({ textArea: event.nativeEvent.text || '' });

    }
    submitReport = () => {

        //console.warn("hi inside upload to firestore")
        this.ref.add({
            title: this.props.title,
            text: this.state.textArea,
            cover: this.props.cover,
            username: this.props.username,
            author: this.props.author,
            description: this.props.description,
            bookId: this.props.bookId,



        }).then(() => {
           // console.warn("hi inside then in upload firestore cleaning state")
            return this.setState({
           textArea:""
            })


        })




    }

    render() {



        return (
            <View >

                <Text> Why do you want to Report</Text>
                <AutoGrowingTextInput
                    style={styles.textInput}
                    placeholder={"Write something about it .."}
                    onChange={(event) => this.onChange(event)}
                    placeholderTextColor='#66737C'
                    maxHeight={200}
                    minHeight={45}
                    enableScrollToCaret
                    value={this.state.textArea}


                />

                <CustomButton color="#bb5538" onPress={this.submitReport}>
                   Submit
                </CustomButton>
            </View>



        )

    }
}



const styles = StyleSheet.create({





});


const mapStateToProps = state => {
    return {
        bookId: state.bookItem.bookId,
        username: state.profile.name,
        cover: state.bookItem.cover,
        title: state.bookItem.title,
        author: state.bookItem.author,
        description: state.bookItem.description
    };

};


export default connect(mapStateToProps, null)(Report);


