# RSA Algorithm Implementation

![Screenshot](rsa-algorithm-implementation-1.gif?raw=true)

![Badge](badges/badge-1.svg?raw=true&sanitize=true)&emsp;![Badge](badges/badge-2.svg?raw=true&sanitize=true)&emsp;![Badge](badges/badge-3.svg?raw=true&sanitize=true)

> **Note:** Change the tab size from **8 (default)** to **4** by visiting `GitHub > Settings > Appearance > Tab Size Preference` to see the code in the GitHub repository in good formatting.

## Understand the RSA Algorithm
Cryptography is a method of securing information and communication techniques derived from mathematical concepts and a set of rule-based calculations called algorithms, to transform messages in ways that are hard to decipher. There are two techniques of cryptography:
1. **Symmetric Key Cryptography:** sender and receiver use the same keys to encrypt and decrypt the message
2. **Asymmetric Key Cryptography:** sender and receiver use different keys to encrypt and decrypt the message 

Asymmetric Key Cryptography is also called ***Public Key Cryptography***. The Public key is used for encryption and the Private Key is used for decryption. Decryption cannot be done using a public key. The two keys are linked, but the private key cannot be derived from the public key. The public key is well known, but the private key is secret and it is known only to the user who owns the key.

RSA comes from the surnames of ***Ron Rivest, Adi Shamir*** and ***Leonard Adleman***, who publicly described the algorithm in 1977. RSA algorithm is asymmetric cryptography (public key cryptography) algorithm. The following illustration highlights how the RSA algorithm works:

![Screenshot](rsa-algorithm-implementation-2.png?raw=true)

RSA algorithm is based on the principle that it is ***easy to multiply large numbers***, but ***factoring large numbers is very difficult***. For example, it is easy to check that 1147 is the result of multiplying 31 by 37, but trying to find the factors of 1147 is a much longer process. So if someone can factor a large number, the private key is compromised. Therefore, the strength of the encryption depends entirely on the key size, and doubling or tripling the key size increases the strength of the encryption exponentially.

**RSA Algorithm** 

The following illustration is the flowchart of the RSA algorithm:

![Screenshot](rsa-algorithm-implementation-3.png?raw=true)

In RSA, the public key is generated by multiplying two large prime numbers P and Q together, and the private key is generated through a different process involving P and Q. A user can then distribute his public key and anyone wishing to send the user a message would encrypt their message using the public key. When the user receives the encrypted message, they decrypt it using the private key and can read the original message.

The receiver chooses two large prime numbers P and Q `Let, P = 11 and Q = 13` and calculates `N = P * Q`.
```
N = P * Q 
  = 11 * 13 
  = 143
∴ N = 143
```
The receiver calculates `L = (P - 1) * (Q - 1)` and E such that `1 < E < L` and is ***coprime*** with ***N and L***.
```
Here, P = 11 and Q = 13
L = (P - 1) * (Q - 1) 
  = (11 - 1) * (13 - 1) 
  = 10 * 12 
  = 120
∴ L = 120  
Here, N = 143 and L = 120
Let, E = 7
1 < 7 < 120: true
Factors of 7: 7
Factors of 143: 11, 13, 143
Factors of 120: 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120
Here, (7, 143) and (7, 120) have no shared factor greater than 1. (∵ 1 forms a coprime pair with any other number)
∴ 1 < E < L and E is coprime with N and L.
∴ E = 7
```
The receiver calculates D such that `(D * E) % L = 1`.
```
Here, E = 7 and L = 120
Let, D = 223
(D * E) % L = 1
(223 * 7) % 120 = 1
∴ D = 223
```
The receiver gets the public and the private keys.
```
Public key (E, N): (7, 143)
Private key (D, N): (223, 143)
```
The sender first converts a message into a number M using the ***ASCII character encoding format*** and the same way the receiver converts a decrypted number M into a message. The following illustration is the ASCII codes for the alphabets to explain the example that comes next:

![Screenshot](rsa-algorithm-implementation-4.png?raw=true)

For example, the message "***Ravindra***" would be encoded as  **82**97**118**105**110**100**114**97.

The sender calculates `C = (M ^ E) % N` is the ciphertext, or the encrypted message.
- [x] Make calculations \
***Modular exponentiation calculator...***
```
Here, E = 7 and N = 143
Let, M = 82 (ASCII: Letter 'R' from Ravindra)
C = (M ^ E) % N
  = (82 ^ 7) % 143
  = 69
∴ C = 69
```
The rest of the letters are calculated in the same way.

Here, the message "***Ravindra***" would be encrypted as **69**59**79**118**33**100**49**59.

The receiver calculates `M = (C ^ D) % N`, thus retrieving the original number M.
- [x] Make calculations \
***Modular exponentiation calculator...***
```
Here, C = 69, D = 223 and N = 143
M = (C ^ D) % N
  = (69 ^ 223) % 143
  = 82
∴ M = 82 (ASCII: Letter 'R' from Ravindra)
```
The rest of the encrypted numbers are calculated in the same way.

Here, the encrypted message **69**59**79**118**33**100**49**59 would be decrypted as **82**97**118**105**110**100**114**97 and the decrypted numbers would be decoded as the original message "***Ravindra***".

## License
See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
> **Note:** This is an old repository that has been organized and uploaded again. Its first commit was made on **September 10, 2021.**
