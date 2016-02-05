/**
 * 
 */
$(function () {
	$(document).tooltip();
});

function saveNameCookie(wrongPerson) {
	if(wrongPerson) {
		document.cookie = null;
	}
	
	document.getElementById("warningMessage").style.display = "none";
	document.getElementById("greetings").style.display = "none";

	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	var studentName = "";
	var greetingMsg = "";

	if (currentHour < 12) {
		greetingMsg = "Good Morning ";
	} else {
		currentHour = currentHour - 12;

		if (currentHour < 6) {
			greetingMsg = "Good Afternoon ";
		} else {
			greetingMsg = "Good Evening ";
		}
	}

	if (document.cookie) {
		var cookieNames = unescape(document.cookie);
		var cookieValues = cookieNames.split("=");
		studentName = cookieValues[1];
	}

	if ((document.cookie && (studentName == "null" || !studentName))
			|| !document.cookie) {
		studentName = window
				.prompt("Please enter your name", "Derick Coutinho");

		document.cookie = "name=" + escape(studentName);
	}

	if (studentName) {
		greetingMsg += "<strong>" + studentName + "</strong>"
				+ ", welcome to SWE642 Assignmet #3.<br><br>";
		greetingMsg += "Click <a href='javascript: wrongPerson()'>here</a> if you are not "
				+ studentName;

		document.getElementById("greetings").innerHTML = greetingMsg;
		document.getElementById("greetings").style.display = "block";
	} else {
		document.getElementById("warningMessage").style.display = "block";
		document.getElementById("greetings").style.display = "none";
	}
}

function wrongPerson() {
	document.cookie = "name = null; expires=Thu, 01-Jan-95 00:00:01 GMT";
	/*location.reload();*/
	saveNameCookie(true);
}

function submitSaveInfo() {
	var isNameNotValid = validateName();
	var isAddressNotValid = validateAddress();
	var isCheckBoxesNotChecked = validateCheckBoxesChecked();
	var isRadioNotSelected = validateRadioButtonSelected();
	var isEmailAddrValid = validateEmailAddress();

	if (!isNameNotValid && !isAddressNotValid && !isCheckBoxesNotChecked
			&& !isRadioNotSelected && !isEmailAddrValid) {
		document.getElementById("studentSurveyForm").submit();
	} else {
		document.getElementById("errorMessage").style.display = 'block';

		window.scrollTo(0, 0);
	}

	return false;
}

function validateName() {
	var onlyAlphabetsForName = /^[a-zA-Z]+$/;
	var lastName = document.getElementById("lastName").value;
	var firstName = document.getElementById("firstName").value;
	var middleName = document.getElementById("middleName").value;

	var isError = false;

	if (!lastName.match(onlyAlphabetsForName)) {
		document.getElementById("lastNameErrorDiv").innerHTML = "Please enter only alphabets.";
		document.getElementById("lastName").style.border = "2px solid red";
		document.getElementById("lastName").value = "";
		isError = true;
	} else {
		document.getElementById("lastNameErrorDiv").innerHTML = "";
		document.getElementById("lastName").style.border = "";
	}

	if (!firstName.match(onlyAlphabetsForName)) {
		document.getElementById("firstNameErrorDiv").innerHTML = "Please enter only alphabets.";
		document.getElementById("firstName").style.border = "2px solid red";
		document.getElementById("firstName").value = "";
		isError = true;
	} else {
		document.getElementById("firstNameErrorDiv").innerHTML = "";
		document.getElementById("firstName").style.border = "";
	}

	if (!middleName.match(onlyAlphabetsForName)) {
		document.getElementById("middleNameErrorDiv").innerHTML = "Please enter only alphabets.";
		document.getElementById("middleName").style.border = "2px solid red";
		document.getElementById("middleName").value = "";
		isError = true;
	} else {
		document.getElementById("middleNameErrorDiv").innerHTML = "";
		document.getElementById("middleName").style.border = "";
	}

	return isError;
}

function validateAddress() {
	var alphaNumericCharsForAddress = /^[0-9a-zA-Z ]$/;
	var addressField = document.getElementById("streetAddr").value;

	if (!addressField.match(alphaNumericCharsForAddress)) {
		document.getElementById("streetAddrError").innerHTML = "Please enter only appropriate numeric, alphabet or alphanumeric characters.";
		document.getElementById("streetAddr").style.border = "2px solid red";
		document.getElementById("streetAddr").value = "";

		return true;
	} else {
		document.getElementById("streetAddrError").innerHTML = "";
		document.getElementById("streetAddr").style.border = "";

		return false;
	}
}

function validateCheckBoxesChecked() {
	var selector = document.getElementsByTagName("input");
	var count = 0;

	for (var i = 0, l = (selector.length - 1); i <= l; i++) {
		if (selector[i].type == "checkbox" && selector[i].checked) {
			count++;
		}
	}

	if (count < 2) {
		document.getElementById("likeCheckboxError").innerHTML = "Please check at least 2 checkboxes.";
		document.getElementById("likieCheckBox").style.border = "2px solid red"
		return true;
	} else {
		document.getElementById("likeCheckboxError").innerHTML = "";
		document.getElementById("likieCheckBox").style.border = ""
		return false;
	}
}

function validateRadioButtonSelected() {
	var selector = document.getElementsByTagName("input");
	var count = 0;

	for (var i = 0, l = (selector.length - 1); i <= l; i++) {
		if (selector[i].type == "radio" && selector[i].checked) {
			count++;
		}
	}

	if (count < 1) {
		document.getElementById("interestRadioError").innerHTML = "Please select a radio button.";
		document.getElementById("interestRadio").style.border = "2px solid red"
		return true;
	} else {
		document.getElementById("interestRadioError").innerHTML = "";
		document.getElementById("interestRadio").style.border = ""
		return false;
	}
}

function validateEmailAddress() {
	var emailAddressVal = document.getElementById("emailAddr").value;
	var emailAddr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (!emailAddressVal.match(emailAddr)) {
		document.getElementById("emailAddrError").innerHTML = "Please enter a valid email address.";
		document.getElementById("emailAddr").style.border = "2px solid red";
		return true;
	} else {
		document.getElementById("emailAddrError").innerHTML = "";
		document.getElementById("emailAddr").style.border = "";
		return false;
	}
}

function calculateData() {
	var data = document.getElementById("dataField").value;
	var element = document.getElementById("dataError");
	element.innerHTML = "";

	var dataArry = data.split(",");
	var len = dataArry.length;

	if (len >= 10) {
		var sum = 0;
		var max = 0;
		var avg = 0;

		for (var inc = 0; inc < len; inc++) {
			var number = parseInt(dataArry[inc]);
			if (isNaN(number)) {
				element.innerHTML = "Please enter a valid number.";
				element.style.display = 'block';
				document.getElementById("avgData").innerHTML = "";
				document.getElementById("maxData").innerHTML = "";
				document.getElementById("dataField").style.border = "2px solid red";

				return;
			}

			if (number < 1 || number > 100) {
				element.innerHTML = "Please enter numbers between 1 & 100 only.";
				element.style.display = 'block';
				document.getElementById("avgData").innerHTML = "";
				document.getElementById("maxData").innerHTML = "";
				document.getElementById("dataField").style.border = "2px solid red";
				return;
			}

			sum = sum + number;

			max = Math.max(number, max);
		}

		avg = sum / len;

		document.getElementById("avgData").innerHTML = avg;
		document.getElementById("maxData").innerHTML = max;
		document.getElementById("dataField").style.border = "";
		element.style.display = 'none';
	} else {
		document.getElementById("avgData").innerHTML = "";
		document.getElementById("maxData").innerHTML = "";
		element.innerHTML = "Please enter at least 10 numbers.";
		document.getElementById("dataField").style.border = "2px solid red";
		element.style.display = 'block';
	}
}

// AJAX Call
function populateStateCity() {
	var zipCodeVal = document.getElementById("zipCode").value;
	document.getElementById("zipError").style.color = "black";
	document.getElementById("zipError").innerHTML = "Processing....";
	document.getElementById("zipError").style.display = "block";
	document.getElementById("zipCode").style.border = "";

	if (zipCodeVal.toString().length == 5) {
		document.getElementById("zipError").style.display = "none";
		try {
			var xmlHttpReq = new XMLHttpRequest();

			xmlHttpReq.onreadystatechange = function() {
				if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200) {
					var jsonZipCodes = JSON.parse(xmlHttpReq.responseText);

					for (var numZip = 0; numZip < 4; numZip++) {
						var zipCodesVal = jsonZipCodes.zipcodes[numZip];
						if (zipCodeVal == zipCodesVal.zip) {
							document.getElementById("cityDiv").innerHTML = zipCodesVal.city;
							document.getElementById("stateDiv").innerHTML = zipCodesVal.state;

							return true;
						} else {
							document.getElementById("cityDiv").innerHTML = "";
							document.getElementById("stateDiv").innerHTML = "";
						}
					}
					
					document.getElementById("zipCode").style.border = "2px solid red";
					document.getElementById("zipError").style.color = "red";
					document.getElementById("zipError").innerHTML = "Please enter a valid zip code.";
					document.getElementById("zipError").style.display = "block";
				}
			}

			xmlHttpReq.open("GET", "json/zipCodes.json", true);
			xmlHttpReq.send();
		} catch (exception) {
			return false;
		}
	} else if(zipCodeVal.toString().length == 0) {
		document.getElementById("zipError").style.display = "none";
	}
}

function clearAllErrors() {
	document.getElementById("errorMessage").style.display = 'none';	
	document.getElementById("lastNameErrorDiv").innerHTML = "";
	document.getElementById("lastName").style.border = "";
	document.getElementById("firstNameErrorDiv").innerHTML = "";
	document.getElementById("firstName").style.border = "";
	document.getElementById("middleNameErrorDiv").innerHTML = "";
	document.getElementById("middleName").style.border = "";
	document.getElementById("streetAddrError").innerHTML = "";
	document.getElementById("streetAddr").style.border = "";
	document.getElementById("likeCheckboxError").innerHTML = "";
	document.getElementById("likieCheckBox").style.border = ""
	document.getElementById("interestRadioError").innerHTML = "";
	document.getElementById("interestRadio").style.border = ""
	document.getElementById("emailAddrError").innerHTML = "";
	document.getElementById("emailAddr").style.border = "";
	document.getElementById("dataField").style.border = "";
	document.getElementById("zipError").style.display = "none";
	document.getElementById("cityDiv").innerHTML = "";
	document.getElementById("stateDiv").innerHTML = "";
	
	window.scrollTo(0, 0);
}