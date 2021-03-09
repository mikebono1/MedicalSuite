<?php

#accesses correct user database
function accessUserDatabase($userId){
    $fileName = "../users\user_data\#" . $userId . ".txt";
    $fileHandle = fopen($fileName, "r");
    return $fileHandle;
}

#sets file pointer to where stored patient data begins, returns first line
function getPatientData($fileHandle){
    $lineContents = fgets($fileHandle);
    $finished = false;
    while($finished == false){
        if(preg_match("/p[0-9]/", $lineContents) != 1){
            $lineContents = fgets($fileHandle);
        }
        else{
            $finished = true;
        }
    }
    return $lineContents;
}

#returns the type of information contained in a line of data from user's database
function getDataType($lineContents){
    $startRead = strpos($lineContents, ".") + 1;
    $endRead = strpos($lineContents, "=");
    return substr($lineContents, $startRead, ($endRead - $startRead));
}

#reads patient identification number from a given string
function getPatientId($lineContents){
    $startRead = strpos($lineContents, "p") + 1;
    $endRead = strpos($lineContents, ".");
    $patientId = substr($lineContents, $startRead, ($endRead - $startRead));
    return $patientId;
}

#gets patients first and last name based on patients id
function patientFullName($userId, $patientId){
    $fileHandle = accessUserDatabase($userId);
    $lineContents = getPatientData($fileHandle);
    while(feof($fileHandle) == false){
        if($patientId == getPatientId($lineContents)){
            $startRead = strpos($lineContents, "=") + 1;
            $firstName = substr($lineContents, $startRead);
            $lineContents = fgets($fileHandle);
            $startRead = strpos($lineContents, "=") + 1;
            $lastName = substr($lineContents, $startRead);
            return trim($firstName . " " . $lastName);
        }
        else{
            $lineContents = fgets($fileHandle);
        }
    }
}

#grabs a single patient's data from user file and returns an html table
function createInduvidualTable($userId, $patientId){
    $fileHandle = accessUserDatabase($userId);
    $lineContents = getPatientData($fileHandle);
    $htmlTable = "<table><thead><tr><th>First Name</th><th>Last Name</th><th>Patient Notes</th></tr></thead><tbody><tr>";
    $htmlEndTable = "</tr></tbody></table>";
    
    #changes file pointer to correct patient in database
    while($patientId != getPatientId($lineContents)){
        $lineContents = fgets($fileHandle);
    }

    #compiles all of selected patient's data into a t
    while($patientId == getPatientId($lineContents)){
        $startRead = strpos($lineContents, "=") + 1;
        $htmlTable = $htmlTable . "<td>" . substr($lineContents, $startRead) . "</td>";
        $lineContents = fgets($fileHandle);
    }
    $htmlTable = $htmlTable . $htmlEndTable;
    fclose($fileHandle);
    return $htmlTable;
}

#grabs all patient data from user file and returns a full table in html
function createPatientTable($userId){
    $fileHandle = accessUserDatabase($userId);
    $lineContents = getPatientData($fileHandle);

    #defines the starting variables for the rest of the code to build the table off of
    $htmlTable = "<br><table><thead><tr><th>First Name</th><th>Last Name</th><th>Patient Notes</th></tr></thead><tbody><tr>";
    $htmlEndTable = "</tr></tbody></table>";
    $patientId = "1";
    
    #read each patient's data, and once a new patient is found by the file pointer, 
    #end the table row and create a new one
    while(feof($fileHandle) == false){
        #creates a new row if the patient id number has changed
        if($patientId != getPatientId($lineContents)){
            $htmlTable = $htmlTable . "</tr><tr>";
            $patientId = getPatientId($lineContents);
        }
        #if the datatype is a first name, make it a link to the patient's file
        if(getDataType($lineContents) == "FirstName"){
            $startRead = strpos($lineContents, "=") + 1;
            $htmlTable = $htmlTable . "<td>" . "<a href='provider_singlePatientView.html' onclick='setPatientIdCookie(" . $patientId . ")'>" . substr($lineContents, $startRead) . "</a></td>";
            $lineContents = fgets($fileHandle);
        }
        #if the datatype is not a first name, just add it to the table
        else{
            $startRead = strpos($lineContents, "=") + 1;
            $htmlTable = $htmlTable . "<td>" . substr($lineContents, $startRead) . "</td>";
            $lineContents = fgets($fileHandle);
        }
    }

    #close the file and return the completed table
    $htmlTable = $htmlTable . $htmlEndTable;
    fclose($fileHandle);
    return $htmlTable;
}

