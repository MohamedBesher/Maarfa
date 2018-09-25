using System;
using System.Drawing;
using System.IO;

namespace Saned.Maarfa.Api.Controllers
{
    public class Resizer
    {
        public Byte[] Resize(Byte[] data, int width, int height)
        {
            using (var ms = new MemoryStream(data))
            {
                var image = Image.FromStream(ms);
                var newImage = new Bitmap(width, height);
                Graphics.FromImage(newImage).DrawImage(image, 0, 0, width, height);
                Bitmap bmp = new Bitmap(newImage);

                ImageConverter converter = new ImageConverter();

                Byte[] Resizedata = (byte[])converter.ConvertTo(bmp, typeof(byte[]));

                return Resizedata;
            }
        }
    }

    public class Saver
    {
        private readonly Resizer _resizer;

        public Saver()
        {
            _resizer = new Resizer();
        }
        /// <summary>
        /// Save Image and Thumbnails
        /// </summary>
        /// <param name="base64"></param>
        /// <param name="filePath"></param>
        /// <param name="filePathImages"></param>
        public void SaveImageInFileSystem(string base64, string filePath, string filePathImages)
        {
            if (base64 == null)
                return;
            Byte[] bytes = Convert.FromBase64String(base64);
            Byte[] resized = _resizer.Resize(bytes, 400, 400);
            Byte[] resizedImage = _resizer.Resize(bytes, 900, 900);
            File.WriteAllBytes(filePath, resized);
            File.WriteAllBytes(filePathImages, resizedImage);

        }


        public void SaveImageInFileSystem(string base64, string filePath)
        {
            if (base64 == null)
                return;
            Byte[] bytes = Convert.FromBase64String(base64);
            Byte[] resized = _resizer.Resize(bytes, 400, 400);
            File.WriteAllBytes(filePath, resized);

        }

        /// <summary>
        /// Save File
        /// </summary>
        /// <param name="base64"></param>
        /// <param name="filePath"></param>
        public void SaveFileInFileSystem(string base64, string filePath)
        {
            if (base64 == null)
                return;
            Byte[] bytes = Convert.FromBase64String(base64);
            File.WriteAllBytes(filePath, bytes);

        }


    }
}