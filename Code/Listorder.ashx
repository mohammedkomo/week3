<%@ WebHandler Language="C#" Class="Listorder" %>

using System;
using System.Web;
using System.Data;
public class Listorder : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        DBaseConnect db = new DBaseConnect();
        string sql = "";
        string id = context.Session["id"].ToString ();
        string msg = "";

        sql = "Select * From CustomerOrderData where    CustomerID='" + id + "'";
      
        DataTable dt = db.ExecuteData(sql);
        if (dt != null)
        {
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                msg += "//" + dt.Rows[i]["SchID"].ToString();
                msg += "++" +DateTime.Parse( dt.Rows[i]["schDate"].ToString()).Date.ToString("MM/dd/yyyy");
                msg += "++" + dt.Rows[i]["price"].ToString();
                msg += "++" + dt.Rows[i]["AreaName"].ToString();
                msg += "++" + dt.Rows[i]["TypeName"].ToString();
                msg += "++" + dt.Rows[i]["IntervalName"].ToString();
                msg += "++" + dt.Rows[i]["OrderID"].ToString();
                msg += "++" + DateTime.Parse(dt.Rows[i]["OrderDate"].ToString()).Date.ToString("MM/dd/yyyy");
                msg += "++" + dt.Rows[i]["State"].ToString();
                
            }
        }
        context.Response.Write(msg);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}