<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">
</script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script type="text/javascript">
function registeration()
{
    debugger;
    var username=document.getElementById("username").value;
    var password=document.getElementById("psw").value;
    var password1=document.getElementById("psw-repeat").value;
    debugger;
    $.ajax({
        type :'post',
        url :'http://localhost/codeigniter/index.php/Main',
        data :{username : username, password :password, password1 : password1,n : '1',action :'index'},
        success:function(response)
        {
            debugger;
            alert(response);
        },
        error: function(xhr,status,error)
        {
           alert("something wrong");
        }
    });
}
</script>
<style>

  body {
    background-color: lightblue;
    font-family: Aerial;
}

/* Add padding to containers */
.container {
    width:30%;
    height:60%;
    margin : 180Px 400Px;
    float: center;
    background-color: white;
    padding : 2px;
}

/* Full-width input fields */
input[type=text], input[type=password] {
    width :95%;
    padding: 10px;
    margin: 5px 0 0 0;
    border: none;
    background: #f1f1f1;
}



/* Set a style for the submit button */
button{
    width : 100%;
    padding :10px;
    background-color :green;
    color :ghostwhite;
}
/* Add a blue text color to links */
a {
    color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
    background-color: #f1f1f1;
    text-align: left;
    padding :5px;
}
</style>
</head>
<body ng-app="">

<form name="myform">
  <div class="container">
    <h1>Registeration</h1>
    <p>Please enter the details.</p>
    <label><b>Username</b></label><br>
    <input type="text" pattern="[a-z]{1,15}" placeholder="Enter the User name" 
    id="username" ng-model="set" required title="username contain only lowercase"><br>
    <p><label><b>Password</b></label><br>
    <input type="password" pattern="[1-9]{1,15}" placeholder="Enter Password" 
    id="psw" ng-model="set1" title="password contain only number max digit 15"
    required><br>
    <label for="psw-repeat"><b>Re-enter Password</b></label><br>
    <input type="password" pattern="[1-9]{1,15}" placeholder="Re-enter the Password"
     id="psw-repeat" ng-model="set2" title="password contain only number max digit 15"
     required><br>
    <button type="submit" ng-disabled=" !set ||!set1 ||!set2"class="registerbtn" onclick="registeration()">Register</button><br>

    <div class="">
            <p>Not a member? <a href="login">Login</a>.</p>
        </div> 
</div>
</form>

</body>
</html>