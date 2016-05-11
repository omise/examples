package co.omise.tamboon;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MainHandler extends AbstractHandler {
    private final StepOneHandler stepOne = new StepOneHandler();
    private final StepTwoHandler stepTwo = new StepTwoHandler();
    private final StepThreeHandler stepThree = new StepThreeHandler();

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        Handler handler = route(baseRequest.getPathInfo());
        if (handler == null) {
            response.sendRedirect("/one");
//            response.setContentType("text/plain");
//            response.setStatus(SC_NOT_FOUND);
//            response.getWriter().write("not found");
            baseRequest.setHandled(true);
            return;
        }

        handler.handle(target, baseRequest, request, response);
    }

    private Handler route(String path) {
        switch (path) {
            case "/one":
                return stepOne;
            case "/two":
                return stepTwo;
            case "/three":
                return stepThree;
            default:
                return null;
        }
    }
}
