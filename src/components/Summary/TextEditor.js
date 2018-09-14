// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Dimensions,Image } from 'react-native';
// import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
// import firebase from 'react-native-firebase';
// import { Header } from "react-native-elements";
// import CustomButton from "../UI/CustomButton/CustomButton";




// export default class TextEditor extends Component {


//     constructor(props) {
//         super(props);
//         this.getHTML = this.getHTML.bind(this);
//         this.setFocusHandlers = this.setFocusHandlers.bind(this);
//         this.setFocusHandlers = this.setFocusHandlers.bind(this);
//         this.ref = firebase.firestore().collection('summaries');
//         this.addSummary = this.addSummary.bind(this);



//     }

//     state = {
//         titleHtml: "",
//         contentHtml: ""
//     }
//     onEditorInitialized() {

//         this.setFocusHandlers();

//         this.getHTML();

//     }

//     render() {
//         return (
//             <View style={styles.container} height={this.props.height}>
//                 {/* <Header
//                     backgroundColor="#bb5538"
//                     centerComponent={(
//                         <View style={styles.view}>
//                             <Image style={styles.Image}
//                                 resizeMode="cover"
//                                 source={require('../../assets/images/s_cover.png')} />
//                         </View>
//                     )}
//                     rightComponent={<View style={styles.view}>
//                         <CustomButton color="#bb5538"
//                             onPress={this.addSummary}
//                             textcolor="#e7e7d6">Save</CustomButton>
//                     </View>
//                     }
//                     leftComponent={
//                         <View style={styles.view}>
//                             <CustomButton color="#bb5538"
//                                 onPress={() => this.props.navigation.navigate('BookPreview')}
//                                 textcolor="#e7e7d6">Discard</CustomButton>
//                         </View>
//                     }


//                 /> */}
//                 <RichTextEditor

//                     ref={(r) => this.richtext = r}
//                     style={styles.richText}
//                     //initialTitleHTML={'<i>title<i>'}
//                    // initialContentHTML={'<i>tell us what you think<i>'}
//                     editorInitializedCallback={() => this.onEditorInitialized()}
//                     contentPlaceholder='tell us what you think'

//                 />

//                 <RichTextToolbar

//                     getEditor={() => this.richtext}
//                     onPressAddImage={() => console.warn("here I press to add an image")}
//                     iconTint="#27636d"
//                     selectedButtonStyle={{ backgroundColor: '#e5d8ca' }}

//                 />

//             </View>

//         );

//     }







//     async getHTML() {

//         const titleHtml = await this.richtext.getTitleHtml();
//         const contentHtml = await this.richtext.getContentHtml();
//         console.warn(titleHtml);
//         console.warn(contentHtml);

//     }
//     addSummary = () => {
//         this.saveSummary();
//     }

//     async saveSummary() {
//         const titleHtml = await this.richtext.getTitleHtml();
//         const contentHtml = await this.richtext.getContentHtml();




//         this.ref.add({
//             titleHtml: titleHtml,
//             contentHtml: contentHtml

//         });



//         console.warn("done")
//     }

//     setFocusHandlers() {

//         this.richtext.setTitleFocusHandler(() => {

//             //alert('title focus');

//         });

//         this.richtext.setContentFocusHandler(() => {

//             //alert('content focus');

//         });

//     }

// }



// const styles = StyleSheet.create({

//     container: {
//         //flex: 1,
//         //flexDirection: 'column',
//         //backgroundColor: '#db9641',
//         //width: width,
//         //height: height/2,
//         //alignItems:"center"
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: '#ffffff',
//     },

//     richText: {

//         alignItems: 'center',

//         justifyContent: 'center',

//         backgroundColor: '#e7e7d6',

//     },
//     Image: {

//         alignSelf: 'center',

//         height: 40

//     },
//     view: {
//         alignItems: 'flex-start',


//     }

// });