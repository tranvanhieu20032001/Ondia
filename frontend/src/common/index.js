const backendDomin = "http://localhost:5000"

const SummaryApi = {
    register: {
        url: `${backendDomin}/api/v1/auth/register`,
        method: "POST"
    },
    login: {
        url: `${backendDomin}/api/v1/auth/login`,
        method: "POST"
    },
    logout: {
        url: `${backendDomin}/api/v1/auth/logout`,
        method: "GET"
    },
    showme: {
        url: `${backendDomin}/api/v1/users/showMe`,
        method: "GET"
    },

    getAllCategories: {
        url: `${backendDomin}/api/v1/categories`,
        method: "GET"
    },

    getAllProducts:{
        url: `${backendDomin}/api/v1/products`,
        method: "GET"
    },

    getProductById:{
         url: `${backendDomin}/api/v1/products/:id`,
        method: "GET"
    },

    getAllUser: {
        url: `${backendDomin}/api/v1/users`,
        method: "GET"
    },

    updateUser:{
         url: `${backendDomin}/api/v1/user/updateUser/`,
        method: "PATCH"
    },
}


export default SummaryApi