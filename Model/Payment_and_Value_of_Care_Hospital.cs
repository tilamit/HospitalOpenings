using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalOpenings.Model
{
    public class Payment_and_Value_of_Care_Hospital
    {
        [Key]
        public string ProviderId { get; set; }
        public string PaymentMeasureName { get; set; }
        public string Payment { get; set; }
        public string ValueOfCareDisplayName { get; set; }
        public string ValueOfCareCategory { get; set; }
    }
}
