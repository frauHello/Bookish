import React from 'react';
import {StyleSheet} from 'react-native';
import HTMLView from 'react-native-htmlview';
 export default class SummaryView extends React.Component {
    render() {
    const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;
  
      return (
        <HTMLView
          value={htmlContent}
          stylesheet={styles}
        />
      );
    }
  }
  const styles = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
  });