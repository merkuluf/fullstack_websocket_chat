function stringToColor(str: string): string {
    // Ensure the string is within the specified length limits
    if (str.length < 4 || str.length > 20) {
        throw new Error('String must be between 4 and 20 characters long');
    }

    // Generate a hash from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash into a hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }

    return color+"42";
}

export default stringToColor;