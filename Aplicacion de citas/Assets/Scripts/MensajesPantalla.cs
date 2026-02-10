using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MensajesPantalla : MonoBehaviour
{
    private List<GameObject> mensajes = new List<GameObject>();
    private float duracionAnimacion = 0.12f;
    private int contador = 0;


    public GameObject mensaje;
    public Button botonEnviarMensaje;
    public TMP_InputField inputMensaje;
    public Button botonRespuesta;
    public GameObject popUp;
    public Button irAPantallaCorazones;

    void Start()
    {
        mensaje.SetActive(false);
        popUp.SetActive(false);

        botonEnviarMensaje.onClick.AddListener(OnClickButton);
        botonRespuesta.onClick.AddListener(OnClickButtonRespuesta);
        irAPantallaCorazones.onClick.AddListener(irAPanallaCorazones);
      
    }

    void Update()
    {
        comprobarInputField();
    }
    public void OnClickButton()
    {
        contador++;
        if (!string.IsNullOrEmpty(inputMensaje.text)) {
            GameObject nuevoMensaje = Instantiate(mensaje, mensaje.transform.parent);

            nuevoMensaje.SetActive(true);
            LeanTween.moveLocalY(nuevoMensaje, 1f, duracionAnimacion);

            mensajes.Add(nuevoMensaje);
            foreach (GameObject objeto in mensajes)
            {
                LeanTween.moveLocalY(objeto, objeto.transform.localPosition.y + 150f, duracionAnimacion);
            }

            ponerTextEnBocadillo(inputMensaje.text, nuevoMensaje);
            inputMensaje.text = "";
            contador = 0;
        }
        
    }

    private void OnClickButtonRespuesta()
    {
        GameObject mensajeRespuesta = Instantiate(mensaje, mensaje.transform.parent);
        mensajeRespuesta.SetActive(true);
        mensajes.Add(mensajeRespuesta);
        LeanTween.moveLocalY(mensajeRespuesta, 1f, duracionAnimacion);
        LeanTween.moveLocalX(mensajeRespuesta, 318f, 0f);
        LeanTween.rotateY(mensajeRespuesta.GetComponentInChildren<Image>().gameObject, 180, 0);

        foreach (GameObject objeto in mensajes)
        {
            LeanTween.moveLocalY(objeto, objeto.transform.localPosition.y + 150f, duracionAnimacion);
        }
        ponerTextEnBocadillo("Que quieres maquina", mensajeRespuesta);
    }

    public void ponerTextEnBocadillo(string texto, GameObject objeto)
    {
        objeto.GetComponentInChildren<TMP_Text>().text = texto;
    }

    public void irAPanallaCorazones()
    {
        SceneManager.LoadScene("SampleScene");

    }

    public void comprobarInputField()
    {
        if (contador >= 5)
        {
            popUp.SetActive(true);
            if (popUp!=null) {
                LeanTween.moveLocalY(popUp,-480f,0.4f);
                LeanTween.alpha(popUp, 0f, 1.5f).setOnComplete(() => {
                    popUp.SetActive(false);
                    LeanTween.alpha(popUp, 1f, 0);
                });
            } 
            contador = 0;
        }
    }

   
       
    
}