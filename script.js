//Calls each of the functions in some order to validate the form's fields
function validateForm (){
	event.preventDefault();
	let fname = validateControl(document.getElementById("fname"), "fname");
	let lname = validateControl(document.getElementById("lname"), "lname");
	let cvc = validateControl(document.getElementById("cvc"), "cvc");
	let card_name = validateControl(document.getElementById("card_name"), "card_name");
	let cvc_length = testLength(document.getElementById("cvc").value, 3);
	let expiry = validateDate(document.getElementById("expiry").value);
	let card_number = validateCreditCard(document.getElementById("card_number").value);
	let email = validateEmail(document.getElementById("email").value);
	let pickup_location = validateState(document.getElementById("pickup_location").selectedIndex);
	let drop_off_location = validateState(document.getElementById("drop_off_location").selectedIndex);
  	let car_type = validateCarType(document.getElementById("economy")) || 
  	 validateCarType(document.getElementById("compact")) ||  
  	 validateCarType(document.getElementById("standard")) ||  
  	 validateCarType(document.getElementById("full_size"));
  	 
  	 if(!car_type){
		alert("Please pick a car type!");
	}
  	 
	if (fname && lname && cvc && card_name && cvc_length && expiry && card_number && email && car_type && pickup_location && drop_off_location && pickup_time){
  		alert("Payment Submitted!");
	}
	return false;
	
}

//Test whether the control's value represents a number or string
function validateControl(control, name){
	if(name == "cvc"){
		if(testNumber(control.value)){
			return true;
		}
		else{
			alert("Error! CVC must be a number.");
			return false;
		}
	}
	else{
		if(!testNumber(control.value)){
			return true;
		}	
		else{
			alert("Error! Cannot be number.");
			return false;
		}
	} 
}

//Test whether the value represents a number
function testNumber(value){
	return(!isNaN(value));
}

//Test whether the value is the correct length
function testLength(value, length){
	return value.length == length;
}

//Tests if the value is greater than today's date
function validateDate (value){
	let date = value.split("-");
	let today = new Date();
	
	if(date[0]> today.getFullYear() || date[0] == today.getFullYear() && date[1] > today.getMonth()){
		return true;
	}
	else{
		alert("Date must be in the future.");
		return false;
	}
}

//Tests whether the credit card value represents a number
//Tests whether the first digit of the credit card value represents a valid credit card type
//Tests whether the credit card value is the correct lengt
function validateCreditCard(value) {
value = value.split(" ").join("");
  if (!testNumber(value)) {
    alert("Error! Not a number.");
    return false;
    }
  if (!(Number(value.charAt(0)) == 3 || Number(value.charAt(0)) == 6 || Number(value.charAt(0)) == 5 || Number(value.charAt(0)) == 4)) {
    alert("Error! Credit Card Number is invalid");
      return false;
  }
  if (Number(value.charAt(0) == 3)) { 
    if (!testLength(value, 15)) {
      alert("Error! Invalid Credit Card");
        return false;
      }
    }
    else {
      if (!testLength(value, 16)) {
        alert("Error! Invalid Credit Card");
          return false;
        }
    }
  return true;
  }

//Uses a Regular Expression (RegEx) to determine if the string value conforms to a typical email address
function validateEmail(value) {
	var regex = /\S+@\S+\.\S+/;
	if(!regex.test(value)){
		alert("Not a valid email!");
		return false;
	}
	return true;
}

//Tests whether a radio button is checked
function validateCarType(value) {
	return value.checked;
}

//Tests whether the Select State option is currently selected
function validateState(value) {
	if (value == 0){
		alert("Please select a state!");
		return false;
	}
	return true;
}


