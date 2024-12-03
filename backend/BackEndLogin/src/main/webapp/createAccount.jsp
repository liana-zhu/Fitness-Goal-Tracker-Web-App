<!DOCTYPE html>
<html>
<head>
    <title>Create Account</title>
</head>
<body>
    <h1>Create Account</h1>
    <form action="CreateAccountServlet" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required><br><br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required><br><br>
        <button type="submit">Create Account</button>
    </form>
</body>
</html>
