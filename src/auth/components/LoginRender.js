/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../authActions'
import * as globalActions from '../../global/globalActions'

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux'

import Header from '../../components/Header'
/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../components/ErrorAlert'
/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from '../components/LoginForm'
/**
 * The itemCheckbox will toggle the display of the password fields
 */
/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
}
from 'react-native'

import Dimensions from 'Dimensions'
var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation
import variables, { layout, font } from '../../styles/variables'
/**
 * The states were interested in
 */
import {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} from '../authConstants'

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    //paddingHorizontal: 20, 
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
})
/**
 * ## Redux boilerplate
 */

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}
/**
 * ### Translations
 */
class LoginRender extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain
      }
    }
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps (nextprops) {
    this.setState({
      value: {
        username: nextprops.auth.form.fields.username,
        email: nextprops.auth.form.fields.email,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain
      }
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange (value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email)
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password)
    }
    if (value.passwordAgain !== '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
    }
    this.setState(
      {value}
    )
  }
  /**
  *  Get the appropriate message for the current action
  *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
  *  @param actions the action for the message type
  */
  getMessage (messageType, actions) {
    let forgotPassword =
      <TouchableHighlight
        onPress={() => {
          actions.forgotPasswordState()
          Actions.ForgotPassword()
        }} >
        <Text>Нууц үгээ мартсан</Text>
      </TouchableHighlight>

    let alreadyHaveAccount =
      <TouchableHighlight
        onPress={() => {
          actions.loginState()
          Actions.Login()
        }} >
        <Text>Нэвтрэх</Text>
      </TouchableHighlight>

    let register =
      <TouchableHighlight
        onPress={() => {
          actions.registerState()
          Actions.Register()
        }} >
        <Text>Бүртгүүлэх</Text>
      </TouchableHighlight>

    switch (messageType) {
      case FORGOT_PASSWORD:
        return forgotPassword
      case LOGIN:
        return alreadyHaveAccount
      case REGISTER:
        return register
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render () {
    var formType = this.props.formType
    var loginButtonText = this.props.loginButtonText
    var onButtonPress = this.props.onButtonPress
    var displayPasswordCheckbox = this.props.displayPasswordCheckbox
    var leftMessageType = this.props.leftMessageType
    var rightMessageType = this.props.rightMessageType

    var passwordCheckbox = <Text />
    let leftMessage = this.getMessage(leftMessageType, this.props.actions)
    let rightMessage = this.getMessage(rightMessageType, this.props.actions)

    let self = this

    // display the login / register / change password screens
    this.errorAlert.checkError(this.props.auth.form.error)

    /**
     * Toggle the display of the Password and PasswordAgain fields
     */
    

    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */

    return (
      <View style={styles.container}>
            <Header isFetching={this.props.auth.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState} />

            <View style={styles.inputs}>
              <TouchableOpacity style={{ paddingHorizontal: 20, }} activeOpacity={0.8} onPress={this.props.onFacebookSignUp}>
                <View style={[layout.centerCenter, { height: 44, backgroundColor: '#3b5998', borderRadius: 5, }]}>
                  <Text style={[{ color: variables.BRAND_WHITE, fontSize: 13, fontFamily: font.regular, }]}>Sign up with Facebook</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, }} activeOpacity={0.8}>
                <View style={[layout.centerCenter, { height: 44, backgroundColor: variables.BRAND_COLOR, borderRadius: 5, }]}>
                  <Text style={[{ color: variables.BRAND_WHITE, fontSize: 13, fontFamily: font.regular, }]}>Sign up coming soon ...</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ paddingHorizontal: 20, paddingTop: 44, paddingBottom: 20, }} activeOpacity={0.8}>
                <View style={[layout.centerCenter, { height: 44, backgroundColor: '#efefef', borderRadius: 5, }]}>
                  <Text style={[{ color: variables.BRAND_BLACK, fontSize: 13, fontFamily: font.regular, }]}>Log in</Text>
                </View>
              </TouchableOpacity>
              {/*<LoginForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={self.onChange.bind(self)} />*/}
              
            </View>

            <View >
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{ fontSize: 13, color: variables.BRAND_GRAY, }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
      </View>
    )
  }
}
export default connect(null, mapDispatchToProps)(LoginRender)
