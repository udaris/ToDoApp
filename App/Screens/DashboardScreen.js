import React, { useState } from 'react';
import {
    Text, StyleSheet, View, Image, FlatList, Alert, KeyboardAvoidingView, Modal,
    ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight
} from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { UpdateUserImage, AddListss } from '../Firebase/Users';
import AddListModal from './AddListModal'
import UserList from './ChatList'


export default class DashboardScreen extends React.Component {


    state = {
        addTodoVisible: false,
        loading: true,
        allLists: []
    };

    toggleAddToDoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    async componentDidMount() {
        const uuid = Firebase.auth().currentUser.uid;

        Firebase.database().ref('/Lists').child(uuid)
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            ListName: child.val().name,
                            UserId: child.val().uid,
                            ListColor: child.val().color,
                            ListId: child.val().Id
                        });

                    });
                    this.setState({ allLists: usersall });
                });

            });

    }

    renderList = list => {
        return <UserList list={list} />;
    }


    logOut = async () => {
        await Firebase.auth().signOut().then(() => {
            AsyncStorage.removeItem('UID');
            this.props.navigation.navigate('SplashScreen');
        }).catch((err) => {
            alert(err);
        })
    }

    toggleAddToDoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }


    render() {


        return (

            <View style={{ alignContent: 'center', alignItems: 'center', backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 40 }} >Todo APP</Text>
                <TouchableOpacity onPress={() => this.logOut()} >
                    <Text style={{ margin: 20, fontWeight:'bold',fontSize: 22 }} >LogOut</Text>
                </TouchableOpacity>

                <Modal animationType='slide'
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddToDoModal()} >

                    <AddListModal closeModal={() => this.toggleAddToDoModal()}
                    />
                </Modal>

                    <View style={{flexDirection: 'row', top: 20,
                        backgroundColor: 'lightgray', height: 100,width:'100%'}}>
                        <Text style={{ left: 100, fontSize: 50, color: 'black',fontFamily:'Lemon-Regular' }}>
                            Todo Lists</Text>

                    </View>

                    <View  >
                    <TouchableOpacity style={{ marginTop: 80, left: 95 }} onPress={() => this.toggleAddToDoModal()} >
                        <LinearGradient colors={['grey', 'antiquewhite']}
                            style={styles.teambutton}  >
                            <Text style={{fontFamily:'Lemon-Regular'}}> Add Lists </Text>

                        </LinearGradient>
                    </TouchableOpacity>

                    <View >

                        <FlatList
                            alwaysBounceVertical={false}
                            data={this.state.allLists}
                            style={{ padding: 20,marginRight:5 }}
                            keyExtractor={(_, index) => index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this.renderList(item)}
                            keyboardShouldPersistTaps="always"

                        />
                    </View>

                    <View style={{ height: 600, backgroundColor: 'grey' }}></View>

                </View>

            </View>



        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40
    },
    signIn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#fff'
    },
    divider: {
        backgroundColor: 'lightblue',
        height: 5,
        // flex: 1,

    },
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
        width: 220,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        margin: 5,
    },
})
