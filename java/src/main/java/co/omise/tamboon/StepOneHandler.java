package co.omise.tamboon;

import com.google.common.io.CharStreams;
import org.eclipse.jetty.server.Request;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_OK;

public class StepOneHandler extends BaseHandler {
    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html; charset=utf-8");
        response.setStatus(SC_OK);
        CharStreams.copy(readHtml("/one.html"), response.getWriter());
        baseRequest.setHandled(true);
    }
}
