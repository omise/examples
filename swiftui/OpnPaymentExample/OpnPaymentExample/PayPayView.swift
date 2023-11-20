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
    
    @State private var isDetailViewActive = false
    
    
    var body: some View {
        
        NavigationView {
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
                            try await sendPayPayCharge(money: amount)
                        }
                    }
                    
                    Button("Create Source, then Charge for PayPay") {
                        Task {
                            try await sendPayPayChargeAnother(money: amount)
                        }
                    }
                    NavigationLink(
                        destination: ChargeReturnView(strPaymentId: strRandom),
                        isActive: $isDetailViewActive
                    ) {
                        Text("").hidden()
                    }
                }
                .onReceive(self.viewModel.$strRedirectUrl, perform: { strRedirectUrl in
                    if strRedirectUrl != ""{
                        self.isDetailViewActive = true
                        openURL(URL(string: strRedirectUrl)!)
                    }
                })
                
            }
            

        }.navigationBarTitle("PayPay")
        
        
    }
    
    func sendPayPayCharge(money amount: Int) async {
        
        // return URLを作成
        strRandom = randomAlphanumericString(10)
        let returnUri = "omise-sample://paypay-return?paymentId="+strRandom
        
        viewModel.isProgress = true
        
        do {
            try await viewModel.postPayPayCharge(param: amount, strReturnUrl: returnUri, strPaymentId: strRandom)
        }catch {
            
        }
        
        
        
        viewModel.isProgress = false
        
//        redirectToPayPay()
        
    }
    
    func sendPayPayChargeAnother(money amount: Int) async {
        
        strRandom = randomAlphanumericString(10)
        let returnUri = "omise-sample://paypay-return?paymentId="+strRandom
        
        viewModel.isProgress = true
        
        do {
            try await viewModel.postPayPayAnother(param: amount, strReturnUrl: returnUri, strPaymentId: strRandom)
        }catch{
            
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


