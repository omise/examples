<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="OmiseASPNETForms.Default" %>
<%@ Import Namespace="OmiseASPNETForms" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Omise ASP.NET web forms example.</title>
</head>
<body>
    <form action="Checkout.aspx" method="post">
        <input type="hidden" name="description" value="Product order ฿100.25" />
        <script type="text/javascript" src="https://cdn.omise.co/card.js"
            data-key="<%= OmiseKeys.PublicKey %>"
            data-image="https://cdn.omise.co/artwork/powered_by_omise.png"
            data-frame-label="Omise ASP.NET Web Forms Site"
            data-button-label="Pay now"
            data-submit-label="Submit"
            data-location="yes"
            data-amount="10025"
            data-currency="thb">
        </script>
    </form>
</body>
</html>
