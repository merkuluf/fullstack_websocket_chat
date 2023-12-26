export function generateRandomUsername(): string {
    const vowels: string = "aeiou";
    const consonants: string = "bcdfghjklmnpqrstvwxyz";
    const commonSuffixes: string[] = ["son", "man", "er", "lyn", "iel", "ton", "ley"];
    let username: string = "";
    const minLength: number = 4;
    const maxLength: number = 8;
    const length: number = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i: number = 0; i < length; i++) {
        let charset: string = i % 2 === 0 ? consonants : vowels;

        // Occasionally double the vowel
        if (i % 2 !== 0 && Math.random() < 0.2) { // 20% chance to double vowel
            charset += vowels;
        }

        const randomIndex: number = Math.floor(Math.random() * charset.length);
        username += charset[randomIndex];
    }

    // Capitalize the first letter
    username = username.charAt(0).toUpperCase() + username.slice(1);

    // Optionally add a common suffix
    if (Math.random() < 0.3) { // 30% chance to add a suffix
        username += commonSuffixes[Math.floor(Math.random() * commonSuffixes.length)];
    }

    return username;
}


function shuffleString(str: string): string {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

export function generateRandomPassword(length: number = 8): string {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const symbols = "@#$%&";
    const allChars = lowercaseChars + uppercaseChars + digits + symbols;

    let password = "";
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += digits[Math.floor(Math.random() * digits.length)];

    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return shuffleString(password); // Shuffle to avoid predictable patterns
}
