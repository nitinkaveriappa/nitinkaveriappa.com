<?php
//Registers a new player into the player master table.
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	//Verifies Name is in valid format
	if(isset($_POST['Name']) && preg_match("/^[a-zA-Z0-9.' ]+$/",$_POST['Name'])  && strlen($_POST['Name']) < 35)
	{
		$inputName = $_POST['Name'];
	}
	else
	{
		header("Location:index.html?type=err");
	}
	//Verifies Email is in valid format
	if(isset($_POST['Email']) && preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/',$_POST['Email'])  && strlen($_POST['Email']) < 50)
	{
		$inputEmail = $_POST['Email'];
	}
	else
	{
		header("Location:index.html?type=err");
	}
	//Verifies Message is in valid format
	if(isset($_POST['Message']) && preg_match('/^[a-zA-Z0-9._!@ ]+$/',$_POST['Message']) && strlen($_POST['Message']) < 100)
	{
		$inputMessage = $_POST['Message'];
	}
	else
	{
		header("Location:index.html?type=err");
	}

	//Verifies the Google Recaptcha is set
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
			header("Location:index.html?type=err");
	}
	//If not a bot 	then tries to register the player
	else
	{
    $parts = explode("@", $inputEmail);
    $filename = $parts[0];
    $content = "$inputName \n $inputEmail \n $inputMessage";
		file_put_contents("formdata/$filename.txt",$content);
    header("Location:index.html?type=success");
	}
}
?>
