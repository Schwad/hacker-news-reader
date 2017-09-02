import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ActivityIndicator, ListView, TabNavigator, StackNavigator} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://newsapi.org/v1/articles?source=hacker-news&sortBy=latest&apiKey=5fc296ae756749138462a705f85cd805')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.articles,
        }, function() {
        });
      })
      .catch((error) => {
        console.log('ERROR:');
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        { this.state.dataSource.map((article) => (
          <View key={article.publishedAt}>
            <Text>Title: {article.title}</Text>
            <Text>Author: {article.author}</Text>
            <Text>Description: {article.description}</Text>
            <Text>Url: {article.url}</Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('HackerNewsReader', () => App);
