using System;
using System.Data.SqlClient;

namespace Maarfa.Data.ExtensionsMethods
{
    public static class ExtensionMethods
    {
        public static SqlParameter Getparamter(this SqlParameter ob,object id,string parameterName)
        {
            var accountTypeIdParameter = id == null
                ? new SqlParameter("@" + parameterName, DBNull.Value)
                : new SqlParameter("@" + parameterName, id);
            return accountTypeIdParameter;
        }
    }
}