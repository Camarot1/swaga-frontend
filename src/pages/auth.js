export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
// Декод токена
export const decodeToken = (token) => {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return null;
    }
};
// Получение данных пользователя из токена
export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    const payload = decodeToken(token);
    if (!payload) return null;


    return {
        id: payload.id,
        login: payload.login,
        exp: payload.exp
    };
};

export const isTokenExpired = () =>{
    const token = getToken()
    if (!token) return true

    const payload = decodeToken(token)
    if (!payload || !payload.exp) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
}


export const logout = () => {
    removeToken();
};


// проверка прав администратора через сервер
export const checkAdmin = async () => {
    const token = getToken();
    if (!token) return false;

    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/users/check-admin`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) return false;
        const data = await response.json();
        return data.isAdmin === true;
    } catch (error) {
        console.error('Ошибка проверки администратора:', error);
        return false;
    }
};