//
//  OmiseWrapper.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/09/26.
//

import Foundation
import OmiseSDK

class OmiseModel {
    
    var capability: Capability?
    var client: Client?
    var clientSwiftUI: OmiseClientForSwiftUI?
//    var delegate: OmiseModelDelegate?
    
    var objContinuation: CheckedContinuation<Void, Never>?
    
    @Published var data: Data = Data()
    
    
    
    func setupClient() {
        
        // Setup dev environment for staging
        Configuration.setDefault(Configuration(environment: .production))
        
        clientSwiftUI = OmiseClientForSwiftUI(publicKey: ConfigEnv.OMISE_PUBLIC_KEY)
        
    }
    
//    func createToken(param tokenParameters: CreateTokenParameter){
//
//        
//        let request = Request<Token>(parameter: tokenParameters)
//        let requestTask = client?.requestTask(with: request, completionHandler: completionHandler)
//        requestTask?.resume()
//        return
//    }
//    
//    func completionHandler(tokenResult: Result<Token, Error>) -> Void {
//        switch tokenResult {
//        case .success(let value):
//            // do something with Token id
//            print(value.id)
//        case .failure(let error):
//            print(error)
//        }
//    }
//    
//    
//    
    
    
    // charge method
    // current sample API is only created for JPY
    func chargePayPay(param intAmount: Int, strReturnUrl: String, strPaymentId: String, completion: @escaping([String: Any]?, Error?) -> Void) async throws {
        
        let url: URL = URL(string: ConfigEnv.API_HOST + "/api/paypay")!
        
        let data: [String: Any] = ["amount": intAmount, "returnUri": strReturnUrl, "paymentId": strPaymentId]
        guard let httpBody = try? JSONSerialization.data(withJSONObject: data, options: []) else { return }

        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = httpBody
        
        let (resData, _) = try await URLSession.shared.data(for: request)
        DispatchQueue.main.async {
            do {
                let dicModel = try JSONSerialization.jsonObject(with: resData, options: []) as? [String: Any]
                completion(dicModel, nil)
            } catch (let decodingError) {
                completion(nil, decodingError)
            }
        }
        
    }
    
    func chargePayPayAnother(param intAmount: Int, strReturnUrl: String, strPaymentId: String, completion: @escaping([String: Any]?, Error?) -> Void) async throws {
        
        let paymentInfo: PaymentInformation = PaymentInformation.payPay
        
        let sourceParameter = CreateSourceParameter(paymentInformation: paymentInfo, amount: Int64(intAmount), currency: Currency.jpy)
        
        let request = Request<Source>(parameter: sourceParameter)
        
        // data(from:delegate:)はasyncメソッドのため、呼び出し時に await が必要
        let responseData = try await clientSwiftUI?.asynnSend(with: request)
        
        if let dataSource = responseData?.0,
           let tmpURLResponse = responseData?.1,
           let resultHttpResponse = tmpURLResponse as? HTTPURLResponse {
            
            if resultHttpResponse.statusCode == 400 {
                throw OmiseActionError.invalidRequest
            }
            
            if resultHttpResponse.statusCode != 200 {
                throw OmiseActionError.systemError
            }
            
            let url: URL = URL(string: ConfigEnv.API_HOST + "/api/charge-by-source")!
            
//            print(dataSource)
            
            let decoder = JSONDecoder()
            
            let source = try decoder.decode(Source.self, from: dataSource)
            
            let data: [String: Any] = ["amount": intAmount, "returnUri": strReturnUrl, "paymentId": strPaymentId, "source": source.id]
            guard let httpBody = try? JSONSerialization.data(withJSONObject: data, options: [])
            else {
                throw OmiseActionError.failParse
            }

            
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = httpBody
            
            let (resData, _) = try await URLSession.shared.data(for: request)
            
            DispatchQueue.main.async {
                do {
                    let dicModel = try JSONSerialization.jsonObject(with: resData, options: []) as? [String: Any]
                    completion(dicModel, nil)
                } catch (let decodingError) {
                    completion(nil, decodingError)
                }
            }
        }else{
            throw OmiseActionError.invalidResponse
        }
                
    }
    
    
    func chargeCreditCard(param intAmount: Int
                          , strName: String
                          , strCardNumber: String
                          , expMonth: String
                          , expYear: String
                          , securityCode: String
                          , strReturnUrl: String
                          , strPaymentId: String
                          , completion: @escaping([String: Any]?, Error?) -> Void) async throws {
        
        let tokenParameter = CreateTokenParameter(name: strName, number: strCardNumber, expirationMonth: Int(expMonth) ?? 0, expirationYear: Int(expYear) ?? 0, securityCode: securityCode)
        
        let request = Request<Token>(parameter: tokenParameter)
        
        let responseData = try await clientSwiftUI?.asynnSend(with: request)
        
        if let dataToken = responseData?.0,
           let tmpURLResponse = responseData?.1,
           let resultHttpResponse = tmpURLResponse as? HTTPURLResponse {
            
            if resultHttpResponse.statusCode == 400 {
                throw OmiseActionError.invalidRequest
            }
            
            if resultHttpResponse.statusCode != 200 {
                throw OmiseActionError.systemError
            }
            
            // This way got this error.
            /*
             (lldb) po error
             ▿ DecodingError
               ▿ typeMismatch : 2 elements
                 - .0 : Swift.Double
                 ▿ .1 : Context
                   ▿ codingPath : 1 element
                     - 0 : CodingKeys(stringValue: "created_at", intValue: nil)
                   - debugDescription : "Expected to decode Double but found a string instead."
                   - underlyingError : nil
             */
            
//            let decoder = JSONDecoder()
//            
//            let token = try decoder.decode(Token.self, from: dataToken)
            
            guard let dicToken: [String: Any] = try JSONSerialization.jsonObject(with: dataToken) as? [String: Any] else {
                throw OmiseActionError.failParse
            }
            guard let tokenId = dicToken["id"] as? String else{
                throw OmiseActionError.failGetToken
            }
            
            let url: URL = URL(string: ConfigEnv.API_HOST + "/api/credit-card")!
            let data: [String: Any] = ["amount": intAmount, "returnUri": strReturnUrl, "paymentId": strPaymentId, "token": tokenId]
            guard let httpBody = try? JSONSerialization.data(withJSONObject: data, options: []) else {
                throw OmiseActionError.failMakeRequest
            }

            
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = httpBody
            
            let (resData, _) = try await URLSession.shared.data(for: request)
            DispatchQueue.main.async {
                do {
                    let dicModel = try JSONSerialization.jsonObject(with: resData, options: []) as? [String: Any]
                    completion(dicModel, nil)
                } catch (let decodingError) {
                    completion(nil, decodingError)
                }
            }
        }else{
            throw OmiseActionError.invalidResponse
        }
        
    }

    
    func fetchPayPay(param strPaymentId: String, completion: @escaping([String: Any]?, Error?) -> Void) async throws {
        
        let url: URL = URL(string: ConfigEnv.API_HOST + "/api/charge-retrieve/"+strPaymentId)!
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        
        // data(from:delegate:)はasyncメソッドのため、呼び出し時に await が必要
        let (data, _) = try await URLSession.shared.data(for: request)
        DispatchQueue.main.async {
            do {
                let dicModel = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                completion(dicModel, nil)
            } catch (let decodingError) {
                completion(nil, decodingError)
            }
        }
    }
    
}
