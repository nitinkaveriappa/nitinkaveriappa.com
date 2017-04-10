function validate_form() {
  var name = document.getElementsByName("Name")[0].value;
  var email = document.getElementsByName("Email")[0].value;
  var message = document.getElementsByName("Message")[0].value;
  var errmsg = '';

  if(!(/^[A-z ]*$/.test(name)))
  {
    errmsg += "Name should contain only alphabets.\n"
    document.getElementsByName("Name")[0].value = "";
  }
	if(!(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{1,4}$/.test(email)))
	{
		errmsg += "Email is not of valid format.\n";
		document.getElementsByName("Email")[0].value = "";
	}
  if(!(/^[A-z0-9 ]*$/.test(message)))
  {
    errmsg += "Message should contain only alphabets and numbers.\n";
    document.getElementsByName("Message")[0].value = "";
  }
  if(name == '' || email == '' || message == '')
  {
    errmsg += "Please fill all the fields in the Contact Form to Submit.\n";
  }

  if(errmsg.length>1)
  {
    alert(errmsg);
    return false;
  }

  return true;
}
