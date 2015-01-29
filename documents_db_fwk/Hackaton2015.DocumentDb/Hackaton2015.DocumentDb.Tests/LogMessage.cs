using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Add DocumentDB references
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Hackaton2015.DocumentDb.Tests
{
  public class LogMessage : Document
  {
    public string MessageId { get; set; }

    public int Type { get; set; }

    public string MachineName { get; set; }

    public string RoleName { get; set; }
    public string InstanceId { get; set; }
    public string Application { get; set; }
    public string SessionId { get; set; }
    public string TenantId { get; set; }
    public string CustomerId { get; set; }
    public DateTime Timestamp { get; set; }
    public string Text { get; set; }
    public string Data { get; set; }
    public int Request { get; set; }
    public int Command { get; set; }
  }
}
