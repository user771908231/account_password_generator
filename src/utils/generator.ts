export function generateCredentials(): { username: string; password: string } {
    const username = generateRandomString(8);
    const password = generateRandomString(12, true);
    return { username, password };
}

function generateRandomString(length: number, includeSpecialChars: boolean = false): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const characters = includeSpecialChars ? charset + specialChars : charset;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}