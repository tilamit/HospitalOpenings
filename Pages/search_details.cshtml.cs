using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalOpenings.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalOpenings.Pages
{
    public class search_detailsModel : PageModel
    {
        public string title { get; set; }
        //Database Connection Here
        private readonly MyDbContext myDbContext = new MyDbContext();
        public List<CombinedViewModel> Data;

        public string id { get; set; }

        //Get Data Here On Link Click From The First Page 'state_search'
        public IActionResult OnGet(string id)
        {
            string val = "";

            if (id != null)
            {
                title = id.Replace("-", " ");

                Data = (from c in myDbContext.HCAHPS_Hospital
                        join d in myDbContext.Hospital_General_Information on c.ProviderId equals d.ProviderId
                        join f in myDbContext.Payment_and_Value_of_Care_Hospital on c.ProviderId equals f.ProviderId
                        where c.HospitalName.Replace(" ", "-") + "-" + c.City.Replace(" ", "-") + "-" + c.State.Replace(" ", "-") == id
                        select new CombinedViewModel { HospitalName = c.HospitalName, City = c.City, State = c.State, Address = c.Address, ZIPCode = c.ZIPCode, CountyName = d.CountyName, PhoneNumber = d.PhoneNumber, HospitalType = d.HospitalType, HospitalOwnership = d.HospitalOwnership, EmergencyServices = d.EmergencyServices, MeetsCriteriaForMeaningfulUseOfEHRs = d.MeetsCriteriaForMeaningfulUseOfEHRs, Hospitaloverallrating = d.Hospitaloverallrating, MortalityNationalComparison = d.MortalityNationalComparison, SafetyOfCareNationalComparison = d.SafetyOfCareNationalComparison, PatientExperienceNationalComparison = d.PatientExperienceNationalComparison, EffectivenessOfCareNationalComparison = d.EffectivenessOfCareNationalComparison, EfficientUseOfMedicalImagingNationalComparison = d.EfficientUseOfMedicalImagingNationalComparison, PaymentMeasureName = f.PaymentMeasureName, Payment = f.Payment, ValueOfCareDisplayName = f.ValueOfCareDisplayName, ValueOfCareCategory = f.ValueOfCareCategory }).ToList();

                val = Data.Count().ToString();
            }

            if (val == "1")
            {
                return Page();
            }
            else
            {
                return Redirect("/states_search?search=All");
            }
        }
    }
}