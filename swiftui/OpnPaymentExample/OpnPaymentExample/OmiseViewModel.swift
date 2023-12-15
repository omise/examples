//
//  OmiseViewModel.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/10/05.
//

import Foundation
import OmiseSDK

final class OmiseViewModel: ObservableObject, Equatable {
    
    static func == (lhs: OmiseViewModel, rhs: OmiseViewModel) -> Bool {
        if lhs.isProgress != rhs.isProgress || lhs.strRedirectUrl != rhs.strRedirectUrl{
            return true
        }else{
            return false
        }
        
    }
    
    
    private let model = OmiseModel()
    @Published var isProgress: Bool = false
    @Published var strRedirectUrl: String = ""
    @Published var chargeId: String = ""
    @Published var dicOmise: [String: Any]?
    @Published var actionError: Error?
    
    func postCreditCardCharge(param intAmount: Int, strName: String, strCardNumber: String, expMonth: String, expYear: String, secCode: String, strReturlUrl: String, strPaymentId: String) async throws {
        
        model.setupClient()
        try await model.chargeCreditCard(param: intAmount, strName: strName, strCardNumber: strCardNumber, expMonth: expMonth, expYear: expYear, securityCode: secCode, strReturnUrl: strReturlUrl, strPaymentId: strPaymentId, completion: completionCharge)
        
    }
    
    func postPayPayCharge(param intAmount: Int, strReturnUrl: String, strPaymentId: String) async throws {
        
        try await model.chargePayPay(param: intAmount, strReturnUrl: strReturnUrl, strPaymentId: strPaymentId, completion: completionPayPay)
        
    }
    
    func postPayPayAnother(param intAmount: Int, strReturnUrl: String, strPaymentId: String) async throws {
        
        model.setupClient()
        try await model.chargePayPayAnother(param: intAmount, strReturnUrl: strReturnUrl, strPaymentId: strPaymentId, completion: completionPayPay)
        
    }
    
    
    func fetchChargeInfo(param strPaymentId: String) async throws {
        
        try await model.fetchPayPay(param: strPaymentId, completion: completionPayPay)
    }
    
    
    func completionPayPay(data objData: [String : Any]?, error: Error?) {
        
        actionError = error
        
        self.dicOmise = objData
        
        let objRedirectUri = self.dicOmise?["redirectUri"] ?? ""
        
        self.strRedirectUrl = String(describing: objRedirectUri)
        
    }
    
    func completionCharge(data objData: [String : Any]?, error: Error?) {
        
        actionError = error
        
        self.dicOmise = objData
        
        let objChargeId = self.dicOmise?["id"] ?? ""
        
        self.chargeId = String(describing: objChargeId)
        
    }
    
    func completionFetch(data objData: [String : Any]?, error: Error?) {
        
        actionError = error
        
        self.dicOmise = objData
        
    }
    
}
