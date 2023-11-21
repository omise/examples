//
//  PayPayView.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/10/05.
//

import SwiftUI
import OmiseSDK

struct PayPayView: View {
    
    @SwiftUI.Environment(\.openURL) var openURL
    
    @State var amount: Int = 0
    @ObservedObject var viewModel = OmiseViewModel()
    
    @State var strRandom: String = ""
    @State var strErrormessage: String = ""
    @State private var showingAlert = false
    
    @State private var isDetailViewActive = false
    
    @State var path = NavigationPath()
    
    
    var body: some View {
        
        NavigationStack(path: $path) {
            ZStack {
                if viewModel.isProgress{
                    ActivityIndicator()
                        
                }
                VStack {
//                    ActivityIndicator(isAnimating: $viewModel.isProgress, hidesWhenStopped: true, style: .large, color: .purple)
                    HStack {
                        Spacer(minLength: 30)
                        Text("Amount")
                        TextField("Enter your score", value: $amount, format: .number)
                                        .textFieldStyle(.roundedBorder)
                                        .padding()
                    }
                    Button("Create Source and Charge at the same time for PayPay") {
                        Task {
                            await sendPayPayCharge(money: amount)
                        }
                    }
                    
                    Button("Create Source, then Charge for PayPay") {
                        Task {
                            await sendPayPayChargeAnother(money: amount)
                        }
                    }.alert(strErrormessage, isPresented: $showingAlert) {
                        Button("OK", role: .cancel) {
                            showingAlert = false
                        }
                    }
                    
                    
                }
                .onReceive(self.viewModel.$strRedirectUrl, perform: { strRedirectUrl in
                    if strRedirectUrl != ""{
                        
                        openURL(URL(string: strRedirectUrl)!)
                    }
                })
                
                
            }
            .navigationTitle("PayPay")
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: HomePath.self, destination: { appended in
                appended.Destination(strPaymentId: strRandom)
                    .navigationTitle(appended.toString)
                    .navigationBarTitleDisplayMode(.inline)
            })
            
        }
        
        
    }
    
    func sendPayPayCharge(money amount: Int) async {
        
        // return URLを作成
        strRandom = randomAlphanumericString(10)
        let returnUri = "omise-sample://paypay-return?paymentId="+strRandom
        
        viewModel.isProgress = true
        
        do {
            try await viewModel.postPayPayCharge(param: amount, strReturnUrl: returnUri, strPaymentId: strRandom)
            
            if let constError = viewModel.actionError{
                throw OmiseActionError.failParseWithMessage(error: constError)
            }
            
            path.append(HomePath.chargereturn)
        } catch OmiseActionError.invalidRequest {
            showingAlert = true
            strErrormessage = "Invalid Request"
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
        
        
//        isDetailViewActive = true
        
        viewModel.isProgress = false
        
//        redirectToPayPay()
        
    }
    
    func sendPayPayChargeAnother(money amount: Int) async {
        
        strRandom = randomAlphanumericString(10)
        let returnUri = "omise-sample://paypay-return?paymentId="+strRandom
        
        viewModel.isProgress = true
        
        do {
            try await viewModel.postPayPayAnother(param: amount, strReturnUrl: returnUri, strPaymentId: strRandom)
            
            if let constError = viewModel.actionError{
                throw OmiseActionError.failParseWithMessage(error: constError)
            }
            
            
            path.append(1)
        } catch OmiseActionError.invalidRequest {
            showingAlert = true
            strErrormessage = "Invalid Request"
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
//        finished = true
        
        
    }
    

}


struct PayPayView_Previews: PreviewProvider {
    static var previews: some View {
        PayPayView()
    }
}


