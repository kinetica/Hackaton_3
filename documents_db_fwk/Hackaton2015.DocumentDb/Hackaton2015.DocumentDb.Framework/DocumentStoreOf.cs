using System;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;

namespace Hackaton2015.DocumentDb.Framework
{
    public class DocumentStoreOf<T> : INewQuery<T>, IAgainstCollection<T>, IWithFilters<T>, ISortedBy, IWithPagingInfo
    {
        private DocumentClient _client;
        private Database _database;
        private string _collectioName;
        private Func<T, bool> _filters;
        private Expression<Func<T, string>> _sortBy;

        private DocumentStoreOf()
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

        public static INewQuery<T> NewQuery()
        {
            return new DocumentStoreOf<T>();
        }

        public IAgainstCollection<T> AgainstCollection(string collectionName)
        {
            _collectioName = collectionName;
            return this;
        }

        public IWithFilters<T> WithFilters(Func<T, bool> filters)
        {
            _filters = filters;
            return this;
        }

        public ISortedBy SortBy(Expression<Func<T, string>> sortBy)
        {
            _sortBy = sortBy;
            return this;
        }

        public IWithPagingInfo WithPagingInfoLike()
        {
            return this;
        }

        public dynamic PerformSearchAsync()
        {
            return new {};
        }
    }

    public interface INewQuery<T>
    {
        IAgainstCollection<T> AgainstCollection(string collectionName);
    }

    public interface IAgainstCollection<T>
    {
        IWithFilters<T> WithFilters(Func<T,bool> filters);
    }

    public interface IWithFilters<T>
    {
        ISortedBy SortBy(Expression<Func<T,string>> sortBy);
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