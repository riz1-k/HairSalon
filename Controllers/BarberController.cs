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
    [Route("api/barbers")]
    [ApiController]
    public class BarbersController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public BarbersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.Barbers";
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
        public JsonResult Post(Barbers user)
        {
            string query = @"
                    insert into dbo.Barbers (Barbername,Barberemail,Barberpassword)
                    values
                    ('" + user.Barbername + @"'
                    ,'" + user.Barberemail + @"'
                    ,'" + user.Barberpassword + @"'
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
    }
}