namespace Proyecto_Final2
{
    public interface IEncriptacion
    {
        string CalcularHashArchivo(string rutaFichero);
        byte[] DecryptAsimetrico(byte[] encryptedBytes, string xmlKeys);
        string DecryptSimetrico(byte[] encryptedMessage, byte[] iv, byte[] key);
        byte[] EncryptAsimetrico(byte[] clearBytes, string xmlKeys);
        byte[] EncryptSimetrico(byte[] iv, byte[] key, string inputMessage);
        byte[] GenerateIV();
        byte[] GenerateKey();
        string GenerateKeysAsimetrico(bool includePrivateKey);
        bool IsValidSignature(string message, byte[] digitalSignature, string xmlPublicKey);
        bool VerificarHashArchivo(string rutaFichero, string hashOriginal);
    }
}