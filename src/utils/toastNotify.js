import { toast } from "react-toastify";

const notification = (type, message = '', error = {}, promiseFun) => {
    switch (type) {
        case 'success':
            return toast.success(message);
        case 'error':
            return toast.error(error.message || error.data.message || message);
        case 'info':
            return toast.info(message);
        case 'promise':
            return toast.promise(promiseFun, message)
        default:
            toast.info('unknown error')
    }
}


export default notification
