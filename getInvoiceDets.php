<?php

  // include './INCLUDE/db.inc';
  // include './INCLUDE/defines.php';
  include 'functions.php';
 

  // Original PHP code by Chirp Internet: www.chirp.com.au
  // Please acknowledge use of this code by including this header.

  class xmlResponse
  {

    function start()
    {
      header("Content-Type: text/xml");
      echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' . "\n";
      echo "<response>\n";
    }

    function command($method, $params=array(), $encoded=array())
    {
      echo "  <command method=\"$method\">\n";
      if($params) {
        foreach($params as $key => $val) {
          echo "    <$key>" . htmlspecialchars($val) . "</$key>\n";
        }
      }
      if($encoded) {
        foreach($encoded as $key => $val) {
          echo "    <$key><![CDATA[$val]]></$key>\n";
        }
      }
      echo "  </command>\n";
    }

    function end()
    {
      echo "</response>\n";
      exit;
    }

  }
  

  // white lists for table and field input values
  $allowed_tables = array('invoices', '');
  $allowed_fields = array('selCust', '');

  // validate script inputs
  if(!isset($_POST['table']) || !($table = $_POST['table']) || !in_array($table, $allowed_tables)) die();
  if(!isset($_POST['field']) || !($field = $_POST['field']) || !in_array($field, $allowed_fields)) die();
 // if(!isset($_POST['value'])) die();

  $value = $_POST['value'];
  
  $ad_phone = "";


  function isPresent($table, $field, $value)
  {
    $field_save = $field;
	if(!$value) return false;
	
    //
    // insert your SQL query and PHP code to check for duplicate values
    //
    // if a matching $value for $field exists in $table, return true;
    // otherwise, return false;
    $iPos1 = strpos($field, "selCust");
    if ($iPos1 > -1)
	  { 	$field =  "invoice";    
    }
	  
    $ad_id = 0;

    // Connect to the database
	  $mysqli = new mysqli(DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME);

	// output any connection error
	  if ($mysqli->connect_error) {
		    die('Error : ('.$mysqli->connect_errno .') '. $mysqli->connect_error);
	  }
	 
  	
    $query = "SELECT *  FROM $table WHERE $field = '" . $value . "';";

    $results = $mysqli->query($query);

    if ($results) {
      while($row = $results->fetch_assoc()) {	

				$ad_id = $row["invoice"];
				break;
			}
    }
    //
    

    // close connection 
    $mysqli->close();

	
	if ( intval($ad_id) > 0 )
	{   
		return true;
	}	
    else
	{	
		return false;
	}	
  }
  
  // Main ------------

  $xml = new xmlResponse();
  $xml->start();
  
 // $Num = preg_replace("/[^0-9]/", "", $field );

  // generate commands in XML format
  if (isPresent($table, $field, $value)) {
	  if (strpos($field, "selCust") > -1)
	  { 	$field =  "id";    }
	  if ( $table == "invoices" )
		{
		    
        $db2 = new DB_Query;
     //   $Host     = "localhost";
     //   $Database = "mfnz_AdminDB";
     //   $User     = "mfnz_admindb";
     //   $Password = $db2->GetPassword(); 

        $sSQL = "SELECT * FROM $table WHERE $field = '" . $value . "';";

	      $db2->query( $sSQL );
			
			while ( $db2->next_record()){
				$ad_phone = $db2->f("PhoneNo");
       
       
        if ( $ad_primary == "on" )
        {
          $ad_primary = "checked";
        }
        if ( $ad_primary == "0" )
        {
          $ad_primary = "";
        }
    
        $ad_receive = $db2->f("ReceiveEntryLists");  // receiving entry lists
    
				break;
			}
		}	
  // $xml->command('alert', array('message' => "Sorry, the $field '" . stripslashes($value) . "' is already in use!"));
  //  $xml->command('alert', array('message' => "this is a valid MFNZ No. " . $ad_name));
    // $xml->command('setdefault', array('target' => "field_{$field_save}"));
    $xml->command('setvalue', array('target' => "idPhone", 'value' => "$ad_phone"));
    $xml->command('setvalue', array('target' => "idPrimaryContactName", 'value' => "$ad_primaryname"));
	  $xml->command('setvalue', array('target' => "idEmail", 'value' => "$ad_email"));
	  $xml->command('setvalue', array('target' => "idPhone", 'value' => "$ad_phone"));
	  $xml->command('setvalue', array('target' => "chkPrimaryContact", 'value' => "$ad_primary"));
    $xml->command('setproperty', array('target' => "chkPrimaryContact", 'value' => "$ad_primary", 'property' => "checked" ));
	  $xml->command('setvalue', array('target' => "idSubmit", 'value' => "$ad_submit"));
    $xml->command('setvalue', array('target' => "idReceive", 'value' => "$ad_receive"));
    $xml->command('setvalue', array('target' => "idEmailRec", 'value' => "$ad_emailaddrsend"));
    if ( $ad_receive == "email" )
    {
      $xml->command('setstyle', array('target' => "emailreceive", 'value' => "inline", 'property' => "display" ));
      $xml->command('setstyle', array('target' => "idEmailRec", 'value' => "inline", 'property' => "display" ));
      $xml->command('setstyle', array('target' => "emailsend", 'value' => "inline", 'property' => "display" ));
    }
    else
    {
      $xml->command('setstyle', array('target' => "emailreceive", 'value' => "none", 'property' => "display" ));
      $xml->command('setstyle', array('target' => "idEmailRec", 'value' => "none", 'property' => "display" ));
      $xml->command('setstyle', array('target' => "emailsend", 'value' => "none", 'property' => "display" ));
    }

    if ( $ad_submit == "email" )
    {
      $xml->command('setstyle', array('target' => "idSendEmailText", 'value' => "inline", 'property' => "display" ));
    }
    else
    {
      $xml->command('setstyle', array('target' => "idSendEmailText", 'value' => "none", 'property' => "display" ));
    }


    $xml->command('setvalue', array('target' => "idOtherContacts", 'value' => "$ad_othercontacts"));
    $xml->command('setvalue', array('target' => "chkCerts", 'value' => "$ad_nameoncerts"));
    $xml->command('setproperty', array('target' => "chkCerts", 'value' => "$ad_nameoncerts", 'property' => "checked" ));
    $xml->command('setvalue', array('target' => "chkChamps", 'value' => "$ad_SIGChamps"));
    $xml->command('setproperty', array('target' => "chkChamps", 'value' => "$ad_SIGChamps", 'property' => "checked" ));
    $xml->command('setvalue', array('target' => "idChgBy", 'value' => "Record last changed by MFNZ No. $ad_chged_by"));
    $xml->command('setvalue', array('target' => "idChgDate", 'value' => "Last changed on $ad_chged_date"));
    $xml->command('setstyle', array('target' => "idChgBy", 'value' => "inline", 'property' => 'display' ));
    $xml->command('setstyle', array('target' => "idChgDate", 'value' => "inline", 'property' => 'display' ));


   // $xml->command('focus', array('target' => "txtComments1");
	
  }
  else
  {
   // $xml->command('alert', array('message' => "You have entered an invalid MFNZ No." . $Num)); 
    $xml->command('setvalue', array('target' => "idPhone", 'value' => "No data"));
    $xml->command('setvalue', array('target' => "idPrimaryContactName", 'value' => ""));
    $xml->command('setvalue', array('target' => "idEmail", 'value' => ""));
	  $xml->command('setvalue', array('target' => "idPhone", 'value' => ""));
	  $xml->command('setvalue', array('target' => "idPrimaryContact", 'value' => ""));
	  $xml->command('setvalue', array('target' => "idSubmit", 'value' => ""));
    $xml->command('setvalue', array('target' => "idReceive", 'value' => ""));
    $xml->command('setvalue', array('target' => "idEmailRec", 'value' => "$ad_emailaddrsend"));

    $xml->command('setstyle', array('target' => "emailreceive", 'value' => "none", 'property' => "display" ));
    $xml->command('setstyle', array('target' => "idEmailRec", 'value' => "none", 'property' => "display" ));
    $xml->command('setstyle', array('target' => "emailsend", 'value' => "none", 'property' => "display" ));

    $xml->command('setstyle', array('target' => "idSendEmailText", 'value' => "none", 'property' => "display" ));

    $xml->command('setvalue', array('target' => "idOtherContacts", 'value' => ""));
    $xml->command('setproperty', array('target' => "idPrimaryContact", 'value' => "", 'property' => "checked" ));
   
    
   // $xml->command('focus', array('target' => "field_{$field}"));
  }

  $xml->end();
?>