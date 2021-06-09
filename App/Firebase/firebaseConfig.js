import Firebase from 'firebase';

const firebaseConfig={
    apiKey:"AIzaSyBToRndkhMwp1D_rpiYSobLW_vxOxqK0eU",
    databaseURL:"https://mysportsapp-540f6-default-rtdb.firebaseio.com/",
    projectId:"mysportsapp-540f6",
    appId:"1:1005939727435:android:f20d18218b021face941ce"
};

export default Firebase.initializeApp(firebaseConfig);