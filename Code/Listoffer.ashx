<%@ WebHandler Language="C#" Class="Listoffer" %>

using System;
using System.Web;
using System.Data;
public class Listoffer : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        DBaseConnect db = new DBaseConnect();
        string sql = "";
        
        string msg = "data";
        

        sql = "select * From Schfree where free>0 and schDate>='" + DateTime.Now.Date.ToString("MM/dd/yyyy") + "'";
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