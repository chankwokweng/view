export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    // console.log("authMiddleWare - AuthToken=", authToken.slice(0,25));
    if (authToken === null) {
        console.log("authMiddleWare - authToken is null");
        history.push('/login')
    };
}