const getErrorMessage = (error) => {
    if (error && error.details && Array.isArray(error.details) && error.details.length > 0) {
        return error.details[0].message;
    }
    return 'Unknown error';
};



export default getErrorMessage