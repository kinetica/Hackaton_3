using System;
using System.Configuration;
using System.Linq;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;

namespace Hackaton2015.DocumentDb.Framework
{
    public class DocumentStoreOf<T>
    {
        private DocumentClient _client;
        private Database _database;

        public DocumentStoreOf()
        {
            try
            {
                var configSection = (AzureDocumentDbConfigSection)ConfigurationManager.GetSection("azureDocumentDbConfigGroup/azureDocumentDbConfig");
                var endpointUrl = configSection.Connection.EndpointUrl;
                var key = configSection.Connection.Key;
                var databaseName = configSection.Connection.Database;
                var createIfNotExist = configSection.Connection.CreateIfNotExist;

                _client = new DocumentClient(new Uri(endpointUrl), key);
                _database = _client.CreateDatabaseQuery().Where(db => db.Id == databaseName).AsEnumerable().FirstOrDefault();

                if (createIfNotExist)
                {
                    if (_database == null)
                    {
                        _database = _client.CreateDatabaseAsync(new Database { Id = databaseName }).Result;
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception("AzureDbDocumentFramework configuration not found");
            }
        }

        public static INewQuery NewQuery()
        {
            throw new NotImplementedException();
        }
    }

    public interface INewQuery
    {
        IWithFilters WithFilters();
    }

    public interface IWithFilters
    {
        ISortedBy SortBy();
    }

    public interface ISortedBy
    {
        IWithPagingInfo WithPagingInfoLike();
    }

    public interface IWithPagingInfo
    {
        dynamic PerformSearchAsync();
    }
}