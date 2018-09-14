import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import BookPreview from "../../screen/Explore/BookPreview";
import Explore from "../../screen/Explore/Explore";
//import TextEditor from '../Summary/TextEditor';
import EnterSummary from "../../screen/Explore/EnterSummary";
import ExploreSummaries from "../../screen/Explore/ExploreSummaries";
//import SummaryPreview from "../../screen/Explore/SummaryPreview";
import Report from "../../screen/Explore/Report";
import VideoPreview from "../../screen/Explore/VideoPreview";
import description from "../../screen/Explore/description";
class ExploreBooksNavigator extends Component {




    render() {
        return (<Navigator />
        )
    }
}
const Navigator = createStackNavigator(

    {
        Explore: {

            screen: Explore,



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
        initialRouteName: 'Explore',
    }

);

export default ExploreBooksNavigator;