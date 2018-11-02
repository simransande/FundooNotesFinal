<!DOCTYPE html>
<html>
    <head>
        <title>Login and Registration page</title>
    </head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">

    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

    <script type="text/javascript">
    function login()
    {
        debugger;
       var username =document.getElementById("username").value;
       var password =document.getElementById("password").value;
        debugger;
       $.ajax({
        type : 'post',
        url : 'http://localhost/codeigniter/index.php/Main',
        data:{username : username, password : password, n : '2', action : 'index'},
        success: function (response) {
            debugger;
       alert(response);
        },
        error: function (xhr, status, error) {
            alert("something wrong");
        }
      });

	
}
</script>
    <style>
        input {
            width :94%;
            padding : 04px 08px;
            margin: 8px 0;
            border: 2px solid black;
            
        }
        button{
            width :100%;
            padding : 04px 08px;
            margin: 8px 0;
           

        }
        body {
    background-color: lightblue;
}
.container{
    width:25%;
    height:60%;
    margin : 180Px 400Px;
    background-color:floralwhite;
    padding :2px;
    float: center;
}
a {
    color: dodgerblue;
}
.signin {
    background-color: #f1f1f1;
    text-align: right;
    padding :5px;
}
h1{
    text-align: center
}
h3{
    text-align: center
}
img {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
    </style>
    <body ng-app="">
        <form >
           <div class="container">
            <h1>Login:</h1>
        <label>Username</label><br>
        <input type ="text" id="username" pattern="[a-z]{1-15}" placeholder="Enter the user name"
         ng-model="set" title="username contain only lowercase" required><br>
        <label>Password</label><br>
        <input type ="password"  pattern="[1-9]{1,15}" id="password" 
        placeholder="Enter the password" ng-model="pw" 
        title="password contain only number max digit 15" required><br>
        <button  onclick="login()" >Login</button>
         <h3>Sign up with</h3>
         <a href="https://www.facebook.com/public/Fb-Login">
         <img src="Home/Pictures/fb.png" alt="fb" width="25" height="25">
        </a>
    <div class="signin">
            <p>Not a member? <a href="register">Sign up</a>.</p>
        </div> 
          </div>
        </form>
        </body>
</html>