using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMvcProject.Models
{
    public class RequestData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string PostCode { get; set; }
        public string Website { get; set; }
        public string County { get; set; }
        public string Town { get; set; }
        public string Description { get; set; }
        public string Password { get; set; }
        public string CreationDate { get; set; }
    }
    public class CreateAccount
    {
        public string Url { get; set; }
        public RequestData RequestData { get; set; }
    }

    public class RequestStaffData
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string TelephoneNo { get; set; }

        public string CreationDate { get; set; }
    }

    public class StaffData
    {
        public string Url { get; set; }

        public RequestStaffData ReqStaffData { get; set; }
    }

    public class ReqWorkingHours
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string NameOfDay { get; set; }
        public bool IsOffAllDay { get; set; }
        public string CreationDate { get; set; }
    }

    public class WorkingHours
    {
        public string Url { get; set; }

        public List<ReqWorkingHours> ReqWorkingHours { get; set; }
    }

    public class RequestAddService
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; }

        public string CategoryName { get; set; }

        public int CategoryId { get; set; }

        public int DurationInMinutes { get; set; }

        public int DurationInHours { get; set; }

        public float Cost { get; set; }

        public string Currency { get; set; }

        public string Colour { get; set; }

        public string CreationDate { get; set; }
    }

    public class Service
    {
        public string Url { get; set; }

        public RequestAddService RequestAddService { get; set; }
    }


    public class AssignStaff
    {
        public string Url { get; set; }

        public AssignStaffRequest RequestAssignService { get; set; }
    }
    public class AssignStaffRequest
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string CreationDate { get; set; }
    }



    public class EmployeeServicedata
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; }

        public string CategoryName { get; set; }

        public int CategoryId { get; set; }

        public int DurationInMinutes { get; set; }

        public int DurationInHours { get; set; }

        public int Cost { get; set; }

        public string Currency { get; set; }

        public string CreationDate { get; set; }

        public bool AllAssignStaffChecked { get; set; }

        public string staffCheckedCount { get; set; }

        public List<Employees> staff { get; set; }

    }

    public class Employees
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string TelephoneNo { get; set; }

        public string CreationDate { get; set; }

        public bool confirmed { get; set; }
    }

    public class DeAllocateServiceEmployees
    {
        public int CompanyId { get; set; }

        public int EmployeeId { get; set; }

        public int ServiceId { get; set; }
    }


    //////////Appointment Section//////////////////////

    public class BookAppointment
    {
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string CustomerIdsCommaSeperated { get; set; }
        public string StartHour { get; set; }
        public string StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
        public bool IsAdded { get; set; }
        public string Message { get; set; }
        public List<int> CustomerIds { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
    }

    public class UpdateBookAppointment
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string CustomerIdsCommaSeperated { get; set; }
        public string StartHour { get; set; }
        public string StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
        public bool IsAdded { get; set; }
        public string Message { get; set; }
        public List<int> CustomerIds { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public int Status { get; set; } 
    }


    public class AppointmentDetails
    {
        public string BookingId { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int DurationInMinutes { get; set; }
        public int DurationInHours { get; set; }
        public double Cost { get; set; }
        public string Currency { get; set; }
        public string Colour { get; set; }
        public int status { get; set; }
        public int CustomerId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
       

    }

    public class AllAppointments
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }

        public int ServiceId { get; set; }
        public Employees Employee { get; set; }

        public RequestAddService Service { get; set; }

        public List<int> CustomerIds { get; set; }
        public int Status { get; set; }    
        public string Start { get; set; }
        public string End { get; set; }
       
     
    }



    public class WorkingHoursofEmployee
    {
        public int CompanyId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public string DateOfBooking { get; set; }
        public string Day { get; set; }

    }




    /////MileStone_3////
    //Category and Service Section//

    public class Category
    {
        public int Id { get; set; }
        public string CompanyId { get; set; }
        public string Name { get; set; }
        public string CreationDate { get; set; }
    }

    public class Services
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public int DurationInMinutes { get; set; }
        public int DurationInHours { get; set; }
        public double Cost { get; set; }
        public string Currency { get; set; }
        public string Colour { get; set; }
        public int Buffer { get; set; }
        public string CreationDate { get; set; }
    }

    public class AssignedServiceStatus
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public int DurationInMinutes { get; set; }
        public int DurationInHours { get; set; }
        public double Cost { get; set; }
        public string Currency { get; set; }
        public string CreationDate { get; set; }
        public bool Confirmed { get; set; }
        public string AllocatedServiceCount { get; set; }
    }

    public class EmployeeWorkingHours
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public int NameOfDay { get; set; }
        public string NameOfDayAsString { get; set; }
        public bool IsOffAllDay { get; set; }
        public string CreationDate { get; set; }
    }

    public class CustomTimeOff
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string CreationDate { get; set; }
        public bool IsOffAllDay { get; set; }
    }

    public class UpdateTimeOff
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
        public bool IsOffAllDay { get; set; }
    }
    public class TimeOff
    {       
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
        public bool IsOffAllDay { get; set; }
    }

    public class BreakTime
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public int DayOfWeek { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
    }

    public class BreakTimeHoursofEmployee
    {
        public string Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public int DayOfWeek { get; set; }
        public string Day { get; set; }

        public List<TimeSchedule> StartEndTime { get; set; }
        public bool Available { get; set; }
        public string CreationDate { get; set; }

    }
    public class TimeSchedule
    {
        public string Id { get; set;}
        public int  DayOfWeek { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
    }

    public class SetBreak
    {
      
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public int DayOfWeek { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string CreationDate { get; set; }
    }

    public class LoginInfo
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class Notes
    {
        public int CustomerId { get; set; }
        public int CompanyId { get; set; }
        public string Description { get; set; }
        public string WhoAddedThis { get; set; }
        public string CreationDate { get; set; }
    }

}