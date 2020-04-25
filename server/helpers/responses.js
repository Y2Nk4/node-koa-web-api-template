export default {
    success (data) {
        this.body = {
            success: true,
            data
        }
    },

    error (message, code = 200) {
        return {
            success: false,
            error: message
        }
    }
}
