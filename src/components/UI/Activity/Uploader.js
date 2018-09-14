import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';


export default class Uploader extends Component {

    constructor(props) {

        super(props);



        this.state = {

            progress: 0,

            indeterminate: true,

            text: "0% done"

        };

    }



    componentDidMount() {

        this.animate();

    }



    animate() {

        let progress = 0;

        this.setState({ progress });

        setTimeout(() => {

            this.setState({ indeterminate: false });

            setInterval(() => {

                var amount = (this.props.progress) * 100;
                var purcent = amount.toFixed(1);

                this.setState({
                    progress: this.props.progress,
                    text: purcent + "% done"
                });

            }, 500);

        }, 1500);

    }



    render() {

        return (

            // <View style={styles.container}>


            //     <Text style={styles.welcome}>{this.state.text}</Text>
            //     <Progress.Circle

            //         style={styles.progress}

            //         progress={this.state.progress}

            //         indeterminate={this.state.indeterminate}
            //         size={80}

            //     />



            <View style={styles.container}>

                <Progress.CircleSnail

                    style={styles.progress}

                    color={['#bb5538', '#27636d', '#357180']}
                    size={80}

                />
                <Text style={styles.text}>{this.props.progress}</Text>
            </View>



        );

    }

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e7e7d6',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

    },

    text: {

        fontSize: 20,

        textAlign: 'center',

        margin: 10,
        color:"#bb5538"

    },

    circles: {

        flexDirection: 'row',

        alignItems: 'center',

    },

    progress: {

        margin: 10,


    },

});




