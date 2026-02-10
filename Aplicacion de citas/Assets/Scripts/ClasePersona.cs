using System;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEngine;

[System.Serializable]
public class ClasePersona
{
    public string nombre;
    public int edad;
    public string id;
    public string correo;
    public string contrasena;
    public string descripcion;
    public Sprite imagen;


    public ClasePersona(string nombre, int edad, string correo, string contrasena, string descripcion, Sprite imagen)
    {

        this.nombre = nombre;
        this.edad = edad;
        this.id = Guid.NewGuid().ToString();
        this.correo = correo;
        this.contrasena = contrasena;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    public ClasePersona() { 
    
    
    }

    public static bool EsCorreoElectronico(string correo)
    {
        string patronCorreo = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        return Regex.IsMatch(correo, patronCorreo);
    }



    public static bool NombreSinNumeros(string nombre)
    {
        return nombre.Any(char.IsDigit);
    }


}
