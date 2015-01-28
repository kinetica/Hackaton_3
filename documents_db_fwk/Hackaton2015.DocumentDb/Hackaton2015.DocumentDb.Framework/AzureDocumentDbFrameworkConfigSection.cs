using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hackaton2015.DocumentDb.Framework
{
    public class AzureDocumentDbConfigSection : ConfigurationSection
    {
        // Create a "connection" element.
        [ConfigurationProperty("connection")]
        public ConnectionElement Connection
        {
            get
            {
                return (ConnectionElement)this["connection"];
            }
            set
            { this["connection"] = value; }
        }
    }

    // Define the "connection" element
    // with "endpoint" and "url" attributes.
    public class ConnectionElement : ConfigurationElement
    {
        [ConfigurationProperty("endpointUrl",IsRequired = true)]
        public string EndpointUrl
        {
            get
            {
                return (String)this["endpointUrl"];
            }
            set
            {
                this["endpointUrl"] = value;
            }
        }

        [ConfigurationProperty("key", IsRequired = true)]
        public string Key
        {
            get
            {
                return (string)this["key"];
            }
            set
            {
                this["key"] = value;
            }
        }
    }
}
