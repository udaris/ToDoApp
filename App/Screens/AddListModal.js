import React, { Component } from 'react';
import {
  Text, StyleSheet, View, Image, Dimensions, Modal, ScrollView, SafeAreaView, KeyboardAvoidingView,
  TextInput, TouchableOpacity, FlatList
} from 'react-native';
import Firebase from '../Firebase/firebaseConfig';
import { SendMessage, RecieveMessage } from '../Firebase/Message';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UpdateUserImage, AddListss } from '../Firebase/Users';


class AddListModal extends Component {

  backgroundColor = ["yellow", 'rosybrown','mediumseagreen',"blue", 'darkturquoise','palevioletred', 'purple','plum', 'salmon','palegreen', 'red'];

  state = {
    name: "",
    color: this.backgroundColor[0]
  }

  renderColor() {
    return this.backgroundColor.map(color => {
      return (
        <TouchableOpacity key={color} style={[styles.colorSelect,
        { backgroundColor: color }]}
          onPress={() => this.setState({ color })} />
      )
    })

  }

  createTodo = () => {
    AddListss('', this.state.name, this.state.color, '', '').
      then(() => {
        alert("success")
        this.setState({ name: "" });
        this.props.closeModal();

      }).catch((error) => {
        alert(error);
      })

  };

  async componentDidMount() {

  }





  render() {

    return (

      <KeyboardAvoidingView style={styles.container} >
        <ScrollView>

          <View style={styles.container}>

          </View>

          <TouchableOpacity
            onPress={this.props.closeModal}
            style={{ position: 'absolute', top: 30, right: 40 }} >
            <Text style={{ fontSize: 25, color: 'grey', fontWeight: '800' }} >X</Text>
          </TouchableOpacity>

          <View style={{ alignSelf: 'stretch', marginHorizontal: 32, marginTop: 70 }}>
            <Text style={{ fontSize: 20 }}>Create New</Text>
            <TextInput style={styles.input}
            value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
              placeholder="List name" ></TextInput>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} >
              {this.renderColor()}</View>

            <TouchableOpacity onPress={()=>this.createTodo()}
              style={[styles.create, { alignItems: 'center', backgroundColor: this.state.color, height: 50, borderRadius: 30 }]}>
              <Text style={{ margin: 8, color: 'black', fontWeight: '600', fontSize: 18 }} >Create</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </KeyboardAvoidingView>

    );
  }
}
export default AddListModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fedac5',
  },
  circle: {
    width: 550,
    height: 550,
    borderRadius: 500 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  containerh: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514e5a',
  },
  input: {
    marginTop: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514e5a',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 16
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'blue',
    borderRadius: 6,
    height: 58,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    borderTopColor: 'grey',
    borderTopWidth: 0.1
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorSelect: {
    width: 25,
    height: 30,
    borderRadius: 4
  }
});
