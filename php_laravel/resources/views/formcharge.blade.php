<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script type="text/javascript" src="https://cdn.omise.co/omise.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
<script async
src="https://pay.google.com/gp/p/js/pay.js"
onload="onGooglePayLoaded()"></script>
<script>

/**
 * An initialized google.payments.api.PaymentsClient object or null if not yet set
 *
 * @see {@link getGooglePaymentsClient}
 */
let paymentsClient = null;

/**
 * Define the version of the Google Pay API referenced when creating your
 * configuration
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
 */
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

/**
 * Card networks supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm card networks supported by your site and gateway
 */
const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

/**
 * Card authentication methods supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm your processor supports Android device tokens for your
 * supported card networks
 */
// const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
const allowedCardAuthMethods = ["PAN_ONLY"];


/**
 * Identify your gateway and your site's gateway merchant identifier
 *
 * The Google Pay API response will return an encrypted payment method capable
 * of being charged by a supported gateway after payer authorization
 *
 * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
 */
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'omise',
    'gatewayMerchantId': '{{ env('OMISE_PUBLIC_KEY') }}'
  }
};

/**
 * Describe your site's support for the CARD payment method and its required
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);


/**
 * Return an active PaymentsClient or initialize
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
function getGooglePaymentsClient() {
  if ( paymentsClient === null ) {
    paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
  }
  return paymentsClient;
}

/**
 * Configure your site's support for payment methods supported by the Google Pay
 * API.
 *
 * Each member of allowedPaymentMethods should contain only the required fields,
 * allowing reuse of this base request when determining a viewer's ability
 * to pay and later requesting a supported payment method
 *
 * @returns {object} Google Pay API version, payment methods supported by the site
 */
function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod]
      }
  );
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 *
 * Display a Google Pay payment button after confirmation of the viewer's
 * ability to pay.
 */
