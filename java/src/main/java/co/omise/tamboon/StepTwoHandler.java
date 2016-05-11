package co.omise.tamboon;

import co.omise.models.Customer;
import com.google.common.io.CharStreams;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_OK;

public class StepTwoHandler extends BaseHandler {
    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String rawParams = CharStreams.toString(request.getReader());
        MultiMap<String> values = new MultiMap<>();
        UrlEncoded.decodeTo(rawParams, values, "UTF-8");

        String token = values.getString("card_token");
        String email = values.getString("email");

        Customer customer = omise().customers().create(new Customer.Create()
                .card(token)
                .email(email));

        SharedData.setCustomerId(customer.getId());

        response.setContentType("text/html; charset=utf-8");
        response.setStatus(SC_OK);
        CharStreams.copy(readHtml("/two.html"), response.getWriter());
        baseRequest.setHandled(true);
    }
}
