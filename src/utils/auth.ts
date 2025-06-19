export function isValidUserAuthActive(userAuth: { token: any; name: any; email: any }): boolean {
    if (!userAuth.token) {
        return false;
    }
    if (typeof userAuth.token === 'string' && userAuth.token.trim() === '') {
        return false;
    }
    if (typeof userAuth.token === 'number' && isNaN(userAuth.token)) {
        return false;
    }


    if (!userAuth.name) {
        return false;
    }
    if (typeof userAuth.name === 'string' && userAuth.name.trim() === '') {
        return false;
    }

    if (!userAuth.email) {
        return false;
    }
    if (typeof userAuth.email === 'string' && userAuth.email.trim() === '') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof userAuth.email === 'string' && !emailRegex.test(userAuth.email)) {
        return false;
    }
    return true;
}


export function getTokenFromLocalStorage(): string | null {
    try {
        const storedAuth = localStorage.getItem('userAuth');
        if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            if (parsedAuth && typeof parsedAuth.token === 'string' && parsedAuth.token.trim() !== '') {
                return parsedAuth.token;
            }
        }
    } catch (error) {
        console.error("Error al recuperar o parsear el token de localStorage:", error);
    }
    return null;
}