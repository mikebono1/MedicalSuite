<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Medical Software</title>
        <script src="scripts.js"></script>
        <link rel="stylesheet" type="text/css" href="stylesheet.css"> 
    </head>
    <body>
        <h1>Welcome!</h1>
        <p>Please enter your credentials:</p>
        <form>
                <label for="username">Username:</label>
                <input type="text" id="username"><br>
                <label for="password">Password:</label>
                <input type="password" id="password"><br><br>
        </form>
        <button onclick="authenticateLogin(1)">Login as Provider</button>
        <button onclick="authenticateLogin(2)">Login as Patient</button>
        <button onclick="authenticateLogin(3)">Login as Admin</button><br><br>
        <button onclick="location.href = 'new_user/new_user.php'">New User?</button>
        <p id="authenticationErrors"></p>
    </body>
</html>