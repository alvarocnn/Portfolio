using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;


public class Registrarse : MonoBehaviour
{
    private string nombreFichero = Path.Combine(Application.persistentDataPath, "ficheroPersonas.txt");

    public TMP_Text[] arrayTMP;
    public TMP_InputField nombre;
    public TMP_InputField correo;
    public TMP_InputField contrasena;
    public TMP_InputField edad;
    public TMP_InputField descripcion;
    public Button botonIniciarSesion;
    public Text textoIncompleto; //quiero cambiarlo a un pop up
    public Sprite imagen;
    void Start()
    {
        //textoIncompleto.enabled = false;
        botonIniciarSesion.onClick.AddListener(IniciarSesion);
        manejoPantallaCorazones.AsignarValoresATextos(arrayTMP,manejoPantallaCorazones.ReadCsv());

    }



    public void IniciarSesion()
    {


        if (string.IsNullOrEmpty(nombre.text))
        {

            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        if (string.IsNullOrEmpty(correo.text))
        {
            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        if (string.IsNullOrEmpty(contrasena.text))
        {
            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        if (string.IsNullOrEmpty(edad.text))
        {
            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        if (string.IsNullOrEmpty(descripcion.text))
        {
            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        if (!ClasePersona.EsCorreoElectronico(correo.text))
        {
            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        if (ClasePersona.NombreSinNumeros(nombre.text))
        {
            //Aqui va el codigo del pop up
            textoIncompleto.enabled = true;

        }
        //if (Sprite.)
        //{


        //}
        else
        {

            ClasePersona persona = new ClasePersona(nombre.text, int.Parse(edad.text), correo.text, contrasena.text, descripcion.text, imagen);
            Personas.getInstance().addPersona(persona);
            
            escribirEnFichero();
            SceneManager.LoadScene("EscenaLogin");
        }

    }




    public void escribirEnFichero() {

        StreamWriter writer = new StreamWriter(nombreFichero, true);
        string json = JsonUtility.ToJson(Personas.getInstance());
        writer.WriteLine(json);
        writer.Close(); 


        Debug.Log("hola hola: " + json);
        

    }

}
