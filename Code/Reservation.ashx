<%@ WebHandler Language="C#" Class="Reservation" %>

using System;
using System.Web;

public class Reservation : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        DBaseConnect db = new DBaseConnect();
        string sql = "";

        string id = (context.Request["id"] != null) ? context.Request["id"] : "";
        string name = (context.Request["name"] != null) ? context.Request["name"] : "";
        string card = (context.Request["card"] != null) ? context.Request["card"] : "";
        string date = (context.Request["date"] != null) ? context.Request["date"] : "";
        string pin = (context.Request["pin"] != null) ? context.Request["pin"] : "";
        string msg = "";
        sql = "Insert Into CustomerOrder(CustomerID,schID,cardName,CardNumber,CardDate,pin) values('" + context.Session["id"].ToString() + "','" + id + "','" + name + "','" + card + "','" + date + "','" + pin + "')";
        if (db.ExecuteSQL(sql))
        {
            msg = "The Order is Send";
        }
        else
        {
            msg = "Can not Send Order";
        }
        context.Response.Write(msg);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}