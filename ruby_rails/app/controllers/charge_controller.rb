require "omise"
require 'securerandom'

class ChargeController < ApplicationController

  Omise.api_key = Rails.configuration.omise_secret_key
  Omise.public_api_key = Rails.configuration.omise_pub_key

  def index
  end

  def chargeCard

    strPaymentId = SecureRandom.alphanumeric(10)

    # At first, Create Token
    
    # Later, Create Charge
    @charge = Omise::Charge.create({
      amount: params[:amount],
      currency: "jpy",
      card: params[:token],
      return_uri: Rails.configuration.host + "/charge_return/" + strPaymentId, 
    })

    payment = Payment.create("charge_id": @charge["id"], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save

    render "charge/result"

  end

  def chargeCardOmise

    strPaymentId = SecureRandom.alphanumeric(10)

    @charge = Omise::Charge.create({
      amount: 100,
      currency: "jpy",
      card: params[:omiseToken],
      return_uri: Rails.configuration.host + "/charge_return/" + strPaymentId, 
    })

    payment = Payment.create("charge_id": @charge["id"], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save

    render "charge/result"

  end

  def chargeCardOmiseAnother

    strPaymentId = SecureRandom.alphanumeric(10)

    @charge = Omise::Charge.create({
      amount: params[:money],
      currency: "jpy",
      card: params[:omiseToken],
      return_uri: Rails.configuration.host + "/charge_return/" + strPaymentId, 
    })

    payment = Payment.create("charge_id": @charge["id"], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save

    render "charge/result"

  end
  
  # paypay
  def chargePayPay

    # Do PayPay by Curl
    chargeUrl = 'https://api.omise.co/charges'

    strPaymentId = SecureRandom.alphanumeric(10)

    postInput = {"amount": params[:money],
                  "currency": "jpy", 
                  "return_uri": Rails.configuration.host + "/charge_return/" + strPaymentId, 
                  "source[type]": "paypay"}

    uri = URI.parse(chargeUrl)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme === "https"
    
    req = Net::HTTP::Post.new(uri.path)
    req.basic_auth(Rails.configuration.omise_secret_key, "")
    req.set_form_data(postInput)
    response = http.request(req)
    
    charge = JSON.parse(response.body)

    payment = Payment.create("charge_id": charge["id"], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save
    
    redirect_to(charge["authorize_uri"], allow_other_host: true) 

  end

  def chargePayPayAnother

    # At first create Source
    source = Omise::Source.create({
      amount: params[:money],
      currency: "jpy",
      type: "paypay",
    })

    strPaymentId = SecureRandom.alphanumeric(10)


    # Later, create Charge
    charge = Omise::Charge.create({
      amount: params[:money],
      currency: "jpy",
      source: source[:id],
      return_uri: Rails.configuration.host + "/charge_return/" + strPaymentId, 
    })

    payment = Payment.create("charge_id": charge[:id], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save

    redirect_to(charge["authorize_uri"], allow_other_host: true) 

  end
  
  # google payment
  def chargeGoogle
    
    @charge = Omise::Charge.create({
      amount: "100",
      currency: "jpy",
      card: params[:card_id]
    })

    render "charge/result"

  end

  def returnCharge
    payment = Payment.find_by(payment_id: params[:payment_id])

    @charge = Omise::Charge.retrieve(payment.charge_id)

    render "charge/result"

  end  
end
