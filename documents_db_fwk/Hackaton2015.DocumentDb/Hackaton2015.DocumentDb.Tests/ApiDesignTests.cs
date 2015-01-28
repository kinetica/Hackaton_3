using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Hackaton2015.DocumentDb.Framework;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Hackaton2015.DocumentDb.Tests
{
    [TestClass]
    public class ApiDesignTests
    {
        [TestMethod]
        public void UsingAzureDbKineticaApi()
        {
            var messages = DocumentStoreOf<User>.NewQuery()
                                                .AgainstCollection("LogEntries")
                                                .WithFilters(x => x.Name == "Gabriel" && x.Enabled)
                                                .SortBy(x=>x.Name)
                                                .WithPagingInfoLike()
                                                .PerformSearchAsync();
        }
    }

    public class User
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Enabled { get; set; }
    }
}
