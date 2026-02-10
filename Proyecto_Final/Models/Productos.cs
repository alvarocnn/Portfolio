using Microsoft.Extensions.Options;
using Proyecto_Final2;
using System.Data;
using System.Data.SqlClient;


namespace PracticaExamenFinal.Models
{
    public class Productos : IProductos
    {
        private SqlConnection connection;
        private readonly ConfigModel _config;
        private readonly IOptionsMonitor<ConfigModel> _options;
        private IDisposable OptionsDisposable { get; set; }


        public Productos(IOptionsMonitor<ConfigModel> options)
        {
            this._config = options.CurrentValue;
            connection = new(_config.cadenaConexion);
            connection.Open();
            this._options = options;
            this.OptionsDisposable = options.OnChange<ConfigModel>(ReadNewConfig);

        }

        private void ReadNewConfig(ConfigModel newConfig)
        {

            // Esta sentencia desactiva el evento de cambio de configuración.
            // Normalmente, siempre será lo primero que escribamos en este método.
            if (this.OptionsDisposable != null)
            {
                this.OptionsDisposable.Dispose();
                this.OptionsDisposable = null;
            }
            // En este punto hay que hacer que los miembros de la clase que dependen de
            // la configuración, vuelvan a leerla. En ese caso, simplemente
            // actualizamos la propiedad Config para que apunte a la nueva
            // configuración.
            this.cerrarConexion();
            connection = new(newConfig.cadenaConexion);
            Console.WriteLine("Recargando informacion");
            connection.Open();

            // Normalmente, la última instrucción de este método siempre será la
            // siguiente, que vuelve a habilitar el evento de cambio de configuración.
            this.OptionsDisposable = this._options.OnChange<ConfigModel>(ReadNewConfig);
        }




        public void InsertarPrducto(Producto producto)
        {
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "INSERT INTO Producto_2(nombre,descripcion,precio,categoria,url_imagen ) OUTPUT INSERTED.ID VALUES (@nombre, @descripcion,@precio,@categoria,@url_imagen)";
                SqlParameter nombre = new()
                {
                    ParameterName = "@nombre",
                    Direction = ParameterDirection.Input,
                    Value = producto.Nombre,
                    SqlDbType = SqlDbType.Text
                };
                SqlParameter descripcion = new()
                {
                    ParameterName = "@descripcion",
                    Direction = ParameterDirection.Input,
                    Value = producto.Descripcion,
                    SqlDbType = SqlDbType.Text
                };
                SqlParameter precio = new()
                {
                    ParameterName = "@precio",
                    Direction = ParameterDirection.Input,
                    Value = producto.Precio,
                    SqlDbType = SqlDbType.Decimal
                };
                SqlParameter categoria = new()
                {
                    ParameterName = "@categoria",
                    Direction = ParameterDirection.Input,
                    Value = producto.Categoria,
                    SqlDbType = SqlDbType.Text
                };
                SqlParameter url_imagen = new()
                {
                    ParameterName = "@url_imagen",
                    Direction = ParameterDirection.Input,
                    Value = producto.UrlImagen,
                    SqlDbType = SqlDbType.Text
                };
                command.Parameters.Add(nombre);
                command.Parameters.Add(descripcion);
                command.Parameters.Add(precio);
                command.Parameters.Add(categoria);
                command.Parameters.Add(url_imagen);
                Int32 newId = (Int32)command.ExecuteScalar();
                producto.Id = newId;
                //command.ExecuteNonQuery();
            }
        }

