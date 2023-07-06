/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup'

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập Email')
    .email('Email không hợp lệ')
    .min(5, 'Độ dài Email từ 5 - 60 kí tự')
    .max(60, 'Độ dài Email từ 5 - 60 kí tự'),
  password: yup
    .string()
    .required('Vui lòng nhập Password')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(60, 'Mật khẩu không quá 60 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại Password')
    .min(8, 'Mật khẩu nhập lại ít nhất 8 ký tự')
    .max(60, 'Mật khẩu nhập lại không quá 60 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})

export type RegisterSchemaType = yup.InferType<typeof RegisterSchema>

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập Email')
    .email('Email không hợp lệ')
    .min(5, 'Độ dài Email từ 5 - 60 kí tự')
    .max(60, 'Độ dài Email từ 5 - 60 kí tự'),
  password: yup
    .string()
    .required('Vui lòng nhập Password')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(60, 'Mật khẩu không quá 60 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại Password')
    .min(8, 'Mật khẩu nhập lại ít nhất 8 ký tự')
    .max(60, 'Mật khẩu nhập lại không quá 60 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})

export type LoginSchemaType = yup.InferType<typeof LoginSchema>
