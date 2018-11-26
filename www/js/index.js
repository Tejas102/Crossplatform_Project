
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
console.log(navigator.contacts);
}

// event listeners
document.addEventListener("deviceReady", connectToDatabase);
//document.getElementById("loginButton").addEventListener("click", loginButtonPressed);
document.getElementById("signupButton").addEventListener("click", signupButtonPressed);
document.getElementById("showButton").addEventListener("click", showButtonPressed);

// my functions go here  Insert
//========================
function signupButtonPressed() {
  // debug:
  console.log("Sign Up button pressed!");
  alert("Signup button pressed!");
//1. get data from ui'
 var e = document.getElementById("emailBox1").value;
 var p = document.getElementById("pwdBox1").value;
 var n = document.getElementById("nameBox").value;
 var d = document.getElementById("dobBox").value;
 var l = document.getElementById("locBox").value;

   console.log("Email : " +e);
   console.log("Password : " +p);
   console.log("Name : " +n);
   console.log("DOB : " +d);
   console.log("Location : " +l);



  //insert into tables
	//	"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, dob INTEGER, location  TEXT)",
  db.transaction(
  		function(tx){
  			tx.executeSql( "INSERT INTO users(email, password, name, dob, location) VALUES (?, ?, ?, ?, ?)",
  			[e, p, n, d, l],
  			onSuccessExecuteSql,
        onSuccess1,
  			onError )
  		},
  		onError,
  		onReadyTransaction
  	)
}

//========================
function loginButtonPressed() {
  // debug:
  console.log(" Login button pressed!");
  alert("Login button pressed!");
//1. get data from ui'
 var e = document.getElementById("emailBox").value;
 var p = document.getElementById("pwdBox").value;

   console.log("Email : " +e);
   console.log("Password : " +p);
alert("Email: " +e +"\n"+ "Password: "+p);
  //insert into tables
  db.transaction(
  		function(tx){
  			tx.executeSql( "SELECT * FROM users where email=? and password=?", [e, p],
  			 onSuccessExecuteSql,
         onSuccess,
  			onError )
  		},
  		onError,
  		onReadyTransaction
  	)
}
// ===============
function showButtonPressed() {
  //debug:
  console.log("show button pressed!");
  alert("show button pressed!");

  // select from table 1. run query
  db.transaction(
  		function(tx){
  			tx.executeSql( "SELECT * FROM users",
  			[],
  			displayResults,
  			onError )
  		},
  		onError,
  		onReadyTransaction
  	)
}
function displayResults( tx, results ){

  if(results.rows.length == 0) {
    alert("No records found");
    return false;
  }

  var row = "";
        for(var i=0; i<results.rows.length; i++) {
          document.getElementById("resultsSection").innerHTML +=
          "<p> Name: "
        +   results.rows.item(i).email
        + "<br>"
        + "Dept: "
        +   results.rows.item(i).password
        + "<br>"
        + ": "
        +   results.rows.item(i).name
        + "<br>"
        + "Location: "
        +   results.rows.item(i).location
        + "</p>";

        }

}
//====================================


// connect to a database
var db = null;



function connectToDatabase() {
  console.log("device is ready - connecting to database");
  // 2. open the database. The code is depends on your platform!
  if (window.cordova.platformId === 'browser') {
    console.log("browser detected...");
    // For browsers, use this syntax:
    //  (nameOfDb, version number, description, db size)
    // By default, set version to 1.0, and size to 2MB
    db = window.openDatabase("tynd", "1.0", "Database for Tynder Dating App", 2*1024*1024);
  }
  else {
    alert("mobile device detected");
    console.log("mobile device detected!");
    var databaseDetails = {"name":"tynd.db", "location":"default"}
    db = window.sqlitePlugin.openDatabase(databaseDetails);
    console.log("done opening db");
  }

  if (!db) {
    alert("databse not opened!");
    return false;
  }
// creating tables..
db.transaction(
		function(tx){
			// Execute the SQL via a usually anonymous function
			// tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
			// To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
			// to be used in the callbacks
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, dob INTEGER, location  TEXT)",
				[],
				onSuccessExecuteSql,
				onError
			)
		},
		onError,
		onReadyTransaction
	)
}

// some functions related to  the  creation of tables..!!
function onReadyTransaction( ){
  console.log( 'Transaction completed' )
}
function onSuccessExecuteSql( tx, results ){
  console.log( 'Execute SQL completed' )
  //alert("Email: " +e +"\n"+ "Password: "+p);
  //alert("yay ne yamma ochindhi");
  //window.location.href="userhome.html";
}
function onSuccess( tx, results ){
  console.log( 'Going Home Page' )
  alert("yay ne yamma ochindhi");
  window.location.href="userhome.html";
}
function onSuccess1( tx, results ){
  console.log( 'Going Home Page' )
  alert("yay ne yamma ochindhi");
  window.location.href="signup.html";
}
function onError( err ){
  console.log( err )
//  alert("modda gudshindhi");
}
