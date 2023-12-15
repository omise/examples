//
//  SFSafariView.swift
//  OpnPaymentExample
//
//  Created by Shunsuke Hiratsuka on 2023/11/27.
//

import SwiftUI
import SafariServices

struct SafariWebView: UIViewControllerRepresentable {
    init(
//        url: WebUrlType,
        configuration: SFSafariViewController.Configuration = .init(),
        controllerConfiguration: @escaping (SFSafariViewController) -> Void = { _ in }) {
//        self.url = url
        self.configuration = configuration
        self.controllerConfiguration = controllerConfiguration
    }
    
//    private let url: WebUrlType
    private let configuration: SFSafariViewController.Configuration
    private let controllerConfiguration: (SFSafariViewController) -> Void

    func makeUIViewController(context: Context) -> SFSafariViewController {
        
        let url = URL(string: "http://localhost:3000/google-payment")!
        
        let controller = SFSafariViewController(url: url, configuration: configuration)
        controllerConfiguration(controller)
        return controller
    }

    func updateUIViewController(_ safariViewController: SFSafariViewController, context: Context) {}
}
