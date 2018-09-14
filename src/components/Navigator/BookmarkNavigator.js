import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import BookPreview from "../../screen/Explore/BookPreview";
import EnterSummary from "../../screen/Explore/EnterSummary";
import ExploreSummaries from "../../screen/Explore/ExploreSummaries";
import Report from "../../screen/Explore/Report";
import VideoPreview from "../../screen/Explore/VideoPreview";
import MySpace from "../../screen/MySpace/MySpace";
import description from "../../screen/Explore/description";








class BookmarkNavigator extends Component {




    render() {
        return (<Navigator />
        )
    }
}
const Navigator = createStackNavigator(

    {
        MySpace: {

            screen: MySpace,



        },
        BookPreview: {

            screen: BookPreview,



        },
        AddSummary: {

            screen:EnterSummary,

        },
        ExploreSummaries: {

            screen:ExploreSummaries,

        },
      
        Report: {

            screen:Report,

        },
        Preview:{

        screen:VideoPreview,

        },

       description:{

        screen:description,

        },
         




    },


    {
        headerMode: "none",

        mode: "modal"

    },
    {
        initialRouteName: 'MySpace',
    }

);

export default BookmarkNavigator;