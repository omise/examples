//
//  PayPayReturn.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/10/03.
//

import SwiftUI

struct ChargeReturnView: View {
    
    var strPaymentId: String = ""
    @State var strChargeId: String = ""
    @State var strChargeStatus: String = ""
    @State var finished : Bool? = nil
    
    @ObservedObject var viewModel = OmiseViewModel()
    
    var body: some View {
        ZStack {
            if viewModel.isProgress{
                ActivityIndicator()
                
            }
            VStack {
                
                Text("Charge ID:" + strChargeId)
                
                Text("Charge Status:" + strChargeStatus)
                
                Button("ReSend Fetch Charge") {
                    Task {
                        await fetch()
                    }
                }
            }.onAppear {
                print("onAppear")
                Task {
                    await fetch()
                }
            }
        }
    }
    
    func fetch() async {
        print("\(strPaymentId) Started")
        
        viewModel.isProgress = true
        
        await viewModel.fetchChargeInfo(param: strPaymentId)
        
        viewModel.isProgress = false
        finished = true
        
        print("Charge Result")
        print(viewModel.dicOmise?["id"])
        print(viewModel.dicOmise?["status"])
        
        let tmpId = viewModel.dicOmise?["id"] ?? ""
        strChargeId = String(describing: tmpId)
        
        let tmpStatus = viewModel.dicOmise?["status"] ?? ""
        strChargeStatus = String(describing: tmpStatus)
    }
    
}


struct ChargeReturnView_Previews: PreviewProvider {
    static var previews: some View {
        ChargeReturnView()
    }
}
