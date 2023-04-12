export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSuccessful = (user) => ({
    type: "LOGIN_SUCCESSFUL",
    payload: user
});

export const LoginFailed = () => ({
    type: "LOGIN_FAILED"
});

export const Logout = () => ({ 
    type: "LOGOUT" 
});

export const updateStart = (userCredentials) => ({
    type: "UPDATE_START"
});

export const updateSuccessful = (user) => ({
    type: "UPDATE_SUCCESSFUL",
    payload: user
});

export const updateFailed = () => ({
    type: "UPDATE_FAILED"
});