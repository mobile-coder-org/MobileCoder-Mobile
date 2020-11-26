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
        .catch(() => {
            console.log("error creating user");
        })
    }

    static getUser(uid, callback, nocontents){
        db.collection("users").doc(uid).get().then((doc) =>{
            if(doc.exists){
                let data = doc.data();
                UserService.getUserWorkspaces(uid, (workspaces) =>{
                    let user = new User(uid, data.name, data.email, workspaces);
                    callback(user);
                }, nocontents);
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

    static getUserWorkspaces(uid, callback, nocontents){
        db.collection("users").doc(uid).collection("workspaces").get().then((querySnapshot) =>{
               console.log("IN");
               let workspaces = [];
               let i = 0;
               let len = querySnapshot.size;
               querySnapshot.forEach(function(doc){
                    let data = doc.data();
                    console.log("got data");
                    UserService.getUserWorkspaceFiles(uid, doc.id, (files) => {
                        let workspace = new Workspace(doc.id, data.name, data.creation_date, files);
                        console.log(files);
                        workspaces.push(workspace);
                        i += 1;
                        if(i === len){
                            callback(workspaces)
                        }
                    }, nocontents)
               }) 
        })
        .catch((err) => console.log("error getting workspaces"));
    }


    static deleteUserWorkspace(uid, wid, callback){
        UserService.getUserWorkspaceFiles(uid, wid, (files) =>{
            let total = files.length;
            let count = 0;
            if(total == 0){
                db.collection("users").doc(uid).collection("workspaces").doc(wid).delete().then(() => {
                    callback(true)
                })
                .catch(() => callback(false))
                return;
            }
            for(let file of files){
                UserService.deleteUserWorkspaceFile(uid, wid, file.fid, (didDelete) => {
                    count += 1
                    if(count === total){
                        db.collection("users").doc(uid).collection("workspaces").doc(wid).delete().then(() => {
                            callback(true)
                        })
                        .catch(() => callback(false))
                    }
                })
            }
        })
    }

    static createUserWorkspaceFile(uid, wid, fileName, extension, contents, desktop_abs_path, callback){
        db.collection("users").doc(uid).collection("workspaces").doc(wid).collection("files").add({
            name: fileName,
            extension: extension,
            contents: contents,
            desktop_abs_path: desktop_abs_path
        })
        .then(docRef => {
            console.log("Getting data")
            //let data = docRef.data();
            console.log(docRef.id, fileName, extension, contents, desktop_abs_path);
            let file = new File(docRef.id, fileName, extension, contents, desktop_abs_path);
            callback(file);
        })
        .catch((err) => console.log("error creating file"));
    }

    static updateUserWorkspaceFile(uid, wid, fid, contents, callback){
        db.collection("users").doc(uid).collection("workspaces").doc(wid).collection("files").doc(fid).update({
            contents: contents,
        })
        .then(docRef => {
            callback(true);
        })
        .catch((err) => {
            console.log("error creating file");
            callback(false);
        });
    }

    static getUserWorkspaceFiles(uid, wid, callback, nocontents){
        db.collection("users").doc(uid).collection("workspaces").doc(wid).collection("files").get()
        .then((querySnapshot) => {
            let files = [];
            querySnapshot.forEach(function(doc){
                let data = doc.data();
                let contents = nocontents ? "" : data.contents;
                let file = new File(doc.id, data.name, data.extension, contents, data.desktop_abs_path);
                files.push(file);
            })
            callback(files);
        })
        .catch((err) => {console.log("error getting files");});
    }

    static getUserWorkspaceFileContent(uid, wid, fid, callback){
        db.collection("users").doc(uid).collection("workspaces").doc(wid).collection("files").doc(fid).get().then((doc) =>{
            let data = doc.data()
            callback(data.contents);
        })
        .catch(() => callback(undefined))
    }

    static deleteUserWorkspaceFile(uid, wid, fid, callback){
        db.collection("users").doc(uid).collection("workspaces").doc(wid).collection("files").doc(fid).delete().then(() =>{
            callback(true);
        })
        .catch(() => {
            callback(false);
        })
    }

    static overwriteFile(uid, wid, file, callback){
        UserService.deleteUserWorkspaceFile(uid, wid, file.fid, (didDelete) => {
            console.log(didDelete)
            if(didDelete){
                UserService.createUserWorkspaceFile(uid, wid, file.name, file.extension, "", "",  (file) => {
                    if(file){
                        callback(file);
                    }
                    else {                            
                        //alert
                        callback(undefined)
                    }
                })  
            }
            else{
                callback(undefined)
            }
        })
    }

}