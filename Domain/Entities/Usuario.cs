using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Número { get; set; }
        public string? Correo { get; set; }
        public string? Contraseña { get; set; }
        public string? Foto { get; set; }


        [ForeignKey("Roles")]
        public int FKRol { get; set; }
        public Roles? Roles { get; set; }
    }
}
