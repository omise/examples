package co.omise.tamboon;

import co.omise.Client;
import org.eclipse.jetty.server.handler.AbstractHandler;

import java.io.IOException;
import java.io.InputStreamReader;

public abstract class BaseHandler extends AbstractHandler {
    public static final String PKEY = "pkey_test_52d6po3fvio2w6tefpb";
    public static final String SKEY = "skey_test_52d6ppdms4p1jhnkigq";

    protected Client omise() {
        return new Client(PKEY, SKEY);
    }

    protected InputStreamReader readHtml(String filename) throws IOException {
        return new InputStreamReader(getClass().getResourceAsStream(filename));
    }
}
