using Isenhome.Common.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isenhome.Common.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            DownloadFile info = new DownloadFile(@"D:\PD\jlsoft.source.bak\urls.txt");
            var isLogin = true; info.Login("http://demo.gllue.com/rest/user/login", "", "");
            if (isLogin)
            {
                info.DownLoad();
            }
            
            /*
            var url = "http://demo.gllue.com/rest/user/listview.png";
            var path = url.Replace("http://", "").Replace("demo.gllue.com", "").Replace("/", "\\");
            path = string.Format(@"d:\PD\jlsoft.source.bak\download\{0}", path).Replace("\\\\", "\\");
            var directory = path.Substring(0, path.LastIndexOf("\\"));
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            Console.WriteLine(path);
             */
        }
    }
}
