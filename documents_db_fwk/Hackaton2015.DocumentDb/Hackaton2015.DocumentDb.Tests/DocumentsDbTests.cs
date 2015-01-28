using System;
using Microsoft.Azure.Documents.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Add DocumentDB references
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;

namespace Hackaton2015.DocumentDb.Tests
{
    [TestClass]
    public class DocumentsDbTests
    {
        [TestMethod]
        public void TestDocumentDbConnection()
        {
          var client = GetClient();
          Assert.IsNotNull(client);
        }

        [TestMethod]
        public void TestDocumentDBDatabaseExists()
        {
          var client = GetClient();
          var database = GetDatabase(client);

          Assert.IsNotNull(database);
        }

        [TestMethod]
        public void TestDocumentCollectionExists()
        {
          var client = GetClient();
          var database = GetDatabase(client);
          var documentCollection = GetCollection(client, database);

          Assert.IsNotNull(client);
          Assert.IsNotNull(database);
          Assert.IsNotNull(documentCollection);
        }

        [TestMethod]
        public void TestDocumentInsertOrUpdate()
        {
          //var client = GetClient();
          //var database = GetDatabase(client);
          //var documentCollection = GetCollection(client, database);

          //// Create the Andersen family document.
          //var json = new
          //{
          //  Id = "Element",
          //  LastName = "Andersen",
          //  Parents = new[] { new { FirstName = "Thomas" }, new { FirstName = "Mary Kay"}},
          //  Children = new[] { 
          //    new  { 
          //      FirstName = "Henriette Thaulow", 
          //      Gender = "female", 
          //      Grade = 5, 
          //      Pets = new [] 
          //      {
          //        new { GivenName = "Fluffy" } 
          //      }
          //    } 
          //  },
          //  Address = new { State = "WA", County = "King", City = "Seattle" },
          //  IsRegistered = true
          //};

          //var documents = client.CreateDocumentQuery(documentCollection.SelfLink, "select * from LogEntries").ToArray();
          
          //Assert.IsNotNull(client);
          //Assert.IsNotNull(database);
          //Assert.IsNotNull(documentCollection);
          //Assert.IsNotNull(documents);

        }

        private static DocumentClient GetClient()
        {
          var endpointUrl = "https://loggingdb.documents.azure.com:443/";
          var authorizationKey = "3wsBb/bezEWl07MKuccaCUu4lvOL3JgduPl2ZTFcWqr0Lxj/WTvXTkGtWq8P7C4YdOmZxbh9BnSnxIJIK0L1iA==";
          var client = new DocumentClient(new Uri(endpointUrl), authorizationKey);

          return client;
        }

        private static Database GetDatabase(Microsoft.Azure.Documents.Client.DocumentClient client)
        {
          // Check to verify a database with the id=LoggingDocumentsDB does not exist
          var database = client.CreateDatabaseQuery().Where(db => db.Id == "LoggingDocumentsDB").AsEnumerable().FirstOrDefault();

          if (database == null)
          {
            database = client.CreateDatabaseAsync(new Database { Id = "LoggingDocumentsDB" }).Result;
          }
          return database;
        }

        private static DocumentCollection GetCollection(Microsoft.Azure.Documents.Client.DocumentClient client, Database database)
        {
          // Create a document collection.
          var documentCollection = client.CreateDocumentCollectionQuery(database.SelfLink).Where(c => c.Id == "LogEntries").ToArray().FirstOrDefault();

          if (documentCollection == null)
          {
            // Create the document collection.
            documentCollection = client.CreateDocumentCollectionAsync(database.SelfLink, new DocumentCollection { Id = "LogEntries" }).Result;
          }
          return documentCollection;
        }
    }
}
