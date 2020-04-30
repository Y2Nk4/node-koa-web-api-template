import ResourceResponse from './ResourceResponse'

export default ResourceResponse(function (user) {
    return {
        id: user.id,
        username: user.username,
        balance: user.balance,
        email: user.email
    }
})
