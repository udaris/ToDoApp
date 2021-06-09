import Firebase from './firebaseConfig';

export const AddUser = async (name, email, image, uid) => {
    try {
        return await Firebase.database().ref('users/' + uid)
            .update({
                name: name,
                email: email,
                image: image,
                uid: uid
            })

    } catch (error) {
        return error;
    }
}

export const AddListss = async (Id, name, color, todos, uid) => {
    try {
        const uid = Firebase.auth().currentUser.uid;
        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }

        let key2 = Firebase.database().ref().push().key;

        return await Firebase.database().ref('Lists/' + uid + '/' + key2)

            .update({
                Id: key2,
                name: name,
                color: color,
                todos: todos,
                uid: uid
            })

    } catch (error) {
        return error;
    }
}


export const AddSubListss = async (Id, ListId, todos, completed) => {
    try {
        const uid = Firebase.auth().currentUser.uid;
        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }

        let key2 = Firebase.database().ref().push().key;

        return await Firebase.database().ref('Lists/' + uid).child(ListId).child('todos').child(key2)

            .update({
                Id: key2,
                todos: todos,
                completed: completed

            })

    } catch (error) {
        return error;
    }
}


export const UpdateSubListss = (Id, ListId, completed) => {
    return new Promise(function (resolve, reject) {
       

        const uid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            completed: completed,

        };

       
            Firebase.database().ref('Lists/' + uid).child(ListId).child('todos').child(Id)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const submitTourlement = (Id, uid, TourlementName, Sport, Status) => {
    return new Promise(function (resolve, reject) {
        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            Id: key,
            uid: uuid,
            TourlementName: TourlementName,
            Sport: Sport,
            Status: Status
        };

        Firebase
            .database()
            .ref('tourelements/' + key)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};



export const UpdateUserImage = async (image, uid) => {
    try {
        return await Firebase
            .database()
            .ref('users/' + uid).
            update({

                image: image,

            });
    } catch (error) {
        return error;
    }
}
