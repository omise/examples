package main

import (
	"fmt"
	"ginrest/controllers"
	"ginrest/db"
	"ginrest/forms"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

//CORSMiddleware ...
//CORS (Cross-Origin Resource Sharing)
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, x-access-token")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			fmt.Println("OPTIONS")
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}

//RequestIDMiddleware ...
//Generate a unique ID and attach it to each request for future reference or use
func RequestIDMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		uuid := uuid.New()
		c.Writer.Header().Set("X-Request-Id", uuid.String())
		c.Next()
	}
}

type JsonRequest struct {
	FieldStr  string `json:"field_str"`
	FieldInt  int    `json:"field_int"`
	FieldBool bool   `json:"field_bool"`
}

func main() {
	//Load the .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("error: failed to load the env file")
	}

	if os.Getenv("ENV") == "PRODUCTION" {
		gin.SetMode(gin.ReleaseMode)
	}

	//Start the default gin server
	r := gin.Default()

	//Custom form validator
	binding.Validator = new(forms.DefaultValidator)

	r.Use(CORSMiddleware())
	r.Use(RequestIDMiddleware())
	r.Use(gzip.Gzip(gzip.DefaultCompression))

	//Start PostgreSQL database
	//Example: db.GetDB() - More info in the models folder
	db.Init()

	charge := new(controllers.ChargeController)

	// v1 := r.Group("/v1")
	// {
	// 	/*** START USER ***/

	// 	v1.POST("/charge/paypay", charge.CreateByAPI)
	// 	v1.POST("/charge/paypay-another", charge.Create)

	// }

	// r.POST("/postjson", func(c *gin.Context) {
	// 	var json JsonRequest
	// 	if err := c.ShouldBindJSON(&json); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}
	// 	c.JSON(http.StatusOK, gin.H{"str": json.FieldStr, "int": json.FieldInt, "bool": json.FieldBool})
	// })

	// r.POST("/postjson2", func(c *gin.Context) {
	// 	var form forms.CreatePayPayForm
	// 	if err := c.ShouldBindJSON(&form); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}
	// 	c.JSON(http.StatusOK, gin.H{"test": "test"})
	// })

	// r.POST("/charge/paypay", func(c *gin.Context) {

	// 	var form forms.CreatePayPayForm
	// 	// var omiseUseCase = new(usecases.OmiseUseCase)

	// 	if err := c.ShouldBindJSON(&form); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}

	// 	log.Println(form)

	// 	// redirectUri, err := omiseUseCase.CreatePaymentChargeByAPI(form)
	// 	// if err != nil {
	// 	// 	c.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"message": "PayPay Charge could not be created"})
	// 	// 	return
	// 	// }

	// 	c.JSON(http.StatusOK, gin.H{"redirectUri": ""})
	// })

	r.POST("/charge/paypay", charge.CreateByAPI)
	r.POST("/charge/paypay-another", charge.Create)
	r.GET("/charge/:payment_id", charge.FetchCharge) // paypay課金情報を取得

	r.LoadHTMLGlob("./public/html/*")

	r.Static("/public", "./public")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"ginBoilerplateVersion": "v0.03",
			"goVersion":             runtime.Version(),
		})
	})

	r.NoRoute(func(c *gin.Context) {
		c.HTML(404, "404.html", gin.H{})
	})

	port := os.Getenv("PORT")

	log.Printf("\n\n PORT: %s \n ENV: %s \n SSL: %s \n Version: %s \n\n", port, os.Getenv("ENV"), os.Getenv("SSL"), os.Getenv("API_VERSION"))

	if os.Getenv("SSL") == "TRUE" {

		//Generated using sh generate-certificate.sh
		SSLKeys := &struct {
			CERT string
			KEY  string
		}{
			CERT: "./cert/myCA.cer",
			KEY:  "./cert/myCA.key",
		}

		r.RunTLS(":"+port, SSLKeys.CERT, SSLKeys.KEY)
	} else {
		r.Run(":" + port)
	}

}
