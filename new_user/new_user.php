<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Medical Software</title>
    </head>
    <body>
        <h1>Welcome, New User!</h1>
        <p>Make a new account below:</p>
        <form> <!--Collects user data, can be accessed later on using php/Java script-->
            <label for="firstName">First Name</label>
            <input type="text" id="firstName"><br>
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName"><br>
            <label for="newUsername">Username:</label>
            <input type="text" id="newUsername"><br>
            <label for="newPassword">Password:</label>
            <input type="password" id="newPassword"><br>
            <label for="newPassword2">Re-enter Password:</label>
            <input type="password" id="newPassword2"><br>
        </form>
        <button onclick="location.href='../index.php'">Create New User</button> <!--sends user back to login screen, 
            eventually will collect user data as well-->
    </body>
</html>