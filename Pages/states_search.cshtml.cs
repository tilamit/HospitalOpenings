using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SQLite;
using System.IO;
using HospitalOpenings.Model;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace HospitalOpenings.Pages
{
    public class states_searchModel : PageModel
    {
        //Database Connection Here
        private readonly MyDbContext myDbContext = new MyDbContext();

        //Paging Properties
        public List<HCAHPS_Hospital> Data;
        [BindProperty(SupportsGet = true)]
        public int CurrentPage { get; set; } = 1;
        [BindProperty(SupportsGet = true)]
        public string value { get; set; }
        public int Count { get; set; }
        public int PageSize { get; set; } = 20;
        public int TotalPages => (int)Math.Ceiling(decimal.Divide(Count, PageSize));

        public bool ShowFirst => CurrentPage != 1;
        public bool ShowLast => CurrentPage != Pager.TotalPages;

        public List<HCAHPS_Hospital> Items { get; set; }
        public Pager Pager { get; set; }

        //Load Data Here
        public void OnGet(int CurrentPage = 1)
        {
            if (Request.Query["search"].ToString() == "All" || Request.Query["search"].ToString() == "*")
            {
                var pager = new Pager(GetData().Count(), CurrentPage);

                Items = GetData().Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize).ToList();
                Pager = pager;

                value = "All";
            }
            else if (Request.Query["search"].ToString().Count() > 0)
            {
                value = Request.Query["search"].ToString();

                string newValue = value.Replace("-", " ");
                var pager = new Pager(GetData().Where(c => c.HospitalName.ToLower().Contains(value.ToLower()) || c.City.ToLower().Contains(value.ToLower()) || c.State.ToLower().Contains(value.ToLower())).Count(), CurrentPage);

                Items = GetData().Where(c => c.HospitalName.ToLower().Contains(newValue.ToLower()) || c.City.ToLower().Contains(value.ToLower()) || c.State.ToLower().Contains(value.ToLower())).Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize).ToList();
                Pager = pager;
            }
        }

        //On Search, Get Data Here
        public IActionResult OnPost(string hospitalName, int CurrentPage = 1)
        {
            if (hospitalName == "All" || hospitalName == "*")
            {
                var pager = new Pager(GetData().Count(), CurrentPage);

                Items = GetData().Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize).ToList();
                Pager = pager;
            }
            else if(hospitalName != null)
            {
                var pager = new Pager(GetData().Where(c => c.HospitalName.ToLower().Contains(hospitalName.ToLower()) || c.City.ToLower().Contains(hospitalName.ToLower()) || c.State.ToLower().Contains(hospitalName.ToLower())).Count(), CurrentPage);

                Items = GetData().Where(c => c.HospitalName.ToLower().Contains(hospitalName.ToLower()) || c.City.ToLower().Contains(hospitalName.ToLower()) || c.State.ToLower().Contains(hospitalName.ToLower())).Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize).ToList();
                Pager = pager;
            }

            if (hospitalName != null)
            {
                return Redirect("/states_search?search=" + hospitalName.Replace(" ", "-"));
            }
            else
            {
                return Redirect("/states_search");
            }
        }

        //Get Table Data Here
        private List<HCAHPS_Hospital> GetData()
        {
            List<HCAHPS_Hospital> aLst = myDbContext.HCAHPS_Hospital.ToList();
            return aLst;
        }
    }
}