const Joi = require('joi');

const validate = (schema) => {
    try {
        return (req, res, next) => {
            const { error, value } = schema.validate(req.body, { abortEarly: false } )

            if (error) {
                return res.status(403).json({
                    msg : "validaton errror",
                    error: error
                })
            }
            req.body = value
            next()
        }
    } catch (error) {
        return res.status(500).json({
            msg : "validaton faild",
            error: error
        })
    }
}

module.exports = validate