//
//  ActivityIndicator.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/10/13.
//

import Foundation
import SwiftUI


struct ActivityIndicator: View {
   
    var body: some View {
        ProgressView()
            .progressViewStyle(.circular)
            .padding()
            .tint(Color.white)
            .background(Color.gray)
            .cornerRadius(8)
            .scaleEffect(1.2)
    }
}
