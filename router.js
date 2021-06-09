import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SplashScreen from './App/Screens/SplashScreen';
import SignUp from './App/Screens/SignUpScreen';
import Login from './App/Screens/LoginScreen';
import DashboardScreen from './App/Screens/DashboardScreen';
import AddListModal from './App/Screens/AddListModal';
import ChatList from './App/Screens/ChatList';

const AuthStack = createStackNavigator({
    SplashScreen: SplashScreen,
    Login: Login,
    SignUp: SignUp,
}, {
    headerMode: 'none', initialRouteName: 'Login'
});

const DashStack = createStackNavigator({
    DashboardScreen: DashboardScreen,
    AddListModal: AddListModal,
    ChatList: ChatList
}, {
    headerMode: 'none', initialRouteName: 'DashboardScreen'
});
const App = createSwitchNavigator({
    Auth: AuthStack,
    Dashboard: DashStack
}, {
    initialRouteName: 'Auth'
});

export default createAppContainer(App);