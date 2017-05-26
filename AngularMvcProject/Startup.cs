using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularMvcProject.Startup))]
namespace AngularMvcProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
