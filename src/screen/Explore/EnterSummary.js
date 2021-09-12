import React, { Component } from 'react';
import { StyleSheet, Image,Text, View, TouchableOpacity, KeyboardAvoidingView,TextInput, ScrollView } from 'react-native';
import { Icon, Header } from "react-native-elements";
import FilePickerManager from 'react-native-file-picker';
import firebase from 'react-native-firebase';
import ImagePicker from "react-native-image-picker";
import ImageCropPicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Uploader from "../../components/UI/Activity/Uploader";
import AnimatedHeader from 'react-native-animated-header';

var async = require("async");
//var { height, width } = Dimensions.get('window');

 var today = new Date();

class EnterSummary extends Component {
  
    selectVideoTapped() {

        const options = {
            title: 'Select a video',
            takePhotoButtonTitle: 'Record Video...',
            mediaType: 'video',
            videoQuality: 'medium'

        };
        ImagePicker.showImagePicker(options, (response) => {
            //console.warn('Response = ', response);
            if (response.didCancel) {
                //console.warn('User cancelled video picker');
            }
            else if (response.error) {
                //console.warn('ImagePicker Error: ', response.error);
            }

            else if (response.customButton) {

                // console.log('User tapped custom button: ', response.customButton);

            }

            else {

                this.setState({

                    videoSource: response.uri

                });

                this.props.navigation.navigate('Preview', {
                    videoSource: this.state.videoSource
                })

            }

        });

    }
    // selectVideoTapped(){
    // ImagePicker.openPicker({
    //     mediaType: "video",
    //   }).then((video) => {
    //     console.log(video);
    //   });
    // }

    constructor(props) {
        super(props);
        this.selectFileTapped = this.selectFileTapped.bind(this);
        this.UploadMultipe = this.UploadMultipe.bind(this);
        this.summaryRef = firebase.firestore().collection('summaries');
        this.bookRef = firebase.firestore().collection('books').doc(this.props.bookId);
        this.storage = firebase.storage();
        this.directoryRef = this.storage.ref('Summaries');
        this.sumRef = this.directoryRef.child('files');
        this.imageRef = this.directoryRef.child('SummaryImages');
        this.videoRef = this.directoryRef.child("SummaryVideo");
     this.date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();


    }
    state = {
        fileuri: undefined,
        //url: "",
        fileName: "",
        
        title: "",////should be written in firestore
        image: null,
        imageurl: '',
        fileurl: '',
        imageuri: "",
        username: "",///should be written in firestore
        userId: firebase.auth().currentUser.uid,///should be written in firestore
        textArea: "",///should be written in firestore
        createdAt: new Date().getTime(),
        videoSource: '',
        videoUrl: '',
        isVisible: false,
        progress: "Uploading...",
        toUploadIm: [],
        uploadedIm: []

    }


    titleChanged = val => {

        this.setState({
            title: val

        });

    }
    onChange(event) {

        this.setState({ textArea: event.nativeEvent.text || '' });

    }
    // addImageHandler = () => {
    //     ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
    //         if (res.didCancel) {
    //           //  console.warn("User cancelled!");
    //         } else if (res.error) {
    //           //  console.warn("Error", res.error);
    //         } else {
    //             this.setState({
    //                 image: { uri: res.uri, base64: res.data },
    //                 imageuri: res.uri
    //             });
    //          //  console.warn("Image picked uri", this.state.imageuri)

