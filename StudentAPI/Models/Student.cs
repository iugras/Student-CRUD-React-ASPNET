using System.ComponentModel.DataAnnotations;

namespace StudentAPI.Models
{
    public class Student
    {
        [Key]
        public int id {  get; set; }
        public string name { get; set; }
        public string course { get; set; }


    }
}
