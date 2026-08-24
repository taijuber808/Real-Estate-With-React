    import jwt from 'jsonwebtoken'

    export const isLoggedIn = async(req, res, next) => {
        const token = req.headers.token;
        try {
            if(!token){
            return res.json({
                    status:false,
                    message:"Token is Required"
                })
            }
            const verifyToken =  jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = verifyToken
            next()
        } catch (error) {
        return res.json({
                status:false,
                message:`Error in middleWare ${error.message}`
            })
        }
    }