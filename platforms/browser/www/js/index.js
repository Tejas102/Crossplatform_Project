// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

// event listeners
//========================
document.addEventListener("deviceReady", connectToDatabase);
document.getElementById("saveButton").addEventListener("click",saveButtonPressed);
//document.getElementById("showButton").addEventListener("click", showButtonPressed);

// global variables
var db = null;

/*
1. open a connection to your database
2.  create a table

3.  write sql to do stuff  (select / insert / delete)
*/
// database specific functions
// ============================

function connectToDatabase() {
  console.log("device is ready - connecting to database");

  // 2. open the database. The code is depends on your platform!
  if (window.cordova.platformId === 'browser') {
    console.log("browser detected...");
    // For browsers, use this syntax:
    //  (nameOfDb, version number, description, db size)
    // By default, set version to 1.0, and size to 5MB
    db = window.openDatabase("haloo", "1.0", "Database for haloo app", 5*1024*1024);
  }
  else {
    alert("mobile device detected");
    console.log("mobile device detected!");

    var databaseDetails = {"email":"haloo.db", "location":"default"};
    db = window.sqlitePlugin.openDatabase(databaseDetails);
    console.log("done opening db");
  }

  if (!db) {
    alert("database not opened!");
    return false;
  }

  // 3. create relevant tables
  db.transaction(
    function(tx){
      // Execute the SQL via a usually anonymous function
      // tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
      // To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
      // to be used in the callbacks
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, passord TEXT)",
        [],
        onSuccessExecuteSql,
        onError
      );
    },
    onError,
    onReadyTransaction
  );
}

// my functions go here
//========================
function saveButtonPressed() {
  // debug:
  console.log("save button pressed!");
  alert("save button pressed!");

  // 1. get data from USER interface
  var n = document.getElementById("emailbox").value;
  var d = document.getElementById("passbox").value;
  //var s = document.getElementById("studentno").value;

  // DEBUG:
  console.log("email: " + n);
  console.log("pass: " + d);
  //console.log("Nostudents: " + s);

  // 2. INSERT INTO DATABASE
  db.transaction(
        function(tx){
      //INSERT INTO employees (email, pass) VALUES ("pritesh", "madt");
            tx.executeSql( "INSERT INTO users(email, pass) VALUES(?,?)",
            [n, d],
            onSuccessExecuteSql,
            onError );
        },
        onError,
        onReadyTransaction
    );
    }

// common database functions
function onReadyTransaction( ){
  console.log( 'Transaction completed' );
}
function onSuccessExecuteSql( tx, results ){
  console.log( 'Execute SQL completed' );
}
function onError( err ){
  console.log( err );
}
