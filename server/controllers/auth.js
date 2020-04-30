import user from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import formatValidationError from '../helpers/formatValidationError'

const userLogin = async function (ctx) {
    ctx.checkBody('username').notEmpty('用户名不能为空')
    ctx.checkBody('password').notEmpty('密码不能为空')
    if (ctx.errors) {
        ctx.body = {
            success: false,
            error: formatValidationError(ctx.errors)
        }
        return
    }

    const data = ctx.request.body // post过来的数据存在request.body里
    const userInfo = await user.getUserByName(data.username)
    if (userInfo != null) { // 如果查无此用户会返回null
        if (!bcrypt.compareSync(data.password, userInfo.password)) {
            ctx.body = {
                success: false, // success标志位是方便前端判断返回是正确与否
                error: '用户名或密码错误'
            }
        } else {
            const userToken = {
                name: userInfo.username,
                id: userInfo.id
            }
            const token = jwt.sign(userToken, process.env.JWT_SECRET) // 签发token
            ctx.body = {
                success: true,
                token: token // 返回token
            }
        }
    } else {
        ctx.body = {
            success: false,
            error: '用户名或密码错误' // 如果用户不存在返回用户不存在
        }
    }
}

export default {
    userLogin
}
