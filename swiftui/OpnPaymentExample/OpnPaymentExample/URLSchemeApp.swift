//
//  URLSchemeApp.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/10/03.
//

import SwiftUI

@main
struct URLSchemeApp: App {
    
    @State var index: Int = 0
        var body: some Scene {
            WindowGroup {
                ContentView(index: $index)
                    .onOpenURL { url in
                        switch url.host {
                        case "credit_card":
                            index = 0
                        case "paypay":
                            index = 1
                        case "googles":
                            index = 2
                        
                        default:
                            return
                        }
                    }
            }
        }
}
