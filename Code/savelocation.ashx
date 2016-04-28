<%@ WebHandler Language="C#" Class="savelocation" %>

using System;
using System.Web;
using System.Data;
public class savelocation : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        DBaseConnect db = new DBaseConnect();
        string sql = "";
       
        string id =  context.Session["id"].ToString();
        string lat = (context.Request["lat"] != null) ? context.Request["lat"] : "";
        string lan = (context.Request["lan"] != null) ? context.Request["lan"] : "";
        
        sql = "Update Customer set  lat='" + lat + "',lan='"+lan+"' where CustomerID='" + id + "'";
        string msg="";
        if(db.ExecuteSQL(sql))
        {
            msg = "the location is update";
        }
        else
        {
            msg = "The location is not update";
        }
      
        context.Response.Write(msg);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}