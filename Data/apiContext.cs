using Microsoft.EntityFrameworkCore;

namespace resumeapi.Data
{
    public class apiContext:DbContext
    {
        public DbSet<WebApplication> webApplications { get; set; }
        public apiContext(DbContextOptions<apiContext> options)
            : base(options) { }
    }
}
