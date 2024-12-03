import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try (Connection conn = DBConnections.getConnection()) {
            String query = "SELECT * FROM User WHERE username = ? AND userPassword = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, username);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();

            response.setContentType("text/html");
            PrintWriter out = response.getWriter();

            if (rs.next()) {
                out.println("<h1>Welcome, " + rs.getString("firstName") + " " + rs.getString("lastName") + "!</h1>");
            } else {
                out.println("<h1>Invalid username or password</h1>");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
