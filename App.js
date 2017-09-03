import React from 'react';
import { AppRegistry, Linking, StyleSheet, ScrollView, Text, View, ActivityIndicator, ListView, TabNavigator, StackNavigator} from 'react-native';

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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.headline}>HackerNewsReader</Text>
        </View>
        <View>
          { this.state.dataSource.map((article) => (
            <View key={article.publishedAt} style={styles.article}>
                <Text style={styles.title} onPress={() => Linking.openURL(article.url)}>{article.title}</Text>
                <Text style={styles.author}> {article.author} </Text>
                <Text style={styles.description}>{article.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    // paddingVertical: 20,
    borderTopWidth: 20,
    borderTopColor: 'orange',
    // flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // height: '100%'
  },
  headline: {
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: 'orange',
    color: 'white',
  },
  description: {
    marginLeft: 8,
  },
  author: {
    fontStyle: 'italic',
    marginLeft: 5,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  article: {
    marginTop: 12,
    // marginLeft: 8,
    width: '95%',
  },
});

AppRegistry.registerComponent('HackerNewsReader', () => App);
