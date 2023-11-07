package models

import (
	"ginrest/db"
	"ginrest/forms"
	"log"
	"time"
)

//Article ...
type Payment struct {
	ID          int64      `db:"id, primarykey, autoincrement" json:"id"`
	ChargeId    string     `db:"charge_id" json:"charge_id"`
	PaymentId   string     `db:"payment_id" json:"payment_id"`
	PaymentType string     `db:"payment_type" json:"payment_type"`
	UpdatedAt   *time.Time `db:"updated_at" json:"updated_at"`
	CreatedAt   *time.Time `db:"created_at" json:"created_at"`
}

//ArticleModel ...
type ChargeModel struct{}

//Create ...
func (m ChargeModel) Create(form forms.CreatePayPayForm) (err error) {
	_, err = db.GetDB().Exec("INSERT INTO payments(charge_id, payment_id, payment_type, created_at, updated_at) VALUES(?, ?, ?, ?, ?)", form.ChargeId, form.PaymentId, form.PaymentType, time.Now(), time.Now())
	if err != nil {
		log.Fatalln(err)
		return err
	}
	return nil
}

//One ...
func (m ChargeModel) One(paymentId string) (payment Payment, err error) {
	err = db.GetDB().SelectOne(&payment, "SELECT * FROM payments WHERE payment_id=? LIMIT 1", paymentId)
	return payment, err
}
