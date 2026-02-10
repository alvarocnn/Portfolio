namespace PracticaExamenFinal.Models
{
    public interface IProductos
    {

        void BorrarProducto(Producto producto);
        Producto buscarProducto(int id);
        Producto buscarProductoNombre(string nombre);
        void cerrarConexion();
        void InsertarPrducto(Producto producto);
        List<Producto> listarProductos();
        List<Producto> listarProductosOrdenadosPorCategoria();
        List<Producto> listarProductosOrdenadosPorNombre();
        List<Producto> listarProductosOrdenadosPorPrecio();
        void ModificarProducto(Producto producto);
    }
}