using Microsoft.AspNetCore.Mvc;
using PracticaExamenFinal.Models;
using Proyecto_Final2.Models;
using System.Diagnostics;
using System.Text;
using System.Timers;

namespace Proyecto_Final2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IProductos _products;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IEncriptacion _encriptacion;

        public HomeController(ILogger<HomeController> logger, IProductos productos, IWebHostEnvironment hostingEnvironment, IEncriptacion encriptacion)
        {
            _logger = logger;
            _products = productos;
            _hostingEnvironment = hostingEnvironment;
            _encriptacion = encriptacion;
        }

        public IActionResult Index()
        {
            List<Producto> productos = _products.listarProductos();
            string rutaImagen = Path.Combine(_hostingEnvironment.WebRootPath, "Images", "Imagen_paisaje.webp");
            string hashFichero = _encriptacion.CalcularHashArchivo(rutaImagen);
            ViewBag.HashFichero = hashFichero;
            return View(productos);
        }

        public IActionResult Privacy()
        {

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult CifrarCadena(string inputCadenaCifrar)
        {
            string vista = "Index";
            string keys = _encriptacion.GenerateKeysAsimetrico(true);
            byte[] mensajeBytes = Encoding.UTF8.GetBytes(inputCadenaCifrar);
            byte[] mensajeCifrado = _encriptacion.EncryptAsimetrico(mensajeBytes, keys);
            string mensajeCifradoAsimetrico = Convert.ToBase64String(mensajeCifrado);

            byte[] mensajeDescifradoByte = _encriptacion.DecryptAsimetrico(mensajeCifrado, keys);
            string mensajeDescifradoAsimetrico = Encoding.UTF8.GetString(mensajeDescifradoByte, 0, mensajeDescifradoByte.Length);
            ViewBag.MensajeCifradoAsimetrico = mensajeCifradoAsimetrico;
            ViewBag.MensajeDescifradoAsimetrico = mensajeDescifradoAsimetrico;

            byte[] keySimetrico = _encriptacion.GenerateKey();
            byte[] iv = _encriptacion.GenerateIV();

            byte[] mensajeCifradoSimetrico = _encriptacion.EncryptSimetrico(iv, keySimetrico, inputCadenaCifrar);
            string mensajeCifradoSimetricoBase64 = Convert.ToBase64String(mensajeCifradoSimetrico);
            ViewBag.MensajeCifradoSimetrico = mensajeCifradoSimetricoBase64;

            string mensajeDescifradoSimetrico = _encriptacion.DecryptSimetrico(mensajeCifradoSimetrico, iv, keySimetrico);
            ViewBag.MensajeDescifradoAsimetrico = mensajeDescifradoSimetrico;



            List<Producto> productos = _products.listarProductos();
            return View(vista, productos);
        }

        public IActionResult VerificarHash(string inputHash)
        {
            string vista = "Index";
            List<Producto> productos = _products.listarProductos();
            string rutaImagen = Path.Combine(_hostingEnvironment.WebRootPath, "Images", "Imagen_paisaje.webp");
            bool hashCorrecto = _encriptacion.VerificarHashArchivo(rutaImagen, inputHash);
            if (hashCorrecto)
            {
                ViewBag.ResultadoHash = "El hash introducido es correcto";
            }
            else
            {
                ViewBag.ResultadoHash = "El hash introducido no es correcto";
            }
            return View(vista, productos);
        }
        public IActionResult Firmar(string inputFirma)
        {
            string vista = "Index";
            List<Producto> productos = _products.listarProductos();
            string keys = _encriptacion.GenerateKeysAsimetrico(true);
            ViewBag.Claves = keys;
            byte[] firma = Encriptacion.GetDigitalSignature(inputFirma, keys);
            string firmaEnBase64 = Convert.ToBase64String(firma);
            ViewBag.Firma = firmaEnBase64;

           

            return View(vista, productos);
        }

        public IActionResult VerificarFirma(string inputFirma,string inputClaves, string inputMensaje)
        {   
            string vista = "Index";
            List<Producto> productos = _products.listarProductos();
            byte[] firmaByte=Convert.FromBase64String(inputFirma);
            bool firmaValida = _encriptacion.IsValidSignature(inputMensaje,firmaByte,inputClaves);
            if (firmaValida)
            {
                ViewBag.FirmaValida = "La comprobación de la firma del mensaje es valida";
            }
            else
            {
                ViewBag.FirmaValida = "La comprobación de la firma del mensaje NO es valida";
            }
            return View(vista, productos);
        }
    }
}