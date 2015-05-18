# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150516150330) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "cards", force: :cascade do |t|
    t.hstore   "card_data"
    t.integer  "token_id"
    t.integer  "customer_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "cards", ["customer_id"], name: "index_cards_on_customer_id", using: :btree
  add_index "cards", ["token_id"], name: "index_cards_on_token_id", using: :btree

  create_table "charges", force: :cascade do |t|
    t.string   "remote_id"
    t.integer  "amount"
    t.hstore   "response"
    t.string   "currency",    default: "thb"
    t.boolean  "authorized",  default: false
    t.boolean  "captured",    default: false
    t.integer  "customer_id"
    t.integer  "token_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "charges", ["customer_id"], name: "index_charges_on_customer_id", using: :btree
  add_index "charges", ["token_id"], name: "index_charges_on_token_id", using: :btree

  create_table "customers", force: :cascade do |t|
    t.string   "remote_id"
    t.boolean  "livemode",        default: false
    t.string   "location"
    t.string   "default_card_id"
    t.string   "email"
    t.string   "description"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "tokens", force: :cascade do |t|
    t.string   "remote_id"
    t.boolean  "used",       default: false
    t.boolean  "livemode",   default: false
    t.string   "location"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

end
