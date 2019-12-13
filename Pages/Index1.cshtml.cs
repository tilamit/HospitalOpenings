using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalOpenings.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalOpenings.Pages
{
    public class Index1Model : PageModel
    {
        //Database connection here
        private readonly MyDbContext _myDbContext = new MyDbContext();
        public void OnGet()
        {
        }

        //Get details from 'HCAHPS_Hospital' table
        public List<SampleDataTable> GetSampleData()
        {
            var sampleDataAll = _myDbContext.SampleDataTable.ToList();

            return sampleDataAll;
        }
    }
}