package forms

import (
	"encoding/json"

	"github.com/go-playground/validator/v10"
)

type ChargeForm struct{}

type CreatePayPayForm struct {
	ChargeId    string `json:"charge_id"`
	PaymentId   string `json:"payment_id" binding:"required"`
	PaymentType string `json:"payment_type" binding:"required"`
	ReturnURL   string `json:"return_url" binding:"required"`
	Amount      int64  `json:"amount"`
	Currency    string `json:"currency" binding:"required"`
}

type FetchPayPay struct {
	PaymentId string `uri:"payment_id" binding:"required"`
}

//ChargeId ...
func (f ChargeForm) ChargeId(tag string, errMsg ...string) (message string) {
	switch tag {
	case "required":
		if len(errMsg) == 0 {
			return "Please enter the article title"
		}
		return errMsg[0]
	default:
		return "Something went wrong, please try again later"
	}
}

//PaymentId ...
func (f ChargeForm) PaymentId(tag string, errMsg ...string) (message string) {
	switch tag {
	case "required":
		if len(errMsg) == 0 {
			return "Please enter the article title"
		}
		return errMsg[0]
	default:
		return "Something went wrong, please try again later"
	}
}

//PaymentType ...
func (f ChargeForm) PaymentType(tag string, errMsg ...string) (message string) {
	switch tag {
	case "required":
		if len(errMsg) == 0 {
			return "Please enter the article title"
		}
		return errMsg[0]
	default:
		return "Something went wrong, please try again later"
	}
}

//Create ...
func (f ChargeForm) Create(err error) string {
	switch err.(type) {
	case validator.ValidationErrors:

		if _, ok := err.(*json.UnmarshalTypeError); ok {
			return "Something went wrong, please try again later"
		}

		for _, err := range err.(validator.ValidationErrors) {
			if err.Field() == "ChargeId" {
				return f.ChargeId(err.Tag())
			}
			if err.Field() == "PaymentId" {
				return f.PaymentId(err.Tag())
			}
			if err.Field() == "PaymentType" {
				return f.PaymentType(err.Tag())
			}
		}

	default:
		return "Invalid request"
	}

	return "Something went wrong, please try again later"
}
