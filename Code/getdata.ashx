<%@ WebHandler Language="C#" Class="getdata" %>

using System;
using System.Web;
using System.Data;
public class getdata : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        DBaseConnect db = new DBaseConnect();
        string sql = "";
       
        string id =  context.Session["id"].ToString();
        string msg = "data";
        sql = "select * From Customer where CustomerID='" + id + "'";
        DataTable dt = db.ExecuteData(sql);
        if (dt != null)
        {
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                msg += "//" + dt.Rows[i]["CustomerID"].ToString();
                msg += "++" + dt.Rows[i]["CustomerName"].ToString(); ;
                msg += "++" + dt.Rows[i]["Phone"].ToString();
                msg += "++" + dt.Rows[i]["Email"].ToString();
                msg += "++" + dt.Rows[i]["Address"].ToString();
                msg += "++" + dt.Rows[i]["password"].ToString();
                
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