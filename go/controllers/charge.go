package controllers

import (
	"ginrest/forms"
	"ginrest/usecases"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

//ChargeController ...
type ChargeController struct{}

var omiseUseCase = new(usecases.OmiseUseCase)
var paypayForm = new(forms.ChargeForm)

func (ctrl ChargeController) CreateByAPI(c *gin.Context) {

	var form forms.CreatePayPayForm

	log.Println("errror")
	log.Println(c.Request)
	log.Println(c.Params)
	err := c.ShouldBindJSON(&form)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	log.Println(form)
	log.Println(form.PaymentId)
	log.Println(form.PaymentType)
	log.Println(form.Currency)
	log.Println(form.Amount)
	log.Println(form.ReturnURL)

	redirectUri, err := omiseUseCase.CreatePaymentChargeByAPI(form)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"message": "PayPay Charge could not be created"})
		return
	}

	// redirectUri := ""

	c.JSON(http.StatusOK, gin.H{"redirectUri": redirectUri})
}

func (ctrl ChargeController) Create(c *gin.Context) {

	var form forms.CreatePayPayForm

	if validationErr := c.ShouldBindJSON(&form); validationErr != nil {
		message := paypayForm.Create(validationErr)
		c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"message": message})
		return
	}

	redirectUri, err := omiseUseCase.CreatePaymentCharge(form)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"message": "PayPay Charge could not be created"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"redirectUri": redirectUri})
}

func (ctrl ChargeController) FetchCharge(c *gin.Context) {

	var form forms.FetchPayPay

	if validationErr := c.ShouldBindUri(&form); validationErr != nil {
		message := paypayForm.Create(validationErr)
		c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"message": message})
		return
	}

	charge, err := omiseUseCase.FetchCharge(form)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"message": "PayPay Charge could not be created"})
		return
	}

	c.JSON(http.StatusOK, charge)

}
