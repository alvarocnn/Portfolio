using System.Security.Cryptography;
using System.Text;

namespace Proyecto_Final2
{
    public class Encriptacion : IEncriptacion
    {

        public string CalcularHashArchivo(string rutaFichero)
        {
            using (var sha256 = SHA256.Create())
            {
                using (var stream = File.OpenRead(rutaFichero))
                {
                    byte[] hashBytes = sha256.ComputeHash(stream);
                    return BitConverter.ToString(hashBytes).Replace("-", String.Empty);
                }
            }
        }

        public bool VerificarHashArchivo(string rutaFichero, string hashOriginal)
        {
            string hashCalculado = CalcularHashArchivo(rutaFichero);
            return string.Equals(hashCalculado, hashOriginal, StringComparison.OrdinalIgnoreCase);
        }


        public static string GenerateKeys(bool includePrivateKey)
        {
            string xmlKeys = null;
            using (RSACryptoServiceProvider rsaAlgorithm = new RSACryptoServiceProvider())
            {
                xmlKeys = rsaAlgorithm.ToXmlString(includePrivateKey);
            }
            return xmlKeys;
        }


        public byte[] EncryptAsimetrico(byte[] clearBytes, string xmlKeys)
        {
            byte[] encryptedBytes = null;
            using (RSA rsaAlg = RSA.Create())
            {
                rsaAlg.FromXmlString(xmlKeys);
                encryptedBytes = rsaAlg.Encrypt(clearBytes, RSAEncryptionPadding.Pkcs1);
            }
            return encryptedBytes;
        }
        public byte[] DecryptAsimetrico(byte[] encryptedBytes, string xmlKeys)
        {
            byte[] decryptedBytes = null;
            using (RSA rsaAlgorithm = RSA.Create())
            {
                rsaAlgorithm.FromXmlString(xmlKeys);
                decryptedBytes = rsaAlgorithm.Decrypt(encryptedBytes, RSAEncryptionPadding.Pkcs1);
            }
            return decryptedBytes;
        }

        public byte[] GenerateIV()
        {
            byte[] iv;
            using (Aes aesAlgorithm = Aes.Create())
            {
                iv = aesAlgorithm.IV;
            }
            return iv;
        }
        public byte[] GenerateKey()
        {
            byte[] key;
            using (Aes aesAlgorithm = Aes.Create())
            {
                key = aesAlgorithm.Key;
            }
            return key;
        }
        public byte[] EncryptSimetrico(byte[] iv, byte[] key, String inputMessage)
        {
            byte[] encryptedBytes;
            using (AesManaged aesAlgorithm = new AesManaged())
            {
                ICryptoTransform encryptor = aesAlgorithm.CreateEncryptor(key, iv);
                using (MemoryStream memoryPipeline = new MemoryStream())
                {
                    using (
                    CryptoStream cryptoPipeline = new CryptoStream(
                     memoryPipeline,
                    encryptor,
                     CryptoStreamMode.Write
                     )
                    )
                    {
                        using (StreamWriter cryptoWriter = new
                         StreamWriter(cryptoPipeline))
                        {
                            cryptoWriter.Write(inputMessage);
                        }
                        encryptedBytes = memoryPipeline.ToArray();
                    }
                }
            }
            return encryptedBytes;
        }

