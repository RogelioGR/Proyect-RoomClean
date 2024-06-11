using Domain.Entities;
using Microsoft.EntityFrameworkCore;


namespace RoomClean.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options) { }
       
        //modelos

        public DbSet<Usuario> usuario { get; set; }
        public DbSet<Roles> roles { get; set; }
        public DbSet<Tarea> tarea { get; set; }
        public DbSet<Evidencia> evidencia { get; set; }
        public DbSet<Foto> foto { get; set; }


    }
}
