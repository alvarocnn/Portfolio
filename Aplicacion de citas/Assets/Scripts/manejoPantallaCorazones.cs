using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;
using System.Xml;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;



public class manejoPantallaCorazones : MonoBehaviour
{
    public Button españolBoton;
    public Button inglesBoton;
    public static bool español=true;
    public TMP_Text[] arrayTMP; 
    
    XmlDocument miXml;
    public static Dictionary<string, string> diccionarioFrases;

    private string[] textoAbuelos = { "Hola me llamo pepita tengo 73 años y me encanta regar mi huerto",
                                      "Hola me llamo pepa, tengo 78 años y me encanta el cocido",
                                      "Hola me llamo josefa tengo 56 años y me gusta la musica",
                                      "Hola me llamo luisa tengo 68 años y me gusta la danza",
                                      "Hola me llamo maria tengo 65 recien jubilada y muy traviesa",
                                      "Hola me llamo José tengo 84 años y me gusta el cocido",
                                      "Hola me llamo Raúl tengo 79 años y me gustan los coches",
                                      "Buenas me llamo Pepe y me gustan las muheres",
                                      "Hola me llamo x y me guta programar",
                                      "Hola soy Daniel tengo 87 años y me gusta el surf, una vez casi me mato"};


    public Sprite[] imagenAbuelos;
    public Image imagenActiva;
    public TMP_Text text;
    public Button botonCorazon;
    public Button botonCorazonRoto;
    public bool isPulsating = false;
    public bool isFalling = false;
    public Button irPantallaMensajes;
    public Button botonAjustes;
    public Image popUp;
    private bool popUpActivo=true;
    public GameObject contenidoBotonAjustes;
    public Button cerrarSesion;
    public Button FAQ;
    public Button manualUsuario;
    public Button politicaPrivacidad;
    
    int i = 0;

    public void Awake()
    {
        TextAsset xmlAsset = Resources.Load<TextAsset>("miXml");
        miXml = new XmlDocument();
        miXml.LoadXml(xmlAsset.text);
        diccionarioFrases=ReadCsv();
        AsignarValoresATextos(arrayTMP,diccionarioFrases);
        
    }
    void Start()
    {

        
        // List<ClasePersona> listaDesordenada = recorrerPersonasAleatorias(Personas.personas);
        imagenActiva.sprite = imagenAbuelos[i];
        text.text = textoAbuelos[i];

        botonCorazon.onClick.AddListener(OnClickBotonCorazon);
        botonCorazonRoto.onClick.AddListener(OnClickBotonCorazonRoto);
        irPantallaMensajes.onClick.AddListener(irPantallaMensaje);
        botonAjustes.onClick.AddListener(popUpAjustes);
        manualUsuario.onClick.AddListener(()=>{
                Application.OpenURL("https://drive.google.com/file/d/1PuV85OtZ5LpLuRrE9wytIUpHxELEgHtQ/view?usp=sharing");
            });
        politicaPrivacidad.onClick.AddListener(() =>
        {
            Application.OpenURL("https://drive.google.com/file/d/1Sw5FpLmYrqf9VV6DoLsmcHRmoHA5x7JW/view?usp=sharing");
        });

    }


    public void OnClickBotonCorazon()
    {
        XmlNodeList listaPersonas = miXml.SelectNodes("personas/persona");
        
        PulsateHeart();
        i++;
        if (i < imagenAbuelos.Length)
        {
            XmlNode persona = listaPersonas[i];
            imagenActiva.sprite = imagenAbuelos[i];
            text.text =(string)persona.SelectSingleNode("descripcion").InnerText;
        }
        else
        {
            imagenActiva.gameObject.SetActive(false);
            text.text = "NO HAY MAS PAREJAS DISPONIBLES";
        }


        /**foreach (ClasePersona persona in listaDesordenada)
        {
            imagenActiva.sprite = persona.imagen;
            persona.descripcion = text.text;

        }*/

    }

    public void boton12()
    {
        SceneManager.LoadScene("EscenaLogin");
    }

    public void OnClickBotonCorazonRoto()
    {
        XmlNodeList listaPersonas = miXml.SelectNodes("personas/persona");


        FallButton(botonCorazonRoto);
        i++;
        if (i < imagenAbuelos.Length)
        {
            XmlNode persona = listaPersonas[i];
            imagenActiva.sprite = imagenAbuelos[i];
            text.text = (string)persona.SelectSingleNode("descripcion").InnerText;
        }
        else
        {
            imagenActiva.gameObject.SetActive(false);
            text.text = "NO HAY MAS PAREJAS DISPONIBLES";
        }


        /**foreach (ClasePersona persona in listaDesordenada)
        {
            imagenActiva.sprite = persona.imagen;
            persona.descripcion = text.text;

        }*/

    }

