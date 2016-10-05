using System;
using System.Net;
using System.Web.UI;
using Omise;
using System.Threading.Tasks;

namespace OmiseASPNETForms
{
    public partial class Checkout : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RegisterAsyncTask(new PageAsyncTask(createCharge));
        }

        private async Task createCharge()
        {
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
            
            var token = Request.Form["omiseToken"];

            var omise = new Client(skey: OmiseKeys.SecretKey);
            var charge = await omise.Charges.Create(new Omise.Models.CreateChargeRequest
            {
                Amount = 10025,
                Currency = "THB",
                Card = token
            });

            lblCharge.Text = charge.Id;
        }
    }
}
