import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Modal, FlatList, Animated, Alert, ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { UpdateUserImage, AddSubListss, UpdateSubListss } from '../Firebase/Users';
import Icon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/AntDesign';
import { Swipeable } from 'react-native-gesture-handler';


export default class UserListSublists extends React.Component {


    state = {
        showListVisible: false,
        listsName: '',
        completed: false,

        todos: '',
        subLists: []
    };

    async componentDidMount() {
        const uuid = Firebase.auth().currentUser.uid;
        const list = this.props.list;
        const ListId = list.ListId;

        Firebase.database().ref('/Lists').child(uuid).child(ListId).child('todos')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            ListSubName: child.val().todos,
                            completed: child.val().completed,
                            Id: child.val().Id

                        });

                    });
                    this.setState({ subLists: usersall });
                });

            });

    }

    createSublist = () => {
        const list = this.props.list;
        const ListId = list.ListId;

        AddSubListss('', ListId, this.state.todos, this.state.completed).
            then(() => {

                this.setState({ todos: "" });


            }).catch((error) => {
                alert(error);
            })

    };

    toggleTodoCompleted = item => {
        const uuid = Firebase.auth().currentUser.uid;
        let list = this.props.list;
        const ListId = list.ListId;
        const completed = item.completed;
        const completed2 = !completed;

        console.log(item.Id)
        console.log(ListId)

        UpdateSubListss(item.Id, ListId, completed2).
            then(() => {


            }).catch((er) => {
                alert(er)
            })


    };

    
    deleteList = (item) => {
        const list = this.props.list;
        const ListId = list.ListId;
        const uid=Firebase.auth().currentUser.uid;
        Firebase.database()
          .ref('Lists/' +uid+'/'+ ListId+'/todos/'+item.Id)
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
            <View style={{ alignItems: 'center', backgroundColor: 'silver' }}>
                <ScrollView>
                    <TouchableOpacity
                        onPress={this.props.closeModal}
                        style={{ position: 'absolute', top: 25, right: 40 }} >
                        <Text style={{ fontSize: 25, color: 'grey', fontWeight: 'bold' }} >X</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 60, borderColor: 'slategray', borderLeftWidth: 20, borderRightWidth: 20, borderRadius: 15 }}>
                        <TouchableOpacity onPress={() => this.toggleListModal()}
                            style={[styles.listContainer, { backgroundColor: ListColor }]}>

                            <View style={{ height: 50 }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{ListName}</Text>
                            </View>
                            <View>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 200, margin: 5, position: 'absolute', flexDirection: 'row' }}>
                        <TextInput placeholder='      lists' value={this.state.todos}
                            onChangeText={(text) => this.setState({ todos: text })}
                            style={{ borderWidth: 3, margin: 5, borderColor: 'lightgrey', width: 300 }} />
                        <TouchableOpacity onPress={() => this.createSublist()}
                            style={{ backgroundColor: ListColor, height: 56, margin: 5 }}>
                            <AIcon size={30} name='plus' style={{ marginTop: 10 }} />
                        </TouchableOpacity>

                    </View>


                    <View style={{ marginTop: 130 }}>


                        <FlatList
                            alwaysBounceVertical={false}
                            data={this.state.subLists}
                            style={{ padding: 20 }}
                            keyExtractor={(_, index) => index.toString()}

                            renderItem={({ item }) => (

                                <View style={{ margin: 7 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => this.toggleTodoCompleted(item)} >
                                            <Icon size={24} color='grey'
                                                style={{ width: 32 }}
                                                name={item.completed ? "ios-square" : "ios-square-outline"} />
                                        </TouchableOpacity>
                                        <Text style={{
                                            textDecorationLine: item.completed ? "line-through" : "none",
                                            color: item.completed ? 'grey' : 'black'
                                        }}>{item.ListSubName}</Text>
                                        <TouchableOpacity onPress={()=>this.deleteList(item)}>
                                        <Icon name='trash-outline' color='red' 
                                        style={{marginLeft:8,marginTop:4}}  size={14}/>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            )} />




                    </View>
                </ScrollView>
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
    addTodo: {
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16
    }
})