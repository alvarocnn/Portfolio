using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;


public class IrAPantallaRegistro : MonoBehaviour
{
    public TMP_Text[] arrayTMP;
    public Button botonIniciarSesion;
    public Button botonRegistrarse;
    public GameObject LogoGO;
    private float velocidadGiro = 5f;
    private int cantidadVueltas = 5;
    public TMP_InputField nombreUsuario;
    public TMP_InputField contraseñaUsuario;

    void Start()
    {
        //Personas.getInstance().leerEnFichero();
        manejoPantallaCorazones.AsignarValoresATextos(arrayTMP,manejoPantallaCorazones.ReadCsv());
        LeanTween.rotateAround(LogoGO, Vector3.up, 360f * cantidadVueltas, velocidadGiro).setOnComplete(() => { });

        botonRegistrarse.onClick.AddListener(cambiarEscenaRegistro);

        botonIniciarSesion.onClick.AddListener(() =>
        {
            if (nombreUsuario.text.Equals("admin")&& contraseñaUsuario.text.Equals("admin"))
            {
                SceneManager.LoadScene("SampleScene");
                return;
            }
            /*foreach (ClasePersona personasRegistradas in Personas.getInstance().GetPersonas())
            {
                Debug.Log("Inicio de sesión exitoso");
                if (personasRegistradas.nombre.Equals(nombreUsuario.text) && personasRegistradas.contrasena.Equals(contraseñaUsuario.text))
                {
                    Debug.Log("Inicio de sesión exitoso");
                    cambiarEscenaLogin();
                    return;
                }
            }*/
           
        });



    }


    public void cambiarEscenaRegistro()
    {
        SceneManager.LoadScene("EscenaRegistro");
    }

    public void cambiarEscenaLogin()
    {
        SceneManager.LoadScene("SampleScene");
    }
}
