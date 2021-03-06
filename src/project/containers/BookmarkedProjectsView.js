import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { getMyBookmark } from '../../profile/ProfileActions'

import BookmarkedProjectComponent from '../components/BookmarkedProjectComponent'

function mapStateToProps (state) {
  return {
      allBookmarks: state.profile.get('allBookmarks')
  }
}

function mapDispatchToProps (dispatch) {
  return {
      getMyBookmark: bindActionCreators(getMyBookmark, dispatch)  
  } 
}

class BookmarkedProjectsView extends Component {
  constructor(props) {
     super(props);
  
     this.onBackPressed = this.onBackPressed.bind(this)
  }

  onBackPressed() {
     Actions.pop()
  }

  componentWillMount() {
     this.props.getMyBookmark()
  }

  render() {
    return (
      <BookmarkedProjectComponent allBookmarks={this.props.allBookmarks}
                                  onBackPressed={this.onBackPressed}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedProjectsView)