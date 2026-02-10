
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Localization.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using PracticaExamenFinal.Models;

namespace Proyecto_Final2
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            IMvcBuilder mvcBuilder = builder.Services.AddControllersWithViews();

            mvcBuilder.AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix);
            mvcBuilder.AddDataAnnotationsLocalization();
            builder.Services.AddLocalization();

            var localizationOptions = new RequestLocalizationOptions();
            IList<string> supportedCultures = new List<string> { "en-US", "es-ES", "fr-FR" };
            localizationOptions.AddSupportedCultures(supportedCultures.ToArray());
            localizationOptions.AddSupportedUICultures(supportedCultures.ToArray());
            localizationOptions.DefaultRequestCulture = new RequestCulture
             (culture: "en-US", uiCulture: "en-US");

            localizationOptions.ApplyCurrentCultureToResponseHeaders = true;

            // Agrega el proveedor de cultura basado en rutas
            localizationOptions.RequestCultureProviders.Insert
            (
            0,
            new RouteDataRequestCultureProvider() { Options = localizationOptions }
            );

            builder.Services.AddSingleton(localizationOptions);
            builder.Services.AddControllers
            (
            options =>
            {
                // Agrega el filtro de middleware globalmente
                options.Filters.Add(new MiddlewareFilterAttribute(typeof(LocalizationPipeline)));
            }
            );

            

           string environment = GetCurrentEnvironment();
           System.Diagnostics.Debug.WriteLine("El entorno es: "+environment);
            
            string generalConfigFilePath = Path.Combine
            (Environment.CurrentDirectory, $"appsettings.json");
            
            
            string currentEnvConfigFilePath = Path.Combine
             (Environment.CurrentDirectory, $"AppSettings.{environment}.json");
            ConfigurationBuilder configBuilder = new();
            configBuilder.AddJsonFile(generalConfigFilePath, false, true);
            configBuilder.AddJsonFile(currentEnvConfigFilePath, false, true);
            configBuilder.AddCommandLine(args);

            IConfiguration config = configBuilder.Build();

            string tituloAplicacion = config.GetValue<string>("tituloAplicacion");
            Console.WriteLine(tituloAplicacion);
            string cadenaConexion = config.GetValue<string>("cadenaConexion");
            Console.WriteLine(cadenaConexion);

            builder.Services.AddOptions<ConfigModel>();
            builder.Services.Configure<ConfigModel>(config);

            builder.Services.AddSingleton<IProductos, Productos>();
            builder.Services.AddSingleton<IEncriptacion, Encriptacion>();

            var app = builder.Build();
            app.UseRequestLocalization(localizationOptions);

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.MapControllerRoute
            (
            name: "default",
            pattern: "{culture=en-US}/{controller=Home}/{action=Index}/{id?}"
            );
            app.Run();

        }
        private static string GetCurrentEnvironment()
        {
            // Obtiene el nombre del entorno actual a partir de una
            // variable de entorno del sistema operativo que tiene el
            // identificador "ENVIRONMENT"
            string environment = Environment.GetEnvironmentVariable("ENTORNO");
            // Obtiene el nombre del entorno actual a partir de la configuración
            // del archivo de configuración de entorno.
            // Si existe el archivo, el entorno que hay configurado en él, sobrescribe
            // al entorno configurado en la variable de entorno

            return environment;
        }
    }

}


