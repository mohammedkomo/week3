<%@ WebHandler Language="C#" Class="profile" %>

using System;
using System.Web;

public class profile : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        DBaseConnect db = new DBaseConnect();
        string sql = "";

        string id = (context.Request["id"] != null) ? context.Request["id"] : "";
        string name = (context.Request["name"] != null) ? context.Request["name"] : "";
        string phone = (context.Request["phone"] != null) ? context.Request["phone"] : "";
        string email = (context.Request["email"] != null) ? context.Request["email"] : "";
        string pass = (context.Request["pass"] != null) ? context.Request["pass"] : "";
        string address = (context.Request["address"] != null) ? context.Request["address"] : "";

        sql = "Update  Customer set CustomerID='" + id + "',CustomerName='" + name + "',Phone='" + phone + "',Email='" + email + "',password='" + pass + "',Address= '" + address + "' where CustomerID='" + context.Session["id"].ToString () + "'";
        string msg = "";
        if (db.ExecuteSQL(sql))
        {
            msg = " the Update done";
        }
        else
        {
            msg = "Can not Update Try again ";
        }
        context.Response.Write(msg);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}