        public string DecryptSimetrico(byte[] encryptedMessage, byte[] iv, byte[] key)
        {
            string decryptedMessage = null;
            Aes aesAlgorithm = Aes.Create();
            try
            {
                aesAlgorithm.Key = key;
                aesAlgorithm.IV = iv;
                ICryptoTransform encryptor = aesAlgorithm.CreateDecryptor();
                try
                {
                    MemoryStream memoryPipeline = new MemoryStream(encryptedMessage);
                    try
                    {
                        CryptoStream cryptoPipeline = new CryptoStream(memoryPipeline, encryptor,
                         CryptoStreamMode.Read);
                        try
                        {
                            StreamReader pipeLineReader = new StreamReader(cryptoPipeline);
                            try
                            {
                                decryptedMessage = pipeLineReader.ReadToEnd();
                            }
                            finally
                            {
                                if (pipeLineReader != null)
                                {
                                    pipeLineReader.Dispose();
                                    pipeLineReader = null;
                                    cryptoPipeline = null;
                                    memoryPipeline = null;
                                }
                            }
                        }
                        finally
                        {
                            if (cryptoPipeline != null)
                            {
                                cryptoPipeline.Dispose();
                                cryptoPipeline = null;
                                memoryPipeline = null;
                            }
                        }
                    }
                    finally
                    {
                        if (memoryPipeline != null)
                        {
                            memoryPipeline.Dispose();
                            memoryPipeline = null;
                        }
                    }
                }
                finally
                {
                    if (encryptor != null)
                    {
                        encryptor.Dispose();
                        encryptor = null;
                    }
                }
            }
            finally
            {
                if (aesAlgorithm != null)
                {
                    aesAlgorithm.Dispose();
                    aesAlgorithm = null;
                }
            }
            return decryptedMessage;
        }

        public string GenerateKeysAsimetrico(bool includePrivateKey)
        {
            string xmlKeys = null;
            using (RSACryptoServiceProvider rsaAlgorithm = new RSACryptoServiceProvider())
            {
                xmlKeys = rsaAlgorithm.ToXmlString(includePrivateKey);
            }
            return xmlKeys;
        }
        public static Byte[] GetDigitalSignature(String message, String xmlKeys)
        {
            Byte[] signedBytes = null;
            SHA512Managed sha512Algorithm = new SHA512Managed();
            try
            {
                RSACryptoServiceProvider rsaAlgorithm = new RSACryptoServiceProvider();
                try
                {
                    rsaAlgorithm.FromXmlString(xmlKeys);
                    RSAPKCS1SignatureFormatter formatter = new
                    RSAPKCS1SignatureFormatter(rsaAlgorithm);
                    formatter.SetHashAlgorithm("SHA512");
                    Byte[] messageBytes = Encoding.UTF8.GetBytes(message);
                    Byte[] hashedBytes = sha512Algorithm.ComputeHash(messageBytes);
                    signedBytes = formatter.CreateSignature(hashedBytes);
                }
                finally
                {
                    if (rsaAlgorithm != null)
                    {
                        rsaAlgorithm.Dispose();
                        rsaAlgorithm = null;
                    }
                }
            }
            finally
            {
                if (sha512Algorithm != null)
                {
                    sha512Algorithm.Dispose();
                    sha512Algorithm = null;
                }
            }
            return signedBytes;
        }

        public bool IsValidSignature(string message, byte[] digitalSignature, string xmlPublicKey)
        {
            bool isValid = false;
            SHA512Managed sha512Algorithm = new SHA512Managed();
            try
            {
                RSACryptoServiceProvider rsaAlgorithm = new RSACryptoServiceProvider();
                try
                {
                    Byte[] messageBytes = Encoding.UTF8.GetBytes(message);
                    Byte[] hashedBytes = sha512Algorithm.ComputeHash(messageBytes);
                    rsaAlgorithm.FromXmlString(xmlPublicKey);
                    RSAPKCS1SignatureDeformatter deformatter = new
                     RSAPKCS1SignatureDeformatter(rsaAlgorithm);
                    deformatter.SetHashAlgorithm("SHA512");
                    if (deformatter.VerifySignature(hashedBytes, digitalSignature))
                    {
                        isValid = true;
                    }
                }
                finally
                {
                    if (rsaAlgorithm != null)
                    {
                        rsaAlgorithm.Dispose();
                        rsaAlgorithm = null;
                    }
                }
            }
            finally
            {
                if (sha512Algorithm != null)
                {
                    sha512Algorithm.Dispose();
                    sha512Algorithm = null;
                }
            }
            return isValid;
        }
    }
}
