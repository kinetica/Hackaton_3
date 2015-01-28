using System;
using System.Collections.Generic;
using System.Configuration;
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
            var emailBody = ConfigurationManager.AppSettings["body"];
            var emailUsername = ConfigurationManager.AppSettings["username"];
            var emailPassword = ConfigurationManager.AppSettings["password"];

            Console.WriteLine("Mail To: " + emailTo);
            Console.WriteLine("Mail From: " + emailFrom);
            Console.WriteLine("Subject: " + emailSubject);
            Console.WriteLine("Your Message\n" + emailBody);

            MailAddress to = new MailAddress(emailTo);
            MailAddress from = new MailAddress(emailFrom);
            MailMessage mail = new MailMessage(from, to);
            mail.Subject = emailSubject;
            mail.Body = emailBody;

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
