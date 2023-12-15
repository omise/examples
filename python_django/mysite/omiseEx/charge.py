from django.shortcuts import render, redirect
from django import template
from django.conf import settings
from .models import Payment
import omise
import requests
import random, string

omise.api_public = settings.OMISE_PUBLIC_KEY
omise.api_secret = settings.OMISE_SECRET_KEY

apiURL = "https://api.omise.co/charges"

register = template.Library()

# settings value
@register.simple_tag
def settings_value(name):
    return getattr(settings, name, "")


def index(request):
    return render(request, 'charge_index.html')

def creditCard(request):

    strRandom = randomstr(10)

    # Create charge
    charge = omise.Charge.create(
        amount=request.POST["amount"],
        currency="jpy",
        return_uri= settings.SERVICE_HOST + "/omise/charge/paypay_return?payment_id=" + strRandom,
        card=request.POST["token"],
    )

    Payment.objects.create(charge_id=charge.id, payment_id=strRandom, payment_type="credit card")

    params = { 
        'charge': charge,
    }
    return render(request, 'charge_result.html', params)

# in case of using omise pre-build form
def creditCardOmise(request):

    strRandom = randomstr(10)

    # Create charge
    charge = omise.Charge.create(
        amount=100,
        currency="jpy",
        return_uri= settings.SERVICE_HOST + "/omise/charge/paypay_return?payment_id=" + strRandom,
        card=request.POST["omiseToken"],
    )

    Payment.objects.create(charge_id=charge.id, payment_id=strRandom, payment_type="credit card")

    params = { 
        'charge': charge,
    }
    return render(request, 'charge_result.html', params)


# in case of using omise pre-build form another
def creditCardOmiseAnother(request):

    strRandom = randomstr(10)

    # Create charge
    charge = omise.Charge.create(
        amount=request.POST["money"],
        currency="jpy",
        return_uri= settings.SERVICE_HOST + "/omise/charge/paypay_return?payment_id=" + strRandom,
        card=request.POST["omiseToken"],
    )

    Payment.objects.create(charge_id=charge.id, payment_id=strRandom, payment_type="credit card")

    params = { 
        'charge': charge,
    }
    return render(request, 'charge_result.html', params)

def paypay(request):

    strRandom = randomstr(10)
    
    files = {
        'amount': (None, request.POST["money"]),
        'currency': (None, "JPY"),
        'return_uri': (None, settings.SERVICE_HOST + "/omise/charge/paypay_return?payment_id=" + strRandom),
        'source[type]': (None, "paypay"),
    }
    
    # dataEncode = json.dumps(postInput)
    strSecret = omise.api_secret
    
    r = requests.post(apiURL, files=files, auth=requests.auth.HTTPBasicAuth(strSecret, ""))

    respDict = r.json()

    Payment.objects.create(charge_id=respDict["id"], payment_id=strRandom, payment_type="paypay")

    return redirect(respDict["authorize_uri"])



def paypayAnother(request):

    source = omise.Source.create(
        amount=request.POST["money"],
        currency="jpy",
        type="paypay",
    )

    strRandom = randomstr(10)

    charge = omise.Charge.create(
        amount=request.POST["money"],
        currency="jpy",
        source=source.id,
        return_uri=settings.SERVICE_HOST + "/omise/charge/paypay_return?payment_id=" + strRandom
    )

    Payment.objects.create(charge_id=charge.id, payment_id=strRandom, payment_type="paypay")

    return redirect(charge.authorize_uri)


def paypayReturn(request):
    payment = Payment.objects.get(payment_id=request.GET["payment_id"])

    charge = omise.Charge.retrieve(payment.charge_id)

    params = { 
        'charge': charge,
    }
    return render(request, 'charge_result.html', params)


def google(request):

    
    charge = omise.Charge.create(
        amount="100",
        currency="jpy",
        card=request.POST["card_id"],
    )

    params = { 
        'charge': charge,
    }
    return render(request, 'charge_result.html', params)

def randomstr(n):
   randlst = [random.choice(string.ascii_letters + string.digits) for i in range(n)]
   return ''.join(randlst)