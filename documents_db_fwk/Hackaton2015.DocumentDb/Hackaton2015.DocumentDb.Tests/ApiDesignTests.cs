using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hackaton2015.DocumentDb.Framework;
using Microsoft.Azure.Documents.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Hackaton2015.DocumentDb.Tests
{
    [TestClass]
    public class ApiDesignTests
    {
        [TestMethod]
        public void UsingAzureDbKineticaApi()
        {
            var store = new DocumentStoreOf<User>();

            //var messages = DocumentStoreOf<User>.NewQuery()
            //                                    .WithFilters()
            //                                    .SortBy()
            //                                    .WithPagingInfoLike()
            //                                    .PerformSearchAsync()

            //                      .SearchAsync(settings.Filters, 
            //                      settings.SortColumn, 
            //                      settings.SortAscending, 
            //                      (pageNumber - 1) * settings.ItemsPerPage, 
            //                      settings.ItemsPerPage);
        }
    }

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

    public class User
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
