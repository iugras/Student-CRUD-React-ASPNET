using Microsoft.EntityFrameworkCore;

namespace StudentAPI.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions <StudentDbContext> options) 
            : base(options)
        {
        }
         public DbSet<Student> Students {  get; set; }
        
    }
}
