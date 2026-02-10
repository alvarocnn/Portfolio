using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

using UnityEngine.SceneManagement;

public class ScriptFAQ : MonoBehaviour
{
    public TMP_Text[] arrayTMP;

    public Button botonCerrar;
    public Button botonCoincidencias;
    public Button botonManejoAplicacion;
    public Button botonSeguridadYPrivacidad;
    public Button botonInteraciones;
    public Button botonSoporteYAyuda;

    public GameObject popUpPerfiles;
    public GameObject popUpManejoApli;
    public GameObject popUpSeguridad;
    public GameObject popUpInteracciones;
    public GameObject popUpSoporte;

    public Button botonCerrarPopUpPerfiles;
    public Button botonCerrarPopUpManejoApli;
    public Button botonCerrarPopUpSeguridad;
    public Button botonCerrarPopUpInteracciones;
    public Button botonCerrarPopUpSoporte;

    /*public Button botonDesplegable2;
    public Button botonDesplegable3;
    public Button botonDesplegable4;
    public Button botonDesplegable5;*/
    void Start()
    {
        manejoPantallaCorazones.AsignarValoresATextos(arrayTMP,manejoPantallaCorazones.ReadCsv());

        botonCerrar.onClick.AddListener(OnClickBotonCerrar);

        botonCoincidencias.onClick.AddListener(() =>
            popUpPerfiles.SetActive(true)
        );
        botonManejoAplicacion.onClick.AddListener(() =>
            popUpManejoApli.SetActive(true)
        );
        botonSeguridadYPrivacidad.onClick.AddListener(() =>
            popUpSeguridad.SetActive(true)
        );
        botonInteraciones.onClick.AddListener(() =>
            popUpInteracciones.SetActive(true)
        );
        botonSoporteYAyuda.onClick.AddListener(() =>
            popUpSoporte.SetActive(true)
        );


        
        botonCerrarPopUpPerfiles.onClick.AddListener(() =>
        {
            popUpPerfiles.SetActive(false);
        });
        botonCerrarPopUpManejoApli.onClick.AddListener(() =>
        {
            popUpManejoApli.SetActive(false);
        });
        botonCerrarPopUpSeguridad.onClick.AddListener(() =>
        {
            popUpSeguridad.SetActive(false);
        });
        botonCerrarPopUpInteracciones.onClick.AddListener(() =>
        {
            popUpInteracciones.SetActive(false);
        });
        botonCerrarPopUpSoporte.onClick.AddListener(() =>
        {
            popUpSoporte.SetActive(false);
        });


    }

    // Update is called once per frame
    void Update()
    {
        
    }

   


    public void OnClickBotonCerrar()
    {
        SceneManager.LoadScene("SampleScene");
    }

    

}
