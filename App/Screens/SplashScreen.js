import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, Alert, ScrollView, TextInput, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';
import { LoginUser } from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import FontsAw from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: 'lightgrey' }}>
<StatusBar backgroundColor="grey" barStyle="light-content" />
                <View style={{
                    backgroundColor: '#455A64', height: 400, marginTop: 0,
                    borderTopRightRadius: 100, borderTopLeftRadius: 100
                }}>

                    <View style={{
                        margin: 15,
                        backgroundColor: '#546E7A', height: 100, borderRadius: 50, marginTop: 120
                    }}>
                        <Text style={{ margin: 20, left: 20, fontSize: 20, fontFamily: 'Lemon-Regular' }}>To Organize efficeintly your day</Text>
                    </View>
                    <View style={{left:110, marginTop:55}}>
                        <Animatable.Image
                            duration={10000} resizeMode={'stretch'}
                            style={styles.logo}
                            source={require('../a1.jpg')}
                        />
                    </View>

                    <Text style={{fontSize: 20, fontFamily: 'Lemon-Regular',left:41,marginTop:10}} >
                        Stay connected with us !</Text>
                </View>
               

                <View style={{
                    marginTop: 280, alignItems: 'center', marginBottom: 5,
                    backgroundColor: 'white', borderBottomRightRadius: 50, borderBottomLeftRadius: 50
                }}>
                    <TouchableOpacity style={{ margin: 8, marginBottom: 5, }} onPress={() => { this.props.navigation.navigate('Login') }}>
                        <LinearGradient style={styles.teambutton} colors={['#455A64', 'antiquewhite']}>
                            <Text style={{ fontWeight: 'bold' }} >Get Started</Text>
                            <Feather name='chevron-right' color='darkslateblue' size={26} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                
                <View style={{height:20}}></View>
            </View>
        )
    }


}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.22;

const styles = StyleSheet.create({
    teambutton: {
        width: 220,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        flexDirection: 'row',
        margin: 5,
    },
    logo: {
        width: height_logo,
        height: height_logo,
        borderRadius:10,
       
    },
    logo2: {
        width: height_logo*2,
        height: height_logo/2,
        borderRadius:5,
    },
})