    void PulsateHeart()
    {
        if (!isPulsating)
        {
            isPulsating = true;

            // Escala original
            Vector3 originalScale = transform.localScale;

            // Escala más grande para el pulso
            Vector3 pulseScale = originalScale * 1.2f;

            // Duración de la animación
            float duration = 0.3f;

            // Configura y reproduce la animación con LeanTween
            LeanTween.scale(botonCorazon.gameObject, pulseScale, duration).setEase(LeanTweenType.punch).setLoopPingPong(1).setOnComplete(() =>
            {
                // Restaura la escala original al final de la animación
                transform.localScale = originalScale;
                isPulsating = false;
                
            });
        }
    }

    void FallButton(Button button)
    {
        if (!isFalling)
        {
            isFalling = true;

            // Posición original
            Vector3 originalPosition = button.transform.position;

            // Nueva posición para la caída
            Vector3 fallPosition = new Vector3(originalPosition.x, originalPosition.y - 100f, originalPosition.z);

            // Duración de la animación
            float duration = 1f;

            // Configura y reproduce la animación con LeanTween
            LeanTween.move(button.gameObject, fallPosition, duration).setEase(LeanTweenType.easeInOutQuad).setOnComplete(() =>
            {


                // Reinicia la posición original
                button.transform.position = originalPosition;
                isFalling = false;
            });
        }
    }


    public List<ClasePersona> recorrerPersonasAleatorias(List<ClasePersona> listToShuffle)
    {
        System.Random _rand = new System.Random();
        for (int i = listToShuffle.Count - 1; i > 0; i--)
        {
            var k = _rand.Next(i + 1);
            var value = listToShuffle[k];
            listToShuffle[k] = listToShuffle[i];
            listToShuffle[i] = value;
        }
        return listToShuffle;
    }

    public void irPantallaMensaje()
    {
        SceneManager.LoadScene("PantallaChat");
    }

    public void popUpAjustes()
    { Debug.Log("Count del diccionario: "+diccionarioFrases.Count);
        if(popUpActivo)
        {
            LeanTween.moveX(popUp.gameObject, 412f, 1f).setEase(LeanTweenType.easeOutBack).setOnComplete(() =>
            {
                LeanTween.scale(popUp.gameObject, new Vector3(1f, 1f, 1f), 0.2f).setLoopPingPong(1).setOnComplete(() =>
                {
                    contenidoBotonAjustes.SetActive(true);

                });
                
            });
            cerrarSesion.onClick.AddListener(() =>
            {
                SceneManager.LoadScene("EscenaLogin");
            });

            FAQ.onClick.AddListener(() => {
            SceneManager.LoadScene("FAQ");
        



            

            
        
        });
          inglesBoton.onClick.AddListener(()=>
            {
                español=false;
                Debug.Log(español);
                AsignarValoresATextos(arrayTMP,ReadCsv());
            }   
            );
            españolBoton.onClick.AddListener(()=>
                {
                    Debug.Log(diccionarioFrases.Count);
                    español=true;
                    AsignarValoresATextos(arrayTMP,ReadCsv());
                }

            );
            popUpActivo=false;
        }
        else
        {
            contenidoBotonAjustes.SetActive(false);
            LeanTween.moveX(popUp.gameObject, Screen.width+420f, 1f).setEase(LeanTweenType.easeInBack);   
            
            popUpActivo=true;
        }
    
    }



    public static Dictionary<string, string> ReadCsv() {
        Dictionary<string, string> diccionario =new Dictionary<string, string>();
        TextAsset csvFile;
        if(español){
            csvFile= Resources.Load<TextAsset>("Csv unity ES - Hoja 1");
        }else{
            csvFile=Resources.Load<TextAsset>("CSV unity EN - Hoja 1");
        }
    
        string[] lineas =csvFile.text.Split('\n');
        
        Debug.Log(lineas.Length);
        foreach (string line in lineas)
        {
            Debug.Log(line);
            string[] fields={line.Substring(0,line.IndexOf(",")),line.Substring(line.IndexOf(",")+1)};
            //Debug.Log(fields.Length);
            if (fields[0]==null|| fields[0] == "")
            {
                break;
            }
            else
            {
                diccionario.Add(fields[0], fields[1]);
            }

        }
        return diccionario;

        
    
    }

    public static void AsignarValoresATextos(TMP_Text[] arrayTMP,Dictionary<string, string> diccionarioFrases)
    {

        foreach (TMP_Text tmpText in arrayTMP)
        {
            Debug.Log("Nombre del TMP:"+tmpText.name);
            if (diccionarioFrases.ContainsKey(tmpText.name))
            {
                tmpText.text = diccionarioFrases[tmpText.name];
            }
            else
            {
                Debug.LogError("La clave " + tmpText.name + " no se encuentra en el diccionario.");
            }
        }
    }

}
