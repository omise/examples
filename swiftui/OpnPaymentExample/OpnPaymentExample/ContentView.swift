//
//  ContentView.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/09/19.
//

import SwiftUI

struct SubModule: Identifiable {
    var id: Int
    var key: String
    var name: String
}

let credit = SubModule(id: 1, key: "creditcard", name: "Credit Card")
let payPayWay1 = SubModule(id: 2, key: "paypay_way1", name: "PayPay(way 1)")
//let payPayWay2 = SubModule(id: 3,key: "paypay_way2", name: "PayPay(way 2)")
//
//let google = SubModule(id: 4,key: "google_payment", name: "Google Payment")


struct ContentView: View {
    
    @Binding var index: Int
    
    var body: some View {
        TabView(selection: $index) {
            CreditCardView()
                .tabItem {
                    Image(systemName: "house")
                    Text("Card")
                }
                .tag(0)

            PayPayView()
                .tabItem {
                    Image(systemName: "magnifyingglass")
                    Text("PayPay")
                }
                .tag(1)
//            GooglePaymentView()
//                .tabItem {
//                    Image(systemName: "gearshape")
//                    Text("Google")
//                }
//                .tag(2)
        }
    }
    
    
}



struct ContentView_Previews: PreviewProvider {
    
    
    static var previews: some View {
        ContentView(index: .constant(0))
    }
}
