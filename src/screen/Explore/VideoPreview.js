import React, { Component } from 'react';
import { StyleSheet,View,TouchableWithoutFeedback,Text,Dimensions,Animated,PanResponder,TouchableOpacity } from 'react-native';
//import Icon from "react-native-vector-icons/FontAwesome";
import ProgressBar from 'react-native-progress/Bar';
import Video from 'react-native-video';
 import  {Icon} from "react-native-elements";

function secondsToTime(time) {

    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
  
  }
  var { width,height } = Dimensions.get('window');
class VideoPreview extends Component {

    constructor(props) {
        super(props);
      

    }
    state = {
        videoSource: null,
        paused:false,
        duration:0,
        progress:0,
        ended:false,
        
       
    }
    animated = new Animated.Value(0);
    componentDidMount() {
        this.setState({
        videoSource: this.props.navigation.state.params.videoSource


        })

    }
  componentWillMount(){
this.panResponder=PanResponder.create({
    onMoveShouldSetPanResponderCapture:()=>{
        this.triggerShowHide();
    return false;



    }
})


  }
    handleMainButtonTouch = () => {
       
        if (this.state.progress >= 1) {
    
          this.player.seek(0);
    
        }
    
    
    
        this.setState(state => {
    
          return {
    
            paused: !state.paused,
    
          };
    
        });
    
      };
    
    
    
      handleProgressPress = e => {
       
        const position = e.nativeEvent.locationX;
        const progress = (position / 250) * this.state.duration;
        const isPlaying = !this.state.paused;
        this.player.seek(progress);
    
      };
    
    
    
      handleProgress = progress => {
    
        this.setState({
    
          progress: progress.currentTime / this.state.duration,
    
        });
    
      };
    
    
    
      handleEnd = () => {
    
        this.setState({ paused: true,
        ended:true });
    
      };
    
    
    
      handleLoad = meta => {
    
        this.setState({
    
          duration: meta.duration,
    
        });
        this.triggerShowHide();
      };
    
     
    
    
    
      triggerShowHide = () => {
    
        clearTimeout(this.hideTimeout);
    
    
    
        Animated.timing(this.animated, {
    
          toValue: 1,
    
          duration: 100,
    
        }).start();
    
        this.hideTimeout = setTimeout(() => {
    
          Animated.timing(this.animated, {
    
            toValue: 0,
    
            duration: 300,
    
          }).start();
    
        }, 1500);
    
      };
  
    
    render() {
        const interpolatedControls = this.animated.interpolate({

            inputRange: [0, 1],
      
            outputRange: [48, 0],
      
          });
      
      
      
          const controlHideStyle = {
      
            transform: [
      
              {
      
                translateY: interpolatedControls,
      
              },
      
            ],
      
          };
    
let control=null;
if (this.state.ended){

    control=(

        <Animated.View style={styles.BackButton}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddSummary')}}>
        <Icon name='ios-arrow-back'
             size={60} type="ionicon" color="#e7e7d6" style={{ marginLeft: 200 }} />
        
        </TouchableOpacity>
       </Animated.View>
        
        );

}
else {


control=(
  

    <Animated.View style={[styles.controls, controlHideStyle]}>
                    <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
                    <Icon name={!this.state.paused?"pause":"play"}  type="font-awesome" size={30} color="#e7e7d6"/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.handleProgressPress}>
                  <View>
                      <ProgressBar  
                      width={250}
                      height={20}
                      borderColor="#e7e7d6"
                      progress={this.state.progress}
                      unfilledColor='rgba(231,231,214,0.5)'
                      color="#e7e7d6"
                       />
                  </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.duration}>{secondsToTime(Math.floor(this.state.progress*this.state.duration))}
                    </Text>
                    </Animated.View>
                  
    );


}

        return (
            <View style={styles.container}
            
            {...this.panResponder.panHandlers}
            
            >
               


                    <Video
                        source={{ uri: this.state.videoSource }}
                        paused={this.state.paused}
                        style={styles.backgroundVideo}
                        onLoad={this.handleLoad}
                        onProgress={this.handleProgress}
                        onEnd={this.handleEnd}
                        ref={ref=>this.player=ref}
                    />
                   {control}
                     
                </View>
            



        )

    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 250,
        backgroundColor: "#000",
        overflow: "hidden",
    },
   
      backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      controls: {

        backgroundColor: "rgba(0, 0, 0, 0.5)",
    
        height: 48,
    
        left: 0,
    
        bottom: 0,
    
        right: 0,
    
        position: "absolute",
    
        flexDirection: "row",
    
        alignItems: "center",
    
        justifyContent: "space-around",
    
        paddingHorizontal: 10,
    
      },
    
      mainButton: {
    
        marginRight: 15,
    
      },
      BackButton:{
       // backgroundColor: "rgba(0, 0, 0, 0.5)",
        // height:height,
        // width:width,
        
        alignItems: "flex-start",
        justifyContent: "flex-start",
        
        position: "absolute",
        left: 0,
    
          top: 0,
    
        right: 0,


      },
    
      duration: {
    
        color: "#e7e7d6",
    
        marginLeft: 15,
    
      },
      textShare:{

        color:'#bb5538',
        fontWeight:"bold",
        fontSize:20


      }
    
})


export default VideoPreview;

