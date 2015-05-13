#!/usr/bin/env ruby
# how to run: 
#   ruby ./omise_export.rb
# 
# A script that demostrates the usage of Omise API to export your transactions
# This script will generate a csv file with name full_transactions.csv

require 'date'
require 'json'
 
# Update your valid Live Secret Key
skey = 'skey_xxxxxxxxxxxxxxxxxxx'
 
# Dates: Between April and May 2015
from = '2015-04-01'
to = '2016-06-01'
 
# Limiting to 10,000 records
limit = 10000


# No change required below
charges_raw = `curl -s https://api.omise.co/charges -X GET -u #{skey}: -d 'from=#{from}' -d 'to=#{to}' -d 'offset=0' -d 'limit=#{limit}'`;nil
charges = JSON.parse(charges_raw);nil

transactions_raw = `curl -s https://api.omise.co/transactions -X GET -u #{skey}: -d 'from=#{from}' -d 'to=#{to}' -d 'offset=0' -d 'limit=#{limit}'`;nil
transactions = JSON.parse(transactions_raw);nil

file = File.new('./full_transactions.csv', "w+")
file.write "Date,Charge Id,Status,Description,CC,Name,Last Digits,Amount,Fees,Vat,Net,Refund\n"
charges['data'].each do |charge|
  status = case charge["captured"]
  when true
    "Captured"
  when false
    "Failed"
  end
  if charge["refunds"]["data"].any?
    refund = charge["refunds"]["data"].map{|t| (t["amount"].to_f/100)}.inject(:+)
  else
    refund = ''
  end
  net_amount = (charge["amount"].to_f/100)
  if charge["transaction"] && (transaction = transactions["data"].find{|t| t["id"] == charge["transaction"]})
    amount = (transaction["amount"].to_f/100)
    fee = (net_amount - amount)
  else
    amount = 0
    fee = 0
  end
  date = DateTime.parse(charge['created'])
  date = date.to_time
  array = []
  array << date
  array << charge['id']
  array << status
  array << charge['description']
  array << charge['card']['brand']
  array << charge['card']['name']
  array << charge['card']['last_digits']
  array << amount
  array << fee.round(2)
  array << (fee * 0.07).round(2)
  array << net_amount
  array << refund
  file.write(array.join(",") + "\n")
end;nil
file.close
