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
    @State var strErrormessage: String = ""
    @ObservedObject var viewModel = OmiseViewModel()
    @State private var isDetailViewActive = false
    @State private var showingAlert = false
    
    @State var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
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
                    }.alert(strErrormessage, isPresented: $showingAlert) {
                        Button("OK", role: .cancel) {
                            showingAlert = false
                        }
                    }
                    
                    
                }
                .onReceive(self.viewModel.$chargeId, perform: { chargeId in
                    if chargeId != ""{
                        self.isDetailViewActive = true
                        
                        
                    }
                }).navigationTitle("CreditCard Charge")
                .navigationBarTitleDisplayMode(.inline)
                .navigationDestination(for: HomePath.self, destination: { appended in
                    appended.Destination(strPaymentId: strRandom)
                        .navigationTitle(appended.toString)
                        .navigationBarTitleDisplayMode(.inline)
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
            
            if let constError = viewModel.actionError{
                throw OmiseActionError.failParseWithMessage(error: constError)
            }
            
            path.append(HomePath.chargereturn)
        } catch OmiseActionError.invalidRequest {
            showingAlert = true
            strErrormessage = "Invalid Request. Check your card or input information"
        } catch OmiseActionError.systemError {
            showingAlert = true
            strErrormessage = "System Error"
        } catch OmiseActionError.failParse {
            showingAlert = true
            strErrormessage = "Failed parse"
        } catch OmiseActionError.invalidResponse {
            showingAlert = true
            strErrormessage = "invalid response or no connection"
        } catch OmiseActionError.failMakeRequest {
            showingAlert = true
            strErrormessage = "Failed making request"
        } catch OmiseActionError.failParseWithMessage(let objError) {
            showingAlert = true
            strErrormessage = "Unexpected error: \(objError)."
        } catch {
            showingAlert = true
            strErrormessage = "Unexpected error: \(error)."
            
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
