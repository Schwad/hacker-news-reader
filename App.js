import React, { Component } from 'react';
import { AppRegistry, Image, Linking, StyleSheet, ScrollView, Text, View, ActivityIndicator, ListView, TabNavigator, StackNavigator} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://schwaddy-news.herokuapp.com/api/v1/list_stories.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
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
          <Text style={styles.headline}>Breaking Tech News.</Text>
        </View>
        { this.state.dataSource.map((article) => (
          <View style={article.is_new == true ? styles.new_article : styles.article}>
            <View>
              <Image
                source={IMAGES[article.originplace]}
                style={ article.originplace == 'reddit' ? styles.reddit : styles.icon}
              />
            </View>
            <View key={article.created_at} style={styles.body}>
                <Text style={styles.title} onPress={() => Linking.openURL(article.href)}>{article.source}</Text>
                <Text style={styles.sub_line}>({article.originplace}) {article.points_text}</Text>
            </View>
            <View>
              <NewStory isNew={article.is_new}/>
            </View>
            <View>
              <PointsChange pointsChange={article.altering_of_the_points}/>
            </View>
          </View>
        ))}
      </ScrollView>
    )
  }
}

class NewStory extends Component {

  render() {
    const isNew = this.props.isNew;
    if (isNew == true) {
      return <Image source={require('./new.png')} style={ styles.new_story_image }/>;
    } else {
      return <Text></Text>;
    }
  }
}

class PointsChange extends Component {
  render() {
    const pointsChange = this.props.pointsChange;
    if (parseInt(pointsChange) > 0) {
      return <Text style={ styles.positive_change }>(+{pointsChange})</Text>;
    } else if ( parseInt(pointsChange) < 0) {
      return <Text style={ styles.negative_change }>({pointsChange})</Text>;
    } else {
      return <Text></Text>;
    }
  }
}

const IMAGES = {
  reddit: require('./reddit.png'),
  hackernews: require('./y.gif'),
  techmeme: require('./techmeme.png'),
}

const styles = StyleSheet.create({
  contentContainer: {
    borderTopWidth: 20,
    borderTopColor: '#FF6600',
    flexDirection: 'column',
  },
  positive_change: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  negative_change: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  reddit: {
    width: 43,
    height: 43,
    marginTop: 4,
  },
  new_story_image: {
    width: 35,
    height: 35
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: 5,
  },
  headline: {
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: '#FF6600',
    color: 'black',
  },
  sub_line: {
    marginLeft: 8,
    color: '#969696',
  },
  author: {
    fontStyle: 'italic',
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#23527C',
  },
  article: {
    marginTop: 12,
    flexDirection: 'row',
  },
  new_article: {
    marginTop: 12,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
  },
  body: {
    width: '73%',
  }
});

AppRegistry.registerComponent('HackerNewsReader', () => App);
