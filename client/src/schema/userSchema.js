import * as Yup from 'yup';

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(30)
    .required("Please enter your firstName"),
  lastName: Yup.string().min(2).max(30).required("Please enter your lastName"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter password"),
});