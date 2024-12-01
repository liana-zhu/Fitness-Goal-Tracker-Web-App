<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form action="LoginServlet" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Login</button>
    </form>
    <p><a href="forgotPassword.jsp">Forgot Password?</a></p>
    <p><a href="createAccount.jsp">Create Account</a></p>
    <p><a href="guest.jsp">Continue as Guest</a></p>
</body>
</html>
