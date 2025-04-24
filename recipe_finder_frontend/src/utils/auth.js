
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');
    return !!token && !!userInfo;
};


export const getToken = () => {
    return localStorage.getItem('token');
};


export const getUser = () => {
    const userInfo = localStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : null;
};


export const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    window.dispatchEvent(new Event('userLogin'));
};


export const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userLogout'));
};


export const hasPermission = (requiredRoles = []) => {
    const user = getUser();
    if (!user || !user.roles) return false;
    return requiredRoles.some(role => user.roles.includes(role));
};