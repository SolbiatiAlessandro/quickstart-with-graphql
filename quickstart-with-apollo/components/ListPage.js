import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TouchableHighlight,
  FlatList,
  Modal,
  StyleSheet,
  Text
} from 'react-native'
import CreatePage from './CreatePage'

const allPostsQuery = gql`
  query {
    allPosts{
      id
      imageUrl
      description
    }
  }`


class ListPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
	  dataSource: [],
      modalVisible: false,
      user: undefined,
    }

  }

  render () {
    if (this.props.allPostsQuery.loading) {
      return (<Text>Loading</Text>)
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
        >
          <CreatePage
            onComplete={() => {
              this.props.allPostsQuery.refetch()
              this.setState({modalVisible: false})
          }}/>
        </Modal>

        <FlatList
          enableEmptySections={true}
          data={this.state.dataSource}
          renderItem={({ post }) => (
            <Post
              description={post.description}
              imageUrl={post.imageUrl}
            />
          )}
        />
        <TouchableHighlight
          style={styles.createPostButtonContainer}
          onPress={this._createPost}
        >
          <Text style={styles.createPostButton}>Create Post</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _createPost = () => {
    // this.props.router.push('/create');
    this.setState({modalVisible: true})

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  createPostButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostButton: {
    backgroundColor: 'rgba(39,174,96,1)',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  }
})

export default graphql(allPostsQuery, {name: 'allPostsQuery'})(ListPage)

