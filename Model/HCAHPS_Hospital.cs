using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalOpenings.Model
{
    public class HCAHPS_Hospital
    {
        [Key]
        public string ProviderId { get; set; }
        public string HospitalName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZIPCode { get; set; }
        public string PhoneNumber { get; set; }
    }
}