function onGooglePayLoaded() {
  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(function(response) {
        if (response.result) {
          addGooglePayButton();
          // @todo prefetch payment data to improve performance after confirming site functionality
          // prefetchGooglePaymentData();
        }
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
}
/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
function addGooglePayButton() {
  const paymentsClient = getGooglePaymentsClient();
  const button =
      paymentsClient.createButton({onClick: onGooglePaymentButtonClicked});
  document.getElementById('googlepay').appendChild(button);
}

/**
 * Show Google Pay payment sheet when Google Pay payment button is clicked
 */
function onGooglePaymentButtonClicked() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.loadPaymentData(paymentDataRequest)
      .then(function(paymentData) {
        // handle the response
        console.log(paymentData);
        console.log(paymentData.paymentMethodData.tokenizationData.token);
        var token = paymentData.paymentMethodData.tokenizationData.token;
        // document.getElementById('token').value = paymentData.paymentMethodData.tokenizationData.token;
        // document.getElementById('google_pay_form').submit();

//         processPayment(paymentData);

        Omise.setPublicKey("{{ env('OMISE_PUBLIC_KEY') }}");

        tokenParameters = {
          method: 'googlepay',
          data: token,

          // Add your billing information here (optional)
          billing_name: 'John Doe',
          billing_street1: '1600 Amphitheatre Parkway',
        };

        Omise.createToken('tokenization', tokenParameters, function(statusCode, response) {
          console.log(response)
          console.log(response.id)
          document.getElementById('card_id').value = response.id;
          document.getElementById('google_pay_form').submit();
        });
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    // @todo a merchant ID is available for a production environment after approval by Google
    // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    // merchantId: '01234567890123456789',
    merchantName: 'PRONTO Test Merchant'
  };
  return paymentDataRequest;
}


/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
function getGoogleTransactionInfo() {
  return {
    countryCode: 'JP',
    currencyCode: 'JPY',
    totalPriceStatus: 'FINAL',
    // set to cart total
    totalPrice: '100'
  };
}



</script>  
</head>

<body>
<div id="credit-card-manual">
Credit Card Charge:
<form>
Amount:<input type="text" name="money" oninput="value = value.replace(/[^0-9]+/i,'');"><br />
Name:<input type="text" name="name"><br />
Card Number:<input class="cc-num" id="cc_num" type="text" autocomplete="cc-number" inputmode="numeric" name="card_number" placeholder="4242 4242 4242 4242" style="width: 200px;" ><br />
Security Code:<input type="tel" name="security_code" oninput="value = value.replace(/[^0-9]+/i,'');" placeholder="333"><br />
expiration_month:<input type="tel" name="expired_month" oninput="value = value.replace(/[^0-9]+/i,'');" placeholder="09"><br />
expiration_year:<input type="tel" name="expired_year" oninput="value = value.replace(/[^0-9]+/i,'');" placeholder="2027"><br />
<input type="button" value="Pay" onclick="createToken()">
</form>
<form method=POST action="/create_charge" id="creditCardCharge" >
@csrf <!-- {{ csrf_field() }} -->
<input type="hidden" name="amount" id="credit_card_amount" value="" />
<input type="hidden" name="token" id="token" value="" />
</form>
</div>
<hr />
<div id="credit-card-opnpayment">
Credit Card Charge(Omise PreBuild Form):
<form method=POST action="/create_charge_omise">
@csrf <!-- {{ csrf_field() }} -->

<script type="text/javascript" src="https://cdn.omise.co/omise.js"
          data-key="{{ env('OMISE_PUBLIC_KEY') }}"
          data-amount="100"
          data-currency="JPY"
          data-default-payment-method="credit_card">
  </script>
</form>
</div>
<hr />

<div id="credit-card-opnpayment">
Credit Card Charge(Omise PreBuild Form another):

<form id="checkoutForm" method="POST" action="/create_charge_omise_another">
@csrf <!-- {{ csrf_field() }} -->
Amount:<input type="text" name="money" id="payment_amount" oninput="value = value.replace(/[^0-9]+/i,'');"> <br />

  <input type="hidden" name="omiseToken">
  <input type="hidden" name="omiseSource">
  <button type="submit" id="checkoutButton">Pay</button>
</form>
</div>
<hr />

<div id="paypay">
PayPay Charge(Create Source and Charge at the same time):
<form method=POST action="/charge_paypay">
@csrf <!-- {{ csrf_field() }} -->
Amount:<input type="text" name="money" oninput="value = value.replace(/[^0-9]+/i,'');"><br />
<input type="submit" value="Pay">
</form>
</div>
<hr />
<div id="paypay-another">
PayPay Charge(Create source, then Create Charge):
<form method=POST action="/charge_paypay_another">
@csrf <!-- {{ csrf_field() }} -->
Amount:<input type="text" name="money" oninput="value = value.replace(/[^0-9]+/i,'');"><br />
<input type="submit" value="Pay">
</form>
</div>
<hr />
<div id="googlepay">
Google Pay:
<form method=POST action="/charge_google" id="google_pay_form">
@csrf <!-- {{ csrf_field() }} -->
<input type="hidden" name="card_id" id="card_id" value="" />
</form>
</div> 
</body>
</html>

<script>
OmiseCard.configure({
  publicKey: "{{ env('OMISE_PUBLIC_KEY') }}"
});

var button = document.querySelector("#checkoutButton");
var form = document.querySelector("#checkoutForm");
var money = document.querySelector("#payment_amount").value;

button.addEventListener("click", (event) => {
  event.preventDefault();
  OmiseCard.open({
    amount: money,
    currency: "JPY",
    defaultPaymentMethod: "credit_card",
    onCreateTokenSuccess: (nonce) => {
        if (nonce.startsWith("tokn_")) {
            form.omiseToken.value = nonce;
        } else {
            form.omiseSource.value = nonce;
        };
      form.submit();
    }
  });
});

const ccInput = document.querySelector('[name="card_number"]');
ccInput.addEventListener("input", inputCreditCard);

function inputCreditCard(e) {
    // console.log(e.target.value);
    var v = e.target.value;
    v = v.replace(/[^0-9 ]+/i,'');
    if(v.length == 4 || v.length == 9 || v.length == 14){
      v = v + ' ';
    }
    e.target.value = v;
}

function createToken() {
  var cardNumber = document.querySelector('[name="card_number"]').value;
  var name = document.querySelector('[name="name"]').value;
  var money = document.querySelector('[name="money"]').value;
  var securityCode = document.querySelector('[name="security_code"]').value;
  var expiredMonth = document.querySelector('[name="expired_month"]').value;
  var expiredYear = document.querySelector('[name="expired_year"]').value;

  var form = document.querySelector("#creditCardCharge");

  Omise.setPublicKey("{{ env('OMISE_PUBLIC_KEY') }}");
  Omise.createToken("card",
  {
    "expiration_month": expiredMonth,
    "expiration_year": expiredYear,
    "name": name,
    "number": cardNumber.trim(),
    "security_code": securityCode,
  },
  function(statusCode, response) {
    // console.log(response["id"])

    document.querySelector('[name="amount"]').value = money;
    document.querySelector('[name="token"]').value = response["id"];

    form.submit();
  });
}  

</script>