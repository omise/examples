//
//  GooglePaymentView.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/10/10.
//

import SwiftUI

struct GooglePaymentView: View {
    
    
    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                
                
                SafariWebView().overlay (
                    RoundedRectangle(cornerRadius: 4, style: .circular)
                        .stroke(Color.gray, lineWidth: 0.5)
                ).padding(.leading, 20).padding(.trailing, 20)
                
            }
        }
    }
}


struct GooglePaymentView_Previews: PreviewProvider {
    static var previews: some View {
        GooglePaymentView()
    }
}
