using System.Collections.Generic;
using System.Linq;
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
            var store = new DocumentStoreOf<User>();

            var messages = DocumentStoreOf<User>.NewQuery()
                                                .WithFilters()
                                                .SortBy()
                                                .WithPagingInfoLike()
                                                .PerformSearchAsync();
        }
    }

    public class User
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
