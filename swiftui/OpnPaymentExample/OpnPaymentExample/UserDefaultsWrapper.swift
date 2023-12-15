//
//  UserDefaultsWrapper.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/09/28.
//

import Foundation



class UserDefaultsWrapper{
    
    static func setObjectData(strKey: String, objVal: Date) {
        UserDefaults.standard.set(objVal, forKey: strKey)
    }
    
    static func getObjectData(strKey: String) -> Data?{
        
        return UserDefaults.standard.data(forKey: strKey)
    }
}
