import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from "react-native-elements";

export default class BookPreview extends Component {
    render() {


        return (
            <View style={styles.container}>

                <Text style={styles.title}>
                    Book Preview
 </Text>
                <Avatar
                    xlarge
                    //source={this.state.cover}
                    activeOpacity={0.7}
                />

                <Text style={styles.Text}>Title</Text>
                <Text style={styles.Text}>Author</Text>
                <Text style={styles.Text}>Description</Text>

                <CustomButton color="#bb5538"
                onPress={this.addSummary}
                    textcolor="#e7e7d6">Add Summary</CustomButton>


            </View>

        );
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


    }

});