// The goal of this document is linking revision history of Firestore database
// security rules and codebase changes. These rules are set at:
// https://console.firebase.google.com/u/0/project/cup-of-sugar-1033b/database/firestore/rules

service cloud.firestore {
  match /databases/{database}/documents {

    // Custom functions
    function signedIn() {
        return request.auth != null;
    }

    function isAdmin() {
        return signedIn() &&
        	'ADMIN'in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles.values();
    }

    function isOwner() {
        return signedIn() && request.auth.uid == resource.data.userId;
    }

    function isSelf() {
    	    return signedIn() && request.auth.uid == resource.id;
    }

    // Rules
    match /users/{userId} {
        allow list: if isAdmin();
    	   allow get, update, delete: if isSelf() || isAdmin();
    	   allow create: if signedIn();
    }

    match /items/{itemId} {
        allow read;
        allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
        allow update, delete: if signedIn() && isOwner();
    }
    
}
}