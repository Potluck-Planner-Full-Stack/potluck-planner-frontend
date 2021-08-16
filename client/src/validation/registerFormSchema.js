import * as yup from 'yup'

const schema = yup.object().shape({
    username:
        yup.string().trim()
            .required("A username is required")
            .min(8, "must be at least 8 chars"),
    password:
        yup.string()
            .required("A password is required")
            .min(8, "must be at least 8 chars"),
})

export default schema
