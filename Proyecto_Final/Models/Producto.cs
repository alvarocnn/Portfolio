namespace PracticaExamenFinal.Models
{
    public class Producto
    {

        private int id;
        private string descripcion;
        private double precio;
        private string nombre;
        private string categoria;
        private string url_imagen;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        public string Nombre
        {
            get { return nombre; }
            set { nombre = value; }
        }
        public double Precio
        {
            get { return precio; }
            set { precio = value; }
        }
        public string Descripcion
        {
            get { return descripcion; }
            set { descripcion = value; }

        }
        public string Categoria
        {
            get { return categoria; }
            set { categoria = value; }
        }

        public string UrlImagen
        {
            get { return url_imagen; }
            set { url_imagen = value; }
        }
        public Producto(string _nombre, string _descripcion, double _precio, string _categoria, string _url_imagen)
        {
            nombre = _nombre;
            descripcion = _descripcion;
            precio = _precio;
            categoria = _categoria;
            url_imagen = _url_imagen;
        }

        public Producto()
        {

        }

    }
}
