$ ->
  Omise.setPublicKey 'pkey_test_501ol2d2iac7i5iefak'

  $('#checkout').submit ->
    $('#token_errors').html 'submitting...'
    form = $(this)
    # Disable the submit button to avoid repeated click.
    form.find('input[type=submit]').prop 'disabled', true
    # Serialize the form fields into a valid card object.
    card = 
      'name': form.find('[data-omise=name]').val()
      'number': form.find('[data-omise=number]').val()
      'expiration_month': form.find('[data-omise=expiration_month]').val()
      'expiration_year': form.find('[data-omise=expiration_year]').val()
      'security_code': form.find('[data-omise=security_code]').val()
    # Send a request to create a token then trigger the callback function once
    # a response is received from Omise.
    #
    # Note that the response could be an error and this needs to be handled within
    # the callback.
    Omise.createToken 'card', card, (statusCode, response) ->
      if response.object == 'error'
        # Display an error message.
        $('#token_errors').html response.message
        # Re-enable the submit button.
        form.find('input[type=submit]').prop 'disabled', false
      else if response.security_code_check == false
        $('#token_errors').html response.message
        # Re-enable the submit button.
        form.find('input[type=submit]').prop 'disabled', false
      else
        # Then fill the omise_token.
        form.find('[name=omise_token]').val response.id
        $('#token_errors').addClass('success').html 'Authorization Sucess. Redirecting to checkout page.'
        form.get(0).submit()
      return
    # Prevent the form from being submitted;
    false
