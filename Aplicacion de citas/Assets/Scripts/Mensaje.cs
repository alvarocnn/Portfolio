using System.Collections.Generic;
using UnityEngine;

public class Mensaje : MonoBehaviour
{

    private ClasePersona persona;
    private string horaMensaje;
    private List<string> listaMensajes;


    public Mensaje(ClasePersona _persona, string _horaMensaje)
    {

        this.persona = _persona;
        this.listaMensajes = new();
        this.horaMensaje = _horaMensaje;
    }

    public void setPersona(ClasePersona persona_)
    {
        this.persona = persona_;
    }
    public ClasePersona getPersona()
    {
        return this.persona;
    }

    public List<string> getListaMensajes()
    {
        return this.listaMensajes;
    }

    public void setListaMensajes(List<string> _listaMensajes)
    {
        this.listaMensajes = _listaMensajes;
    }

    public void setHoraMensaje(string hora)
    {
        this.horaMensaje = hora;
    }

    public string getHoraMensaje()
    {
        return this.horaMensaje;
    }
}