    //         }
    //     });
    // }
    selectFileTapped() {
        const options = {
            title: 'File Picker',
            chooseFileButtonTitle: 'Choose File...'
        };
        FilePickerManager.showFilePicker(options, (response) => {
            // console.warn('Response = ', response);
            if (response.didCancel) {
                //   console.warn('User cancelled photo picker');
            }
            else if (response.error) {
                //  console.warn('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                //   console.warn('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    fileuri: response.uri,
                    fileName: response.fileName
                });
                console.warn("Image picked uri", this.state.fileuri)

            }
        });
    }
    addMultipleImageHandler = () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo',
            multiple: true
        }).then(images => {
            // console.warn(images.path);
            this.setState({
                toUploadIm: images
            });

        });



    }
    UploadMultipe = (toUploadIm, uploadedIm) => {
        console.warn("Inside upload multiple")
        async.map(toUploadIm, async function (image) {
            // console.warn(toUploadIm)
            //let uploadedIm = []
            let uri = image.path
            // console.warn(uri)
            const directoryRef = firebase.storage().ref('Summaries');
            const imageRef = directoryRef.child('SummaryImages');
            const currentRef = imageRef.child(uri);
            return currentRef.putFile(uri).then(() => {
                // console.warn("hii after then putimage in storage")
                //  console.warn(uri)
                return currentRef.getDownloadURL().then((imageurl) => {
                    //   console.warn("hi after then the get image dw url", imageurl);
                    uploadedIm.push(imageurl)
                    console.warn(uploadedIm)
                })

            })
        }, function (err, results) {

        });


    }

    // uploadIm = (image) => {
    //     let uploadedIm = []
    //     let uri = image.path
    //     const imageRef = this.imageRef.child(uri);
    //     return imageRef.putFile(uri).then(() => {
    //         console.warn("hii after then putimage in storage")
    //         console.warn(uri)
    //         return imageRef.getDownloadURL().then((imageurl) => {
    //             console.warn("hi after then the get image dw url", imageurl);
    //             return uploadedIm.push(imageurl)

    //         })

    //     })
    // }

    // uploadSummary = () => {
    //     console.warn("here inside upload summary")
    //     const storage = firebase.storage();
    //     console.warn("after firebase.storage ")
    //     const sdirRef = storage.ref('Summaries');
    //     console.warn("after storage.ref ")
    //     const sumRef = sdirRef.child('files');
    //     console.warn("aftersdirRef.child('files') ")
    //     const fileRef = sumRef.child(this.state.file);
    //     console.warn("aftersumRef.child ")
    //    // fileRef.putFile(this.state.file).then(() => {
    //        // console.warn("after putStream")
    //        // fileRef.getDownloadURL().then((fileurl) => {
    //            // console.warn("file url",fileurl)
    //             const idirRef = storage.ref('Images');
    //             const imageRef = idirRef.child('SummaryImages');
    //             const iRef = imageRef.child(this.state.uri);
    //             iRef.putFile(this.state.uri).then(() => {
    //                 iRef.getDownloadURL().then((imageurl) => {
    //                  console.warn("image url ",imageurl)
    //                  console.warn("this issue",this.state.title,this.state.textArea,this.bookRef)
    //                //  fileRef.putFile(this.state.file).then(() => {
    //                  //   fileRef.getDownloadURL().then((fileurl) => {
    //                     this.sumRef.add({
    //                         title:this.state.title,
    //                         text:this.state.textArea,
    //                         picture: imageurl,
    //                       // file:fileurl


    //                     })



    //                     .then( (docRef) =>{
    //                         console.warn("Document written with ID: ", docRef.id);
    //                         console.warn(this.state.title,this.state.textArea)
    //                        //console.warn(this.bookRef)
    //                        this.bookRef.collection('SummaryIds')
    //                        .add({ id: docRef.id}).then(()=>{
    //                         this.setState({
    //                             title: '',
    //                             textArea: '',
    //                       })

    //                       console.warn("here inside the then of react native update")
    //                       ;}
    //                          )
    //                     })
    //                                 //  });
    //                                          //}).catch((error)=>{console.warn("put file occured",error)})

    //                      })

    //                    })
    //                     .catch((error)=>{console.warn("put image occured",error)})


    //  }
    uploadSummaryPickedFile = (fileuri, imageuri, videoSource) => {
        //  console.warn("I entered uploadSummaryPickedFile")
        const sumRef = this.sumRef.child(fileuri);
        return sumRef.putFile(fileuri).then((response) => {
            //  console.warn("hii after  putfile in storage trying to get w url", { response })
            return sumRef.getDownloadURL().then((fileurl) => {
                // console.warn("hi after then the get file dw url", fileurl);
                return this.setState({ fileurl: fileurl });

            })
        }).then(() => {
            const imageRef = this.imageRef.child(imageuri);
            return imageRef.putFile(imageuri).then(() => {
                console.warn("hii after then putimage in storage")
                console.warn(imageuri)
                return imageRef.getDownloadURL().then((imageurl) => {
                    console.warn("hi after then the get image dw url", imageurl);
                    return this.setState({ imageurl: imageurl });
                    console.warn("this.state.imageurl", this.state.imageurl);
                })


            })
        }).then(() => {

            const videoRef = this.videoRef.child(videoSource);
            // console.warn("inside the put video file")
            return videoRef.putFile(videoSource)
                .then(() => {
                    //   console.warn("hii after then putVideo in storage")
                    //   console.warn(videoSource)
                    return videoRef.getDownloadURL().then((videourl) => {
                        //     console.warn("hi after then the get image dw url", videourl);
                        return this.setState({
                            videoUrl: videourl,

                        });

                    })


                }).catch((error) => { console.warn("video error", error) })





        })
            .then(() => {
                //  console.warn("hi inside upload to firestore")
                return this.bookRef.collection('itsSummaries').add({
                    title: this.state.title,
                    text: this.state.textArea,
                    picture: this.state.imageurl,
                    username: this.props.username,
                    time: this.state.createdAt,
                    file: this.state.fileurl,
                    fileuri: this.state.fileuri,
                    fileName: this.state.fileName,
                    videouri: this.state.videoSource,
                    // video: video,
                    videoUrl: this.state.videoUrl,

                })




            }).then(() => {
                // console.warn("hi inside then in upload firestore cleaning state")
                return this.setState({
                    progress: "Done !",
                    title: '',
                    textArea: '',
                    imageurl: '',
                    image: null,
                    fileurl: '',
                    time: '',
                    username: '',
                    userId: '',
                    fileName: '',
                    fileuri: '',
                    imageuri: '',
                    videoUrl: '',
                    videoSource: '',
                    isVisible: false,

                })

            })



    }

    //     uploadToFirestore(){
    //         //let video = this.props.navigation.state.params.video;
    //         console.warn("hi inside upload to firestore")
    //         return this.bookRef.collection('itsSummaries').add({
    //             title: this.state.title,
    //             text: this.state.textArea,
    //             picture: this.state.imageurl,
    //             username: this.props.username,
    //             time: this.state.createdAt,
    //             file: this.state.fileurl,
    //             fileuri: this.state.fileuri,
    //             fileName: this.state.fileName,
    //             videouri: this.state.videoSource,
    //            // video: video,
    //             videoUrl: this.state.videoUrl,

    //         }).then(() => {
    //             console.warn("hi inside then in upload firestore cleaning state")
    //             return this.setState({
    //                 title: '',
    //                 textArea: '',


    //                 fileName: '',
    //                 fileuri: '',
    //                 imageuri: '',
    //                 videoUrl: '',
    //                 videoSource: '',
    //                 image:'',
    //                progress:"Done!",
    //                 imageurl: '',
    //                 fileurl: '',
    //                 isVisible: false,
    //                 time: '',
    //                 username: '',
    //                 userId: '',
    //  })


    //         })



    //     }

    //     uploadVideo = (videoSource) => {
    //         const videoRef = this.videoRef.child(videoSource);
    //         console.warn("inside the put video file")
    //         const uploadTask = videoRef.putFile(videoSource)
    //         uploadTask.then(() => {
    //             console.warn("hii after then putVideo in storage")
    //             console.warn(videoSource)
    //             return videoRef.getDownloadURL().then((videourl) => {
    //                 console.warn("hi after then the get image dw url", videourl);
    //                 return this.setState({
    //                     videoUrl: videourl,
    //                     isVisible: false
    //                 });

    //             })


    //         }).catch((error) => { console.warn("video error", error) })

    //         uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

    //             const prog = (snapshot.bytesTransferred / snapshot.totalBytes)
    //             this.setState({
    //                 progress: prog,
    //             })

    //             console.warn(`Upload is ${prog}% done`, `state progress ${this.state.progress}%`);

    //             switch (snapshot.state) {
    //                 case firebase.storage.TaskState.SUCCESS: // or 'success'
    //                     console.warn('Upload is complete');
    //                     break;
    //                 case firebase.storage.TaskState.RUNNING: // or 'running'
    //                     console.warn('Upload is running');
    //                     break;
    //                 default:
    //                     console.warn(snapshot.state);
    //             }
    //         }, (error) => {
    //             console.warn(error);
    //         });

    //     }

    // upload=(fileuri,imageuri,videoSource)=>{

    //     async.series([
    //         function(callback) {
    //             this.uploadSummaryPickedFile(fileuri,imageuri,videoSource)
    //             callback(null);
    //         },
    //         function(callback) {
    //         this.uploadToFirestore()
    //              callback(null);
    //         }
    //     ],
    //    );
    //  }


    uploadAll = (fileuri, toUploadIm, uploadedIm, videoSource) => {
        console.warn("I entered uploadSummaryPickedFile")
        console.warn(this.date)
        const sumRef = this.sumRef.child(fileuri);
        return sumRef.putFile(fileuri).then((response) => {
            console.warn("hii after  putfile in storage trying to get w url", { response })
            return sumRef.getDownloadURL().then((fileurl) => {
                console.warn("hi after then the get file dw url", fileurl);
                return this.setState({ fileurl: fileurl });

            })
        }).then(() => {
            const videoRef = this.videoRef.child(videoSource);
            console.warn("inside the put video file")
            return videoRef.putFile(videoSource)
                .then(() => {
                    console.warn("hii after then putVideo in storage")
                    //   console.warn(videoSource)
                    return videoRef.getDownloadURL().then((videourl) => {
                        console.warn("hi after then the get image dw url", videourl);
                        return this.setState({
                            videoUrl: videourl,

                        });

                    })


                }).catch((error) => { console.warn("video error", error) })


        }).then(() => {

            console.warn("Inside upload multiple")
            async.map(toUploadIm, async function (image) {
                console.warn(toUploadIm)
                //let uploadedIm = []
                let uri = image.path
                // console.warn(uri)
                const directoryRef = firebase.storage().ref('Summaries');
                const imageRef = directoryRef.child('SummaryImages');
                const currentRef = imageRef.child(uri);
                return currentRef.putFile(uri).then(() => {
                    // console.warn("hii after then putimage in storage")
                    //  console.warn(uri)
                    return currentRef.getDownloadURL().then((imageurl) => {
                        //   console.warn("hi after then the get image dw url", imageurl);
                        uploadedIm.push(imageurl)
                        console.warn(uploadedIm)
                    })

                })
            }, function (err, results) {

            });



        })
            .then(() => {
                //  console.warn("hi inside upload to firestore")
                return this.bookRef.collection('itsSummaries').add({
                    title: this.state.title,
                    text: this.state.textArea,
                    pictures: uploadedIm,
                    username: this.props.username,
                    time: this.state.createdAt,
                    file: this.state.fileurl,
                    fileuri: this.state.fileuri,
                    fileName: this.state.fileName,
                    videouri: this.state.videoSource,
                    // video: video,
                    date:this.date,
                    videoUrl: this.state.videoUrl,

                })




            }).then(() => {
                // console.warn("hi inside then in upload firestore cleaning state")
                return this.setState({
                    progress: "Done !",
                    title: '',
                    textArea: '',
                    imageurl: '',
                    image: null,
                    fileurl: '',
                    time: '',
                    username: '',
                    userId: '',
                    fileName: '',
                    fileuri: '',
                    imageuri: '',
                    videoUrl: '',
                    videoSource: '',
                    isVisible: false,
                    uploadedIm: [],
                    toUploadIm: []

                })

            })



    }

    render() {
        let disabled = (this.state.fileuri === '' && this.state.videoSource === '' && this.state.imageuri === '');

        let submitButton = null;
        if (disabled) {

            submitButton = (
                <View style={{
                    alignItems: "center", marginTop: 20, marginBottom: 20, justifyContent: "center",
                    height: 40, paddingLeft: "5%", backgroundColor: "#d7d7bf", flex: 1
                }}>
                    <Text style={{ color: "#8f8f8f", fontWeight: "bold" }}>Submit  </Text>
                </View>
            );
        }

        else {
            submitButton = (
                <TouchableOpacity style={{
                    alignItems: "center", marginTop: 20, marginBottom: 20, justifyContent: "center",
                    paddingLeft: "5%", height: 40, backgroundColor: "#357180", flex: 1
                }}
                    onPress={() => {
                        //   console.warn('submitting');
                        this.setState({
                            isVisible: true
                        });

                        // this.uploadSummaryPickedFile(this.state.fileuri, this.state.imageuri, this.state.videoSource)
                        // this.UploadMultipe(this.state.toUploadIm, this.state.uploadedIm)
                        this.uploadAll(this.state.fileuri, this.state.toUploadIm, this.state.uploadedIm, this.state.videoSource)
                    }}

                >

                    <Text style={{ color: "#e7e7d6", fontWeight: "bold" }}>Submit  </Text>

                </TouchableOpacity>)

        }






        return (

            <AnimatedHeader
                style={styles.container}
              
                renderLeft={() => (
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name='ios-arrow-back'

                            size={50} type="ionicon" color="#357180" style={{ paddingLeft: 200 }} />
                    </TouchableOpacity>
                )}
                backStyle={{ marginLeft: 80, marginRight: 100 }}

                headerMaxHeight={320}
                 imageSource={require("../../assets/images/backg2.jpg")}
                toolbarColor='#357180'
                disabled={false}
            >

            <ScrollView >
                <KeyboardAvoidingView behavior="padding">
            
               <View style={{ flexDirection: "row", marginTop: 10, flex: 1, justifyContent: 'space-between', alignItems: "center" }}>
                        <TouchableOpacity onPress={this.selectFileTapped}>
                            <View style={{ elevation: 15, flex: 1, justifyContent: 'flex-start', marginLeft: 20, alignItems: "center" }}>
                                <Icon reverse name='pin' type="entypo" color='#357180' />
                                <Text style={{ color: "#357180", fontWeight: "bold", fontSize: 16 }}>Add File</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.selectVideoTapped.bind(this)}>
                            <View style={{ flex: 1, elevation: 15, justifyContent: 'flex-end', marginRight: 20, alignItems: "center" }}>
                                <Icon reverse name='video' color='#357180' type="entypo" />
                                <Text style={{ color: "#357180", fontSize: 16, fontWeight: "bold" }}>Share Video</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        onPress={this.addMultipleImageHandler}>
                        <View style={{ flex: 1, elevation: 15, justifyContent: 'center', alignItems: "center" }}>
                            <Icon reverse name='add-a-photo' color='#357180' />
                            <Text style={{ color: "#357180", fontSize: 16, fontWeight: "bold" }}>Add Photos</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.SubcontainerIcon}>
                        <Icon name='magic' type='font-awesome' size={30} color='#357180' />
                        <TextInput
                            onChangeText={this.titleChanged}
                            style={styles.input}
                            placeholder='Your custom title'
                            value={this.state.title}
                            underlineColorAndroid='transparent'
                        />
                    </View>



                    {/* <AutoGrowingTextInput
                        style={styles.textInput}
                        placeholder={"Write something about it .."}
                        onChange={(event) => this.onChange(event)}
                        placeholderTextColor='#66737C'
                        maxHeight={200}
                        minHeight={45}
                        enableScrollToCaret
                        value={this.state.textArea}


                    /> */}


                    <View style={styles.SubcontainerIcon}>
                        <Icon name='sticker-emoji' type='material-community' size={30} color='#357180' />
                        <AutoGrowingTextInput
                            style={styles.input}
                            placeholder={"Tell us about your summary"}
                            onChange={(event) => this.onChange(event)}
                            maxHeight={200}
                            minHeight={45}
                            enableScrollToCaret
                            value={this.state.textArea}
                        />
                    </View>








                    {/*                  
                <CustomButton color="#bb5538"
                        onPress={this.selectFileTapped}
                        textcolor="#e7e7d6">pick from device</CustomButton>
                    <Text style={styles.Text}>{this.state.fileName}</Text>
                    <CustomButton color="#bb5538"
                        onPress={this.selectVideoTapped.bind(this)}
                        textcolor="#e7e7d6">Add Video</CustomButton> */}
                    {/* <CustomButton color="#bb5538"
                        onPress={() => {
                            this.props.navigation.navigate('Preview', {
                                videoSource: this.state.videoSource
                            })
                        }}
                        textcolor="#e7e7d6">Video Preview</CustomButton> */}
                    {/* <CustomButton color="#bb5538"
                        onPress={() => {

                            console.warn('submitting');
                            this.setState({
                                isVisible: true
                            });
                           
                this.uploadSummaryPickedFile(this.state.fileuri, this.state.imageuri, this.state.videoSource)
                   
                        }}
                        textcolor="#e7e7d6">submit</CustomButton> */}

                    <View style={styles.Subcontainer}>

                        {submitButton}
                    </View>

                    {this.state.isVisible && (<Uploader progress={this.state.progress} />)}


              </KeyboardAvoidingView>
            </ScrollView>
            </AnimatedHeader>




        );
    }
}



