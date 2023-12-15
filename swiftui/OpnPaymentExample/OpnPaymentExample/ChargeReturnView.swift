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
    @State var strErrormessage: String = ""
    @State private var showingAlert = false
    
    @ObservedObject var viewModel = OmiseViewModel()
    
    @State var path = NavigationPath()
    
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
            }.alert(strErrormessage, isPresented: $showingAlert) {
                Button("OK", role: .cancel) {
                    showingAlert = false
                }
            }
        }
    }
    
    func fetch() async {
        print("\(strPaymentId) Started")
        
        viewModel.isProgress = true
        
        do {
            try await viewModel.fetchChargeInfo(param: strPaymentId)
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
        finished = true
        
        print("Charge Result")
        print(viewModel.dicOmise?["id"] ?? "")
            print(viewModel.dicOmise?["status"] ?? "")
        
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
