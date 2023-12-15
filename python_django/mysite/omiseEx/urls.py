from django.urls import path

from . import charge

urlpatterns = [
    path("", charge.index, name="index"),
    path('charge/credit_card', charge.creditCard, name='charge_credit_card'),
    path('charge_card_omise', charge.creditCardOmise, name='charge_credit_card_omise'),
    path('charge_card_omise_another', charge.creditCardOmiseAnother, name='charge_credit_card_omise_another'),
    path('charge/paypay', charge.paypay, name='charge_paypay'),
    
    path('charge/paypay_another', charge.paypayAnother, name='charge_paypay_another'),
    path('charge/paypay_return', charge.paypayReturn, name='charge_paypay_return'),
    path('charge/google', charge.google, name='charge_google'),

]