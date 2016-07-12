using System;
using System.Web.UI;
using Omise;

namespace OmiseASPNETForms
{
	
	public partial class CustomForm : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			if (Page.IsPostBack)
			{
				createCharge();
			}
		}

		private void createCharge()
		{
			var token = Request.Form["omiseToken"];

			var omise = new Client(skey: OmiseKeys.SecretKey);
			var charge = omise.Charges.Create(new Omise.Models.CreateChargeRequest
			{
				Amount = 10025,
				Currency = "THB",
				Card = token
			});

			lblChargeResult.Text = string.Format("Checkout successfully with charge id : {0}", charge.Id);
		}
	}
}

