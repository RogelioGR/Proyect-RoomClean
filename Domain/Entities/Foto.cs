using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Foto
    {
        [Key]
        public int Id { get; set; }
        public string? FotoUrl { get; set; }

        [ForeignKey("Evidencia")]
        public int FkEvidencia { get; set; }
        public Evidencia? Evidencia { get; set; }
    }
}
