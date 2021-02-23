<!DOCTYPE html>
<html lang="en-US">

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Medical Software</title>
    </head>

    <body>
        <h1>
            Provider Calendar
        </h1>
        <table>

            <!-- css code -->
            <style>

            table, td, th {
                width: 95%;
                height: 130;
                border: 1px solid black;
                border-collapse: collapse;
                font-size: x-large;
                table-layout: fixed;
            }
            
            td {
                text-align: left;
                vertical-align: top;
            }

            </style>
            <!-- css code -->

            <thead>
                <th colspan="7">
                    <p><span id="datetime"></span></p>

                        <script>
                            const today = new Date();
                            document.getElementById("datetime").innerHTML = today.toLocaleString('default', { month: 'long' });
                        </script>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <a href="../index.php">31</a>
                        <br>
                        <ul>
                            <li>
                                Note 1
                            </li>
                            <li>
                                Note 2
                            </li>
                        </ul>
                    </td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>
                        7
                        <br>
                        <ul>
                            <li>
                                Note 1
                            </li>
                            <li>
                                Note 2
                            </li>
                        </ul>
                    </td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                </tr>
                <tr>
                    <td>
                        14
                        
                        <br>

                        <ul>
                            <li>
                                Note 1
                            </li>
                            <li>
                                Note 2
                            </li>
                        </ul>
                    </td>
                    <td>15</td>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                    <td>19</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>
                        21
                        
                        <br>

                        <ul>
                            <li>
                                Note 1
                            </li>
                            <li>
                                Note 2
                            </li>
                        </ul>
                    </td>
                    <td>22</td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>26</td>
                    <td>27</td>
                </tr>
                <tr>
                    <td>
                        28
                    
                        <br>

                        <ul>
                            <li>
                                Note 1
                            </li>
                            <li>
                                Note 2
                            </li>
                        </ul>
                    </td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>