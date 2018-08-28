// import React from 'react'

// import { connect } from 'react-redux';
// import { Provider } from 'react-redux';

// import configureStore from '../../store/ConfigureStore';
// import {MainStackNavigator} from '../../components/Navigator/MainStackNavigator'
// const store = configureStore();
// class Main extends React.Component {

    // ConfirmSignOut() {
    //     Alert.alert(
    //       'Sign Out',
    //       'Are you sure that you want to sign out',
    //       [
    //         {text: 'NO', 
    //         //onPress: () => console.warn('NO Pressed'),
    //          style: 'cancel'},
    //         {text: 'YES', onPress: () => {
    //        //console.warn('YES Pressed'),
    //         firebase.auth().signOut();
    //         facebookLogout();
        
    //     }}
    //       ]
    //     );
    //   }
    // state = { currentUser: null }
    // componentDidMount() {
    //     const { currentUser } = firebase.auth()
    //     this.setState({ currentUser })
    // }
//     render() {

//       //  const { currentUser } = this.state
//      return (
           
//         //         <View style={styles.container}>
//         //             <Text>
//         //                 Hi {currentUser && currentUser.email}!
//         // </Text>
//         // <CustomButton onPress={()=>this.ConfirmSignOut()}>signout</CustomButton>
//         //         </View>
//     <MainStackNavigator/>


//      // )
//      );
//  }}
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })
// const mapDispatchToProps = dispatch => {
//     return {
//         //onTryAuth: (authData,authMode )=> dispatch(tryAuth(authData,authMode))
//     };
// };
// const mapStateToProps = state => {
//     return {
//         // isLoading: state.ui.isLoading



//     };

// };
// export default connect(mapStateToProps, mapDispatchToProps)(Main);


///export default Main;