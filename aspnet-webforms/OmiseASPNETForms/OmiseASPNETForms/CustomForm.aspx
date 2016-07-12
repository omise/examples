<%@ Page Language="C#" Inherits="OmiseASPNETForms.CustomForm" %>
<!DOCTYPE html>
<html>
<head runat="server">
	<title>Custom Form Example</title>
	<script src="https://code.jquery.com/jquery-3.1.0.slim.min.js"></script>
	<script src="https://cdn.omise.co/omise.js"></script>
	<script type="text/javascript">
		Omise.setPublicKey("<%= OmiseKeys.PublicKey %>");

		function SubmitForm(){
			var form = $("#form1");

			// Disable the submit button to avoid repeated click.
			form.find("input[type=submit]").prop("disabled", true);

			// Serialize the form fields into a valid card object.
			var card = {
				"name": form.find("[data-omise=holder_name]").val(),
				"number": form.find("[data-omise=number]").val(),
				"expiration_month": form.find("[data-omise=expiration_month]").val(),
				"expiration_year": form.find("[data-omise=expiration_year]").val(),
				"security_code": form.find("[data-omise=security_code]").val()
			};

			// Send a request to create a token then trigger the callback function once
			// a response is received from Omise.
			//
			// Note that the response could be an error and this needs to be handled within
			// the callback.
			Omise.createToken("card", card, function (statusCode, response) {
			if (response.object == "error") {
			  // Display an error message.
			  $("#token_errors").html(response.message);

			  // Re-enable the submit button.
			  form.find("input[type=submit]").prop("disabled", false);
			} else {
			  // Then fill the omise_token.
			  form.find("[name=omise_token]").val(response.id);

			  // Remove card number from form before submiting to server.
			  form.find("[data-omise=number]").val("");
			  form.find("[data-omise=security_code]").val("");

			  // submit token to server.
			  form.get(0).submit();
			};
			});

			// Prevent the form from being submitted;
			return false;
		}
	</script>
</head>
<body>
	<form id="form1" runat="server" onsubmit="return SubmitForm();">
		<asp:Label id="lblChargeResult"></asp:Label>
		<div id="token_errors"></div>
		<input type="hidden" name="omise_token">
		<div>
	    Name<br>
	    <input type="text" data-omise="holder_name">
	  	</div>
	  	<div>
	    	Number<br>
	    <input type="text" data-omise="number">
	  	</div>
	  	<div>
	    Date<br>
	    <input type="text" data-omise="expiration_month" size="4"> /
	    <input type="text" data-omise="expiration_year" size="8">
	  	</div>
	  	<div>
	    Security Code<br>
	    <input type="text" data-omise="security_code" size="8">
	  	</div>
	  	<input type="submit" id="checkout_button" value="Checkout !">
	</form>
</body>
</html>

