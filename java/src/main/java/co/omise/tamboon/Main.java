package co.omise.tamboon;

import org.eclipse.jetty.server.Server;

public class Main {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);
        server.setHandler(new MainHandler());
        server.start();
        server.join();
    }
}
