using System;
namespace hiarsalon.Models
{
    public class Appointments
    {
        public int ApId { get; set; }
        public string Username { get; set; }
        public string Useremail { get; set; }
        public string Barbername { get; set; }
        public int Fee { get; set; }
        public string ApDate { get; set; }
        public string ApTime { get; set; }
    }
}