import * as yup from 'yup'

const schema = yup.object().shape({
    username:
        yup.string().trim()
            .required("A username is required"),
    password:
        yup.string()
            .required("A password is required")
})

export default schema
