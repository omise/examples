//
//  CreditCardView.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/09/20.
//

import SwiftUI
import OmiseSDK

struct CreditCardView: View {
    @State var name = ""
    @State var amount = ""
    @State var cardNumber = ""
    @State var securityCode = ""
    @State var expiredMonth = ""
    @State var expiredYear = ""
    @State var strRandom: String = ""
    @ObservedObject var viewModel = OmiseViewModel()
    @State private var isDetailViewActive = false
    
    var body: some View {
        NavigationView {
            ZStack {
                if viewModel.isProgress{
                    ActivityIndicator()
                    
                }
                VStack {
                    
                    HStack {
                        Spacer(minLength: 30)
                        Text("Amount")
                        TextField("How much you need to pay", text: $amount)
                    }
                    HStack {
                        Spacer(minLength: 30)
                        Text("Name")
                        TextField("Input your name", text: $name)
                    }
                    HStack {
                        Spacer(minLength: 30)
                        Text("cardNumber")
                        TextField("Input your cardNumber", text: $cardNumber)
                    }
                    HStack {
                        Spacer(minLength: 30)
                        Text("securityCode")
                        TextField("Input your securityCode", text: $securityCode)
                    }
                    HStack {
                        Spacer(minLength: 30)
                        Text("expiredMonth")
                        TextField("Input card's expiredMonth", text: $expiredMonth)
                    }
                    HStack {
                        Spacer(minLength: 30)
                        Text("expiredYear")
                        TextField("Input card's expiredYear", text: $expiredYear)
                    }
                    Button("Send") {
                        Task {
                            await sendCharge(yourName: name, cardNumber: cardNumber, amount: amount, expMonth: expiredMonth, expYear: expiredYear, securityCode: securityCode)
                        }
                    }
                    NavigationLink(
                        destination: ChargeReturnView(strPaymentId: strRandom),
                        isActive: $isDetailViewActive
                    ) {
                        Text("").hidden()
                    }
                    
                }
                .onReceive(self.viewModel.$chargeId, perform: { chargeId in
                    if chargeId != ""{
                        self.isDetailViewActive = true
                        
                    }
                })
            }
            
        }
    }
    
    func sendCharge(yourName name: String,
                    cardNumber: String,
                    amount: String,
                    expMonth: String,
                    expYear: String,
                    securityCode: String
    ) async {
        
        strRandom = randomAlphanumericString(10)
        let returnUri = "omise-sample://paypay-return?paymentId="+strRandom
        
        viewModel.isProgress = true
        
        do {
            try await viewModel.postCreditCardCharge(param: Int(amount) ?? 0, strName: name, strCardNumber: cardNumber, expMonth: expMonth, expYear: expYear, secCode: securityCode, strReturlUrl: returnUri, strPaymentId: strRandom)
        }catch {
            print(error)
        }
        
        
        
        viewModel.isProgress = false
        
        
        return
    }
}



struct CreditCardView_Previews: PreviewProvider {
    static var previews: some View {
        CreditCardView()
    }
}
