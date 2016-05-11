package co.omise.tamboon;

import co.omise.models.Charge;
import com.google.common.io.CharStreams;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_OK;

public class StepThreeHandler extends BaseHandler {
    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String rawParams = CharStreams.toString(request.getReader());
        MultiMap<String> values = new MultiMap<>();
        UrlEncoded.decodeTo(rawParams, values, "UTF-8");

        String rawAmount = values.getString("amount");
        long amount = Long.parseLong(rawAmount) * 100; // convert to THB satangs.

        Charge charge = omise().charges().create(new Charge.Create()
                .customer(SharedData.getCustomerId())
                .amount(amount)
                .currency("THB"));

        response.setContentType("text/html; charset=utf-8");
        response.setStatus(SC_OK);
        CharStreams.copy(readHtml("/three.html"), response.getWriter());
        baseRequest.setHandled(true);
    }
}
