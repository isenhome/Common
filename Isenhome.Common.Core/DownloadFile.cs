using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Isenhome.Common.Core
{
    public class DownloadFile
    {
        private string path = string.Empty;

        private CookieContainer container = new CookieContainer();

        public DownloadFile(string path)
        {
            this.path = path;
        }

        public bool Login(string url, string username, string password)
        {
            HttpWebResponse res = null;
            string strResult = "";
            var result = false;
            try
            {
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.Method = "POST";
                req.ContentType = "application/x-www-form-urlencoded";
                req.AllowAutoRedirect = false;
                req.CookieContainer = container;
                StringBuilder UrlEncoded = new StringBuilder();
                var SomeBytes = Encoding.UTF8.GetBytes(string.Format("data={0}", "{\"email\":\"demo@gllue.com\",\"password\":\"gllue625\",\"remember\":true,\"next\":\"\"}"));
                req.ContentLength = SomeBytes.Length;
                using (Stream newStream = req.GetRequestStream())
                {
                    newStream.Write(SomeBytes, 0, SomeBytes.Length);
                }

                res = (HttpWebResponse)req.GetResponse();
                res.Cookies = container.GetCookies(req.RequestUri);
                using (Stream smRes = res.GetResponseStream())
                {
                    using (StreamReader sr = new StreamReader(smRes, System.Text.Encoding.Default))
                    {
                        strResult = sr.ReadToEnd();
                    }
                }
                res.Close();
                result = true;
            }
            catch (Exception e)
            {

            }
            return result;

        }

        private List<string> loadUrls()
        {
            List<string> urls = new List<string>();
            using (var file = File.OpenText(this.path))
            {
                while (!file.EndOfStream)
                {
                    var url = file.ReadLine();
                    urls.Add(url);
                }
            }
            return urls;
        }

        public void DownLoad()
        {
            var domain = "115.29.138.196";
            var urls = loadUrls();
            foreach (var url in urls)
            {
                Thread.Sleep(500);
                var path = url.Replace("http://", "").Replace(domain, "").Replace("/", "\\");

                path = string.Format(@"d:\PD\jlsoft.source.bak\download\{0}", path).Replace("\\\\", "\\");
                if (path.IndexOf("?") != -1)
                {
                    path = path.Substring(0, path.IndexOf("?"));
                }
                var directory = path.Substring(0, path.LastIndexOf("\\"));
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
                if (File.Exists(path))
                {
                    continue;
                }
                try
                {
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                    request.Method = "Get";
                    request.ContentType = "application/x-www-form-urlencoded";
                    request.AllowAutoRedirect = false;
                    request.CookieContainer = container;
                    var response = request.GetResponse();

                    using (Stream stream = response.GetResponseStream())
                    {
                        using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                        {
                            using (var writer = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write))
                            {
                                byte[] buff = new byte[512];
                                int c = 0; //实际读取的字节数
                                while ((c = stream.Read(buff, 0, buff.Length)) > 0)
                                {
                                    writer.Write(buff, 0, c);
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    using (FileStream fs = new FileStream(@"d:\PD\jlsoft.source.bak\error.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite))
                    {
                        using (StreamWriter sw = new StreamWriter(fs))
                        {
                            sw.WriteLine(url);
                        }
                    }
                    Console.WriteLine("error url ===" + url);
                }
                Console.WriteLine(url);
            }
            Console.Read();
        }
    }
}
