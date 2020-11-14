// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "../environment/config";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

//get models
import {User, Workspace, File} from '../models/models'

let db = firebase.firestore();

export default class UserService {
    constructor(){
    }

    static createUser(uid, name, email, callback){
        db.collection("users").doc(uid).set({
            //uid: uid,
            name: name,
            email: email
        })
        .then(() => {
            let user = new User(uid, name, email);
            callback(user);
        })
    }

    static getUser(uid, callback){
        db.collection("users").doc(uid).get().then((doc) =>{
            if(doc.exists){
                let data = doc.data();
                UserService.getUserWorkspaces(uid, (workspaces) =>{
                    let user = new User(uid, data.name, data.email, workspaces);
                    callback(user);
                } );
            }
            else {
                console.log("user does not exist")
            }
        })
    }

    static createUserWorkspace(uid, workspaceName, creation_date, callback){
        db.collection("users").doc(uid).collection("workspaces").add({
            name: workspaceName,
            creation_date: creation_date,
        })
        .then(docRef => {
            let workspace = new Workspace(docRef.id, workspaceName, creation_date);
            callback(workspace);
        })
        .catch((err) => {alert("could not create workspace")});
    }

    static getUserWorkspaces(uid, callback){
        db.collection("users").doc(uid).collection("workspaces").get().then((querySnapshot) =>{
                let workspaces = [];
               querySnapshot.forEach(function(doc){
                    let data = doc.data();
                    let workspace = new Workspace(doc.id, data.name, data.creation_date);
                    workspaces.push(workspace);
               }) 
                callback(workspaces)
        });
    }

}