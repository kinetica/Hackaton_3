using System;
using System.Configuration;
using Microsoft.Azure.Documents.Client;

namespace Hackaton2015.DocumentDb.Framework
{
    public class DocumentStoreOf<T>
    {
        private DocumentClient _client;

        public DocumentStoreOf()
        {
            try
            {
                var configSection = (AzureDocumentDbConfigSection)ConfigurationManager.GetSection("azureDocumentDbConfigGroup/azureDocumentDbConfig");
                var endpointUrl = configSection.Connection.EndpointUrl;
                var key = configSection.Connection.Key;
                _client = new DocumentClient(new Uri(endpointUrl), key);
            }
            catch (Exception)
            {
                throw new Exception("AzureDbDocumentFramework configuration not found");
            }
        }
    }
}