import user from '../models/user.js'
import userResource from '../resources/user'

const getUserInfo = async function (ctx) {
    const result = await user.getUserById(ctx.state.user.id) // JWT Authorization infos are stored in ctx.state.user
    ctx.success(userResource(result)) // Use response helper function and ResourceResponse to filter returning data
}

export default {
    getUserInfo
}