        public void BorrarProducto(Producto producto)
        {
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "DELETE FROM Producto_2 WHERE id = @id";

                SqlParameter paramIdProducto = new()
                {
                    ParameterName = "@id",
                    Direction = ParameterDirection.Input,
                    Value = producto.Id,
                    SqlDbType = SqlDbType.Int
                };

                command.Parameters.Add(paramIdProducto);
                command.ExecuteNonQuery();
            }
        }


        public void ModificarProducto(Producto producto)
        {

            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "UPDATE Producto_2 SET nombre = @nombre, descripcion = @descripcion, precio = @precio, categoria = @categoria, url_imagen=@url_imagen WHERE id = @id";

                SqlParameter paramNombre = new()
                {
                    ParameterName = "@nombre",
                    Direction = ParameterDirection.Input,
                    Value = producto.Nombre,
                    SqlDbType = SqlDbType.Text
                };

                SqlParameter paramDescripcion = new()
                {
                    ParameterName = "@descripcion",
                    Direction = ParameterDirection.Input,
                    Value = producto.Descripcion,
                    SqlDbType = SqlDbType.Text
                };

                SqlParameter paramPrecio = new()
                {
                    ParameterName = "@precio",
                    Direction = ParameterDirection.Input,
                    Value = producto.Precio,
                    SqlDbType = SqlDbType.Decimal
                };

                SqlParameter paramCategoria = new()
                {
                    ParameterName = "@categoria",
                    Direction = ParameterDirection.Input,
                    Value = producto.Categoria,
                    SqlDbType = SqlDbType.Text
                };
                SqlParameter paramUrl_imagen = new()
                {
                    ParameterName = "@url_imagen",
                    Direction = ParameterDirection.Input,
                    Value = producto.UrlImagen,
                    SqlDbType = SqlDbType.Text
                };

                SqlParameter paramId = new()
                {
                    ParameterName = "@id",
                    Direction = ParameterDirection.Input,
                    Value = producto.Id,
                    SqlDbType = SqlDbType.Int

                };


                command.Parameters.Add(paramNombre);
                command.Parameters.Add(paramDescripcion);
                command.Parameters.Add(paramPrecio);
                command.Parameters.Add(paramCategoria);
                command.Parameters.Add(paramUrl_imagen);
                command.Parameters.Add(paramId);

                command.ExecuteNonQuery();
            }
        }
        public List<Producto> listarProductos()
        {
            List<Producto> productos = new();
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Producto_2";

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Producto p = new();
                        p.Id = reader.GetInt32("id");
                        p.Nombre = reader.GetString("nombre");
                        p.Descripcion = reader.GetString("descripcion");
                        p.Precio = (double)reader.GetDecimal("precio");
                        p.Categoria = reader.GetString("categoria");
                        p.UrlImagen = reader.GetString("url_imagen");
                        productos.Add(p);
                    }
                }
            }
            return productos;

        }

        public Producto buscarProducto(int id)
        {
            Producto p = null;
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Producto_2 where id=@id";

                SqlParameter paramId = new()
                {
                    ParameterName = "@id",
                    Direction = ParameterDirection.Input,
                    Value = id,
                    SqlDbType = SqlDbType.Int
                };
                command.Parameters.Add(paramId);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        p = new();
                        p.Id = reader.GetInt32("id");
                        p.Nombre = reader.GetString("nombre");
                        p.Descripcion = reader.GetString("descripcion");
                        p.Precio = (double)reader.GetDecimal("precio");
                        p.Categoria = reader.GetString("categoria");
                        p.UrlImagen = reader.GetString("url_imagen");

                    }
                }
            }
            return p;
        }

        public Producto buscarProductoNombre(string nombre)
        {
            Producto p = null;
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Producto_2 where nombre=@nombre";

                SqlParameter paramNombre = new()
                {
                    ParameterName = "@nombre",
                    Direction = ParameterDirection.Input,
                    Value = nombre,
                    SqlDbType = SqlDbType.VarChar
                };
                command.Parameters.Add(paramNombre);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        p = new();
                        p.Id = reader.GetInt32("id");
                        p.Nombre = reader.GetString("nombre");
                        p.Descripcion = reader.GetString("descripcion");
                        p.Precio = (double)reader.GetDecimal("precio");
                        p.Categoria = reader.GetString("categoria");
                        p.UrlImagen = reader.GetString("url_imagen");

                    }
                }
            }
            return p;
        }

        public void cerrarConexion()
        {
            connection.Close();
        }

        public List<Producto> listarProductosOrdenadosPorNombre()
        {
            List<Producto> productos = new();
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Producto_2 ORDER BY nombre";


                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Producto p = new();
                        p.Id = reader.GetInt32("id");
                        p.Nombre = reader.GetString("nombre");
                        p.Descripcion = reader.GetString("descripcion");
                        p.Precio = (double)reader.GetDecimal("precio");
                        p.Categoria = reader.GetString("categoria");
                        p.UrlImagen = reader.GetString("url_imagen");
                        productos.Add(p);
                    }
                }
            }
            return productos;

        }
        public List<Producto> listarProductosOrdenadosPorPrecio()
        {
            List<Producto> productos = new();
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Producto_2 ORDER BY precio";


                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Producto p = new();
                        p.Id = reader.GetInt32("id");
                        p.Nombre = reader.GetString("nombre");
                        p.Descripcion = reader.GetString("descripcion");
                        p.Precio = (double)reader.GetDecimal("precio");
                        p.Categoria = reader.GetString("categoria");
                        p.UrlImagen = reader.GetString("url_imagen");
                        productos.Add(p);
                    }
                }
            }
            return productos;

        }
        public List<Producto> listarProductosOrdenadosPorCategoria()
        {
            List<Producto> productos = new();
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM Producto_2 ORDER BY categoria";


                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Producto p = new();
                        p.Id = reader.GetInt32("id");
                        p.Nombre = reader.GetString("nombre");
                        p.Descripcion = reader.GetString("descripcion");
                        p.Precio = (double)reader.GetDecimal("precio");
                        p.Categoria = reader.GetString("categoria");
                        p.UrlImagen = reader.GetString("url_imagen");
                        productos.Add(p);
                    }
                }
            }
            return productos;

        }
    }

}
