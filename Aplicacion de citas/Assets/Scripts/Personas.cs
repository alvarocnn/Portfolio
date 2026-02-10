using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

[Serializable]
public class Personas
{
    private string nombreFichero = Path.Combine(Application.persistentDataPath, "ficheroPersonas.txt");
    private static Personas instance;
    public List<ClasePersona> personas;

    public Personas() { 
        personas = new List<ClasePersona>();
    }


    public void addPersona(ClasePersona persona)
    {
        personas.Add(persona);

    }

    public  List<ClasePersona> GetPersonas()
    {
        return personas;
    }

    public  void SetPersonas(List<ClasePersona> lista)
    {
        personas = lista;

    }

    public static Personas getInstance()
    {
        if (instance == null)
        {
            instance = new Personas();
            
        }
        return instance;
    }
   
   /* public void leerEnFichero()
    {
        StreamReader reader = new StreamReader(nombreFichero);
        string json=reader.ReadToEnd();
        reader.Close();
        instance=JsonUtility.FromJson<Personas >(json);
        Debug.Log(json);
        Debug.Log(personas.Count);
    }*/



}
