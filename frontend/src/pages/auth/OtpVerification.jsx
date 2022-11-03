import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, otp } from '../../redux/slices/userSlice/userSlice'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner/Spinner'

export default function OtpVerification() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (data) => {
    const { otpCode } = data
    console.log(otpCode);
    dispatch(otp(otpCode))
  }

  if (isLoading) {
    return (<><Spinner /></>)
  }
  return (
    <div className="formContainer">
    <div className="formWrapper">
        <span className="logo">Zango</span>
        <span className="title"></span>
    <form onSubmit={handleSubmit(onSubmit)}>
     
       <p>Enter the otp send to +91**********</p>
        <input type="text" placeholder='OTP' name='otpCode' {...register('otpCode', { required: 'Please enter otp' })} />
            {errors.otpCode && <p className="errorMessage">{errors.otpCode?.message}</p>}
    
        <button>Submit</button>

    </form>
    
    </div>
</div>
  )
}
