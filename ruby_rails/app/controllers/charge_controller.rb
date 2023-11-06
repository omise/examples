require "omise"
require 'securerandom'

class ChargeController < ApplicationController

  Omise.api_key = Rails.configuration.omise_secret_key
  Omise.public_api_key = Rails.configuration.omise_pub_key

  def index
  end

  def chargeCard

    # まずは、tokenを作成する
    token = Omise::Token.create(card: {
      name: params[:name],
      number: params[:card_number].gsub(/\s+/, ""),
      expiration_month: params[:expired_month],
      expiration_year: params[:expired_year],
      security_code: params[:security_code]
    })

    # その後chargeを作成する
    @charge = Omise::Charge.create({
      amount: params[:money],
      currency: "jpy",
      card: token[:id]
    })

    render "charge/result"

  end

  def chargeCardOmise

    # その後chargeを作成する
    @charge = Omise::Charge.create({
      amount: 100,
      currency: "jpy",
      card: params[:omiseToken]
    })

    render "charge/result"

  end

  def chargeCardOmiseAnother

    # その後chargeを作成する
    @charge = Omise::Charge.create({
      amount: params[:money],
      currency: "jpy",
      card: params[:omiseToken]
    })

    render "charge/result"

  end
  
  # paypay
  def chargePayPay

    # PayPayはcurlで行う
    chargeUrl = 'https://api.omise.co/charges'

    strPaymentId = SecureRandom.alphanumeric(10)

    postInput = {"amount": params[:money],
                  "currency": "jpy", 
                  "return_uri": Rails.configuration.host + "/paypay_return/" + strPaymentId, 
                  "source[type]": "paypay"}

    uri = URI.parse(chargeUrl)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme === "https"
    
    req = Net::HTTP::Post.new(uri.path)
    req.basic_auth(Rails.configuration.omise_secret_key, "")
    req.set_form_data(postInput)
    response = http.request(req)
    
    # 一旦DBに保存する
    charge = JSON.parse(response.body)

    payment = Payment.create("charge_id": charge["id"], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save
    
    redirect_to(charge["authorize_uri"], allow_other_host: true) 

  end

  def chargePayPayAnother

    # まずは、sourceを作成する
    source = Omise::Source.create({
      amount: params[:money],
      currency: "jpy",
      type: "paypay",
    })

    strPaymentId = SecureRandom.alphanumeric(10)


    # その後chargeを作成する
    charge = Omise::Charge.create({
      amount: params[:money],
      currency: "jpy",
      source: source[:id],
      return_uri: Rails.configuration.host + "/paypay_return/" + strPaymentId, 
    })

    payment = Payment.create("charge_id": charge[:id], "payment_id": strPaymentId, "payment_type": "paypay")
    payment.save

    redirect_to(charge["authorize_uri"], allow_other_host: true) 

  end
  
  # google payment
  def chargeGoogle

    # google paymentはcurlで行う
    # tokenUrl = 'https://vault.omise.co/tokens'

    # postInput = {"tokenization[method]": "googlepay",
    #              "billing_name": "John Doe", 
    #              "billing_street1": "1600 Amphitheatre Parkway", 
    #              "tokenization[data]": params[:token]}

    # uri = URI.parse(tokenUrl)
    # http = Net::HTTP.new(uri.host, uri.port)
    # http.use_ssl = uri.scheme === "https"
    
    # req = Net::HTTP::Post.new(uri.path)
    # req.basic_auth(Rails.configuration.omise_pub_key, "")
    # req.set_form_data(postInput)
    # response = http.request(req)

    # # logger.debug("google payのリクエストをしました")
    # # logger.debug(response.code)
    # # logger.debug(response.body)
    # # logger.debug(response.body["id"])

    # token = JSON.parse(response.body)

    # logger.debug(token)
    # logger.debug(token[:id])
    # logger.debug(token["id"])

    # その後chargeを作成する
    @charge = Omise::Charge.create({
      amount: "100",
      currency: "jpy",
      card: params[:card_id]
    })

    render "charge/result"

  end

  def returnPayPay
    payment = Payment.find_by(payment_id: params[:payment_id])

    @charge = Omise::Charge.retrieve(payment.charge_id)

    render "charge/result"

  end  
end
