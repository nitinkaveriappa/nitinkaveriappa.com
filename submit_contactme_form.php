<?php
//Verifies form, directs to success or contactme page
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	//Verifies the captcha is set
	if(isset($_POST['g-recaptcha-response']))
	{
		$captcha=$_POST['g-recaptcha-response'];
	}
	else
	{
		header("Location:index.html?type=err");
	}
//get captcha secret
	$config = parse_ini_file('config.php');
	$secret = $config['secret'];
	//Validates the captcha value from google server
	$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
	$data = json_decode($response);
	
	//If its a bot it redirects to index
	if($data->success==false)
     {
       header("Location:contactme.html?type=err");
     }
	//If not a bot 	then tries to login in player
	else
      {
		  header("Location:success.html");
	  }
}
?>