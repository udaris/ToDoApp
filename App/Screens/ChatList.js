import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Modal, FlatList, Alert, ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { UpdateUserImage } from '../Firebase/Users';
import UserListSublists from './UserListSublists';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class UserList extends React.Component {


  state = {
    showListVisible: false,
    subLists: []
  };


  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  deleteList = (item) => {
    const list = this.props.list;
    const ListId = list.ListId;
    const uid=Firebase.auth().currentUser.uid;
    Firebase.database()
      .ref('Lists/' +uid+'/'+ ListId)
      .remove()
      .then(() => {

      }).catch(err => {
        console.log(err);
      })
  }


  render() {

    const list = this.props.list;
    const ListName = list.ListName;
    const ListId = list.ListId;
    const ListColor = list.ListColor;

    return (
      <View style={{ alignItems: 'center', marginLeft: 1 }}>
        <Modal animationType='slide'
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}>
          <UserListSublists list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <View style={{ right: 58, marginTop: 140, }}>

          <TouchableOpacity onPress={() => this.toggleListModal()}
            style={[styles.listContainer, {
              backgroundColor: ListColor,
              borderRadius: 25, borderWidth: 2, borderColor: '#455A64'
            }]}>


            <View style={{ height: 50 }}>
              <Text style={{
                fontSize: 20, margin: 5, left: 15,
                fontFamily: 'Lemon-Regular', color: 'white'
              }}>{ListName}</Text>
              <TouchableOpacity  onPress={()=>this.deleteList()}>
              <Icon name='trash-o' size={20} />
              </TouchableOpacity>
            </View>

            <View>



            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: 'red',
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 300

  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 8,
    margin: 10,
    width: 150,
  },

  teambutton: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
    flexDirection: 'row',
    margin: 5,
  },
})