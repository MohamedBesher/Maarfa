namespace Maarfa.Data.Core.Models
{
    // define Category of Material"التمريض - الصيدلة - الطب البشري- العلوم االدارية-العلوم الطبية التطبيقية-طب الاسنان"
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsCanceled { get; set; }

        public void Cancel()
        {
            IsCanceled = false;
        }
        public void Modfiy(string name)
        {
            Name = name;
        }

    }
}
