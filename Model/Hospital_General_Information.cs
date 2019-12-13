using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalOpenings.Model
{
    public class Hospital_General_Information
    {
        [Key]
        public string ProviderId { get; set; }
        public string HospitalType { get; set; }
        public string HospitalOwnership { get; set; }
        public string EmergencyServices { get; set; }
        public string MeetsCriteriaForMeaningfulUseOfEHRs { get; set; }
        public string Hospitaloverallrating { get; set; }
        public string CountyName { get; set; }
        public string PhoneNumber { get; set; }
        public string MortalityNationalComparison { get; set; }
        public string SafetyOfCareNationalComparison { get; set; }
        public string PatientExperienceNationalComparison { get; set; }
        public string EffectivenessOfCareNationalComparison { get; set; }
        public string EfficientUseOfMedicalImagingNationalComparison { get; set; }
    }
}
