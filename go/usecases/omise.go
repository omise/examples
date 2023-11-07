package usecases

import (
	"ginrest/forms"
	"ginrest/models"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"

	"github.com/bitly/go-simplejson"
	"github.com/omise/omise-go"
	"github.com/omise/omise-go/operations"
)

var chargeModel = new(models.ChargeModel)

type OmiseUseCase struct{}

func (u OmiseUseCase) CreatePaymentChargeByAPI(form forms.CreatePayPayForm) (string, error) {

	client := &http.Client{}
	values := url.Values{}
	values.Set("amount", strconv.FormatInt(form.Amount, 10))
	values.Add("currency", form.Currency)
	values.Add("return_uri", form.ReturnURL)
	values.Add("source[type]", form.PaymentType)

	// 	var data = strings.NewReader(`{
	// 			"amount": "100",
	// 			"currency": "JPY",
	// 			"return_uri": "http://localhost:8000/omise/charge/paypay_return?payment_id=Z9Txj7uBwx",
	// 			"source[type]": "paypay"
	// 		}
	// `)
	req, err := http.NewRequest("POST", "https://api.omise.co/charges", strings.NewReader(values.Encode()))
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	// req.Header.Set("Content-Type", "application/json")
	req.SetBasicAuth(os.Getenv("OMISE_SEC_KEY"), "")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	defer resp.Body.Close()
	resBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	// []byte型からjson型へ変換
	json, err := simplejson.NewJson(resBytes)

	if err != nil {
		log.Fatal(err)
		return "", err
	}

	log.Println(json)

	authorizedUri, err := json.Get("authorize_uri").String()
	if err != nil {
		log.Fatal(err)
		return "", err
	}
	charge_id, err := json.Get("id").String()
	if err != nil {
		log.Fatal(err)
		return "", err
	}

	form.ChargeId = charge_id

	// データベースに保存して返却
	err = chargeModel.Create(form)

	if err != nil {
		log.Fatal(err)
		return "", err
	}

	// authorizedUri := ""

	return authorizedUri, nil

}

func (u OmiseUseCase) CreatePaymentCharge(form forms.CreatePayPayForm) (string, error) {

	client, err := omise.NewClient(
		os.Getenv("OMISE_PUB_KEY"),
		os.Getenv("OMISE_SEC_KEY"),
	)
	if err != nil {
		log.Fatalln(err)
		return "", err
	}

	result := &omise.Source{}

	// amount, _ := strconv.Atoi(form.Amount)

	err = client.Do(result, &operations.CreateSource{
		Amount:   form.Amount,
		Currency: form.Currency,
		Type:     form.PaymentType,
	})
	if err != nil {
		log.Fatalln(err)
		return "", err
	}
	log.Println(result)
	return "", nil
}

func (u OmiseUseCase) FetchCharge(form forms.FetchPayPay) (*omise.Charge, error) {

	payment, err := chargeModel.One(form.PaymentId)
	log.Println("aaabbb")
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}
	log.Println("aaabbbcccc")

	client, err := omise.NewClient(
		os.Getenv("OMISE_PUB_KEY"),
		os.Getenv("OMISE_SEC_KEY"),
	)
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}

	result := &omise.Charge{}
	err = client.Do(result, &operations.RetrieveCharge{payment.ChargeId})
	if err != nil {
		log.Fatalln(err)
	}

	log.Println(*result)

	return result, nil

}
