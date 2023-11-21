//
//  Config.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/09/26.
//

import Foundation
import SwiftUI
import OmiseSDK
import os

class ConfigEnv {
    static let OMISE_PUBLIC_KEY = ProcessInfo.processInfo.environment["OMISE_PUBLIC_KEY"] ?? ""
    static let API_HOST = ProcessInfo.processInfo.environment["API_HOST"] ?? ""
}

func randomAlphanumericString(_ length: Int) -> String {
   let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
   let len = UInt32(letters.count)
   var random = SystemRandomNumberGenerator()
   var randomString = ""
   for _ in 0..<length {
      let randomIndex = Int(random.next(upperBound: len))
      let randomCharacter = letters[letters.index(letters.startIndex, offsetBy: randomIndex)]
      randomString.append(randomCharacter)
   }
   return randomString
}

enum HomePath: Int{
    case creditcard, paypay, chargereturn
    
    var toString: String{
        ["CreditCard", "PayPay", "ChargeReturn"][self.rawValue]
    }
    
    @ViewBuilder
    func Destination(strPaymentId: String) -> some View{
        switch self {
        case .creditcard: CreditCardView()
        case .chargereturn: ChargeReturnView(strPaymentId: strPaymentId)
        case .paypay: PayPayView()
        
        }
    }
}

enum OmiseActionError: Error {
    case invalidRequest
    case invalidResponse
    case systemError
    case failParse
    case failGetToken
    case failMakeRequest
    case failCharged
    case failParseWithMessage( error: Error )
}


class OmiseClientForSwiftUI{
    
    let session: URLSession
    let queue: OperationQueue
    let publicKey: String
    
    var userAgent: String?

    enum HTTPHeaders: String {
        case authorization = "Authorization"
        case userAgent = "User-Agent"
        case contentType = "Content-Type"
        case omiseVersion = "Omise-Version"
    }

    struct HTTPHeaderss {
        let authorization = "Authorization"
    }
    
    private static let omiseAPIContentType = "application/json; charset=utf8"
    private static let omiseAPIVersion = "2019-05-29"
    
    static let currentPlatform: String = ProcessInfo.processInfo.operatingSystemVersionString
    static let currentDevice: String = UIDevice.current.model
    
    
    init(publicKey: String) {
        if publicKey.hasPrefix("pkey_") {
            self.publicKey = publicKey
        } else {
            self.publicKey = ""
        }
        
        self.queue = OperationQueue()
        self.session = URLSession(
            configuration: URLSessionConfiguration.ephemeral,
            delegate: nil,
            delegateQueue: queue
        )
    }
    
    func asynnSend<T: CreatableObject>(with request: Request<T>) async throws -> (Data?, URLResponse?) {
        
        let (data, error) = try await session.data(for: buildCustomURLRequest(for: request))
        return (data, error)
    }
    
    
    
    private func buildCustomURLRequest<T: Object>(for request: Request<T>) -> URLRequest {
        var urlRequest = URLRequest(url: T.postURL)
        urlRequest.httpMethod = "POST"
        let encoder = OmiseClientForSwiftUI.makeJSONEncoderForSwiftUi()
        urlRequest.httpBody = try? encoder.encode(request.parameter)
        urlRequest.setValue(OmiseClientForSwiftUI.encodeAuthorizationHeader(publicKey), forHTTPHeaderField: HTTPHeaders.authorization.rawValue)
        urlRequest.setValue(userAgent ?? OmiseClientForSwiftUI.defaultUserAgent, forHTTPHeaderField: HTTPHeaders.userAgent.rawValue)
        urlRequest.setValue(OmiseClientForSwiftUI.omiseAPIContentType, forHTTPHeaderField: HTTPHeaders.contentType.rawValue)
        urlRequest.setValue(OmiseClientForSwiftUI.omiseAPIVersion, forHTTPHeaderField: HTTPHeaders.omiseVersion.rawValue)
        return urlRequest
    }
    
    private static func encodeAuthorizationHeader(_ publicKey: String) -> String {
        let data = publicKey.data(using: String.Encoding.utf8, allowLossyConversion: false)
        let base64 = data?.base64EncodedString()
        return "Basic \(base64 ?? "")"
    }
    
    private static func makeJSONEncoderForSwiftUi() -> JSONEncoder {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .formatted(OmiseClientForSwiftUI.jsonDateFormatter)
        return encoder
    }
    
    static let jsonDateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(identifier: "UTC")
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'"
        return formatter
    }()
    
    static var defaultUserAgent: String {
        return """
        iOS/\(currentPlatform) \
        Apple/\(currentDevice)
        """ // OmiseIOSSDK/3.0.0 iOS/12.0.0 Apple/iPhone
    }
    
    
}
