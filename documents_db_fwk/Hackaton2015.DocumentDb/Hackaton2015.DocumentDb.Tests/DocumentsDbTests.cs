using System;
using Microsoft.Azure.Documents.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Hackaton2015.DocumentDb.Tests
{
    [TestClass]
    public class DocumentsDbTests
    {
        [TestMethod]
        public void TestDocumentDbConnection()
        {
            var endpointUrl = "https://loggingdb.documents.azure.com:443/";
            var authorizationKey = "3wsBb/bezEWl07MKuccaCUu4lvOL3JgduPl2ZTFcWqr0Lxj/WTvXTkGtWq8P7C4YdOmZxbh9BnSnxIJIK0L1iA==";
            var client = new DocumentClient(new Uri(endpointUrl), authorizationKey);
        }
    }
}
