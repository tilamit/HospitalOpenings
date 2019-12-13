using HospitalOpenings.Model;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalOpenings
{
    public class MyDbContext : DbContext
    {
        public DbSet<SampleDataTable> SampleDataTable { get; set; }
        public DbSet<HCAHPS_Hospital> HCAHPS_Hospital { get; set; }
        public DbSet<Hospital_General_Information> Hospital_General_Information { get; set; }
        public DbSet<Payment_and_Value_of_Care_Hospital> Payment_and_Value_of_Care_Hospital { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "HospitalOpenAuth.db" };
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);

            optionsBuilder.UseSqlite(connection);
        }
    }
}
