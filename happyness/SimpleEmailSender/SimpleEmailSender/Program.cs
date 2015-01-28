using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace SimpleEmailSender
{
    class Program
    {
        static void Main(string[] args)
        {
            var emailTo = ConfigurationManager.AppSettings["to"];
            var emailFrom = ConfigurationManager.AppSettings["from"];
            var emailSubject = ConfigurationManager.AppSettings["subject"];
            var emailBodyPath = ConfigurationManager.AppSettings["body"];

            var bodyContent = File.OpenText(emailBodyPath).ReadToEnd();

            var emailUsername = ConfigurationManager.AppSettings["username"];
            var emailPassword = ConfigurationManager.AppSettings["password"];

            Console.WriteLine("Mail To: " + emailTo);
            Console.WriteLine("Mail From: " + emailFrom);
            Console.WriteLine("Subject: " + emailSubject);
            Console.WriteLine("Your Message\n" + bodyContent);

            MailAddress to = new MailAddress(emailTo);
            MailAddress from = new MailAddress(emailFrom);
            MailMessage mail = new MailMessage(from, to);
            mail.Subject = emailSubject;
            mail.Body = bodyContent;
            mail.IsBodyHtml = true;
            mail.BodyEncoding = new UTF8Encoding();
            mail.BodyTransferEncoding = System.Net.Mime.TransferEncoding.SevenBit;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.Credentials = new NetworkCredential(emailUsername, emailPassword);
            smtp.EnableSsl = true;

            Console.WriteLine("Sending email...");
            smtp.Send(mail);
        }
    }
}