const styles = StyleSheet.create({
    Text: {
        fontSize: 14,
        color: "#27636d",
        marginTop: 20


    },
    field: {
        width: "30%",
        marginTop: 25,
        alignItems: "flex-start",
        flexDirection: "row",


    },
    container: {
        flex: 1,
        backgroundColor: '#e7e7d6',

    },



    input: {
        borderBottomColor: "#27636d",
        borderBottomWidth: 1,
        color: "#27636d",
        width: "80%",
        alignItems: "center",
        marginLeft: "5%"
    },

    SubcontainerIcon: {

        flex: 1,
        backgroundColor: '#e7e7d6',
        alignItems: "center",
        marginTop: 5,
        flexDirection: "row",
        paddingLeft: "5%"

    },
    Subcontainer: {

        flex: 1,
        backgroundColor: '#e7e7d6',
        alignItems: "center",
        marginTop: 5,
        flexDirection: "row",
        paddingLeft: "5%",
        paddingRight: "5%",

    },
    SummaryImage: {
        marginTop: 10,
        alignItems: "center",
        marginBottom: 5,
        justifyContent: "center",
        marginTop: 5


    },

});
const mapStateToProps = state => {
    return {
        bookId: state.bookItem.bookId,
        username: state.profile.name,
    };

};


export default connect(mapStateToProps, null)(EnterSummary);