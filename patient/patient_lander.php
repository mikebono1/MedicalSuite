<!DOCTYPE html>
<html lang="en-US">
    <!-- Home Page button -->
    <a href="../index.php">
        <button>Home Page</button>
    </a>
    <!-- Home Page button -->

    <br>
    <br>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Medical Software</title>
    </head>
    <body>
        <h1>Welcome, patient!</h1>
        <p>Get started:</p>
    </body>

    <table>

        <!-- css code -->
        <style>
        table, td {
            border: 1px solid black;
          }
        </style>
        <!-- css code -->

        <thead>
            <tr>
                <th colspan="2" scope="row">Directories</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <!-- gotta replace all the ../index.php with the proper directory links (they're just placeholders) -->
                <td><a href="patient_calendar.php">Calendar</a></td>
                <td><a onclick="alert('This feature does not yet exist.')" href="#">Log</a></td>
            </tr>
            <tr>
                <td><a onclick="alert('This feature does not yet exist.')" href="#">Video Call</a></td>
                <td><a onclick="alert('This feature does not yet exist.')" href="#">Schedule App.</a></td>
            </tr>
            <tr>
                <td><a onclick="alert('This feature does not yet exist.')" href="#">Database</a></td>
                <td><a onclick="alert('This feature does not yet exist.')" href="#">Options</a></td>
            </tr>
        </tbody>

    </table>

</html>