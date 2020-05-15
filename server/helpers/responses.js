export default {
    success (data) {
        this.body = {
            success: true,
            data
        }
    },

    error (message, statusCode = 200) {
        this.status = statusCode
        this.body = {
            success: false,
            error: message
        }
    }
}
