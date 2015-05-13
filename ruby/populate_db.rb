#!/usr/bin/env ruby

require 'rubygems'
require 'word_salad'
require 'optparse'
require 'omise'

options = {number: 1}
OptionParser.new do |opts|
  opts.banner = "Usage: populate_db.rb [options]"
  opts.on("-n=NUMBER", "--number=NUMBER", "A number of iterations that will be run", Integer) do |n|
    options[:number] = n
  end
  opts.on("-p=KEY", "--public=KEY", "Omise public key") do |pk|
    options[:public_key] = pk
  end
  opts.on("-s=KEY", "--secret=KEY", "Omise secret key") do |sk|
    options[:secret_key] = sk
  end
end.parse!

TEST_CARDS = [
  "4242424242424242", #Visa
  "4111111111111111", #Visa
  "5555555555554444", #MasterCard
  "5454545454545454"  #Mastercard
]

Omise.vault_key = options[:public_key]
Omise.api_key   = options[:secret_key]
Omise.api_url   = "http://api.lvh.me:3000"
Omise.vault_url = "http://vault.lvh.me:4500"

@customer_name = 2.words.map(&:capitalize).join(" ")
puts "CUSTOMER NAME: #{@customer_name}"

def create_token
  Omise::Token.create(
    card: {
      name: @customer_name,
      number: TEST_CARDS.sample,
      expiration_month: (rand(12) + 1).to_s,
      expiration_year: (Time.now.strftime("%Y").to_i + rand(1..10)).to_s,
      security_code: rand(999)
    }
  )
end

# Create an auto-captured charge
def create_charge(token)
  Omise::Charge.create(
    amount: rand(300000..500000),
    currency: "thb",
    card: token.id
  )
end

# Create a customer
def create_customer(token)
  Omise::Customer.create(
    email: "#{@customer_name.downcase.split.join(".")}@example.com",
    description: @customer_name,
    card: token.id
  )
end

# Update a Charge
def update_charge(charge)
  charge.update(description: 1.sentence)
end

# Create an authorized Charge
def create_authorized_charge(token)
  Omise::Charge.create(
    amount: rand(100000..900000),
    capture: "false",
    currency: "thb",
    card: token.id
  )
end

# Create a refund
def create_refund(auth_charge)
  Omise::Charge.retrieve(auth_charge.id).refunds
end

# Create a transfer
def create_transfer(balance)
  begin
    Omise::Transfer.create(amount: rand(balance.available))
  rescue Exception => e
    puts e.message
  end
end

puts "#### Start populating ####"

threads = []

options[:number].times.each do
  threads << Thread.new do
    puts "Create a Charge ..."
    create_charge(create_token)

    puts "Create a Customer ..."
    create_customer(create_token)

    puts "Create an authorized Charge ..."
    auth_charge = create_authorized_charge(create_token)

    puts "Create a Refund for '#{auth_charge.id}' ..."
    create_refund(auth_charge)

    puts "Update a Charge ..."
    charge = Omise::Charge.retrieve(Omise::Charge.list.to_a.sample.id)
    update_charge(charge)

    puts "Create a Transfer ..."
    create_transfer(Omise::Balance.retrieve)
  end
end

# Wait for threads to finish up
threads.each do |t|
  t.join
end

