using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using hiarsalon.Models;
using System.IO;
using Microsoft.AspNetCore.HostFiltering;

namespace hiarsalon.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppontmentsController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public AppontmentsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.Appointments";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HairSalonConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Appointments user)
        {
            string query = @"
                    insert into dbo.Appointments (Username,Useremail,Barbername,Fee,ApDate,ApTime)
                    values
                    ('" + user.Username + @"'
                    ,'" + user.Useremail + @"'
                    ,'" + user.Barbername + @"'
                    ,'" + user.Fee + @"'
                    ,'" + user.ApDate + @"'
                    ,'" + user.ApTime + @"'
                    )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HairSalonConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Appointments
                    where ApId=" + id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("HairSalonConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully!");
        }

    }
}