#searches user's database for patients matching search parameter and 
#returns first patient id that matches
function searchDatabase($userId, $searchParameter){
    #defines an array used later to store search results
    $i = 0;
    $array = array();

    $fileHandle = accessUserDatabase($userId);
    $lineContents = getPatientData($fileHandle);

    #modifies search paramter to regular expression to efficiently search database
    $searchParameter = "/" . $searchParameter . "/i";
    $searchResults = "";
    #searches through each line looking for a match to search parameter
    while(feof($fileHandle) == false){
        #if a line matches the search query, return patient's id
        if(preg_match($searchParameter, $lineContents) == 1){
            #determines the place where the patient id starts and stops in string
            $startRead = strpos($lineContents, "p") + 1;
            $endRead = strpos($lineContents, ".");
            #if this patient ID has already been added to the array, do not add it
            if(substr($lineContents, $startRead, ($endRead - $startRead)) == $searchResults){
                
            }
            #compiles each matching search result into an array
            else{
                $searchResults = substr($lineContents, $startRead, ($endRead - $startRead));
                $array[$i] = $searchResults . ", ";
                $i++;
            }
        }
        #advance file pointer one line down and repeat
        $lineContents = fgets($fileHandle);
    }
    fclose($fileHandle);
    #if there are matches, read them into a string to return
    if($i > 0){
        $returnString = "";
        for($i = 0; $i < count($array); $i++){
            $returnString = $returnString . $array[$i];
        }
        return $returnString;
    }
    #return an error if there are no matches
    else{
        return "Patient record not found";
    }    
}

#creates a new patient in the provider's database
function createNewPatient($userId, $patientFirstName, $patientLastName, $patientNotes){
    $fileName = "../users\user_data\#" . $userId . ".txt";
    $fileHandle = fopen($fileName, "r");
    
    #finds the total number of lines in the opened file
    $lineCount = 0;
    while(feof($fileHandle) == false){
        $lineContents = fgets($fileHandle);
        $lineCount ++;
    }
    #calculates the position of the patient user id in file
    $lineNumber = $lineCount - 2;
    #following 4 lines of code from https://stackoverflow.com/users/1268048/phil,
    #and they read the contents of a specific line in the .txt file
    $file = new SplFileObject($fileName);
    if (!$file->eof()) {
        $file->seek($lineNumber);
        $contents = $file->current(); #$contents holds the data in $lineNumber
    }
    fclose($fileHandle);

    #increment the patient's identification number by one
    $startRead = strpos($lineContents, "p") + 1;
    $endRead = strpos($lineContents, ".");
    $patientId = strval(intval(substr($contents, $startRead, ($endRead - $startRead))) + 1);

    #opens the users file for appending
    $fileHandle = fopen($fileName, "a+");
    #writes patient data to the file with correct labels
    fwrite($fileHandle, "p" . $patientId . ".FirstName=" . trim($patientFirstName) . "\n");
    fwrite($fileHandle, "p" . $patientId . ".LastName=" . trim($patientLastName) . "\n");
    if($patientNotes != ""){
        fwrite($fileHandle, "p" . $patientId . ".Notes=" . trim($patientNotes, "") . "\n");
    }
    fclose($fileHandle);
}