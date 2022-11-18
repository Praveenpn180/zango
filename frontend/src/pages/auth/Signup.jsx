import React , { useEffect} from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister, reset } from '../../redux/slices/userSlice/userSlice';



export default function Signup() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isError, isSuccess, isLoading, message, user } = useSelector((state) => state.user)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/otp')
    }
    if (user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, navigate, dispatch])


  const onSubmit = async (data) => {
    const { firstName, lastName, email, phone, password } = data
    const userData = { firstName, lastName, email, phone, password }
    console.log(userData);
    dispatch(userRegister(userData))
    
  }
  if (isLoading) {
    console.log("loading");
  }
 

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Zango</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input type="text" placeholder='First Name' name='firstName'
            {...register('firstName', {
              pattern:{value:(/^[A-Za-z]+$/), message: 'Only characters are allowed'},
              required: 'Please enter firstname', minLength: {
                value: 3,
                message: 'Firstname must be 3 or more characters'
              }
            })}
          />
          {errors.firstName && <p className="errorMessage">{errors.firstName?.message}</p>}


          <input type="text" placeholder='Last Name' name='lastName' {...register('lastName', {
             pattern:{value:(/^[A-Za-z]+$/), message: 'Only characters are allowed'},
            required: 'Please enter lastname', minLength: {
              value: 1,
              message: 'Lastname must be 1 or more characters'
            }
          })} />
          {errors.lastName && <p className="errorMessage">{errors.lastName?.message}</p>}
          
          
          <input type="email" placeholder='Email' name='email'{...register('email', {
            required: 'Please enter email', pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })} />
          {errors.email && <p className="errorMessage">{errors.email?.message}</p>}


          <input type="number" placeholder='Phone' name='phone'{...register('phone',
            {
              required: 'Please enter phone number',
              minLength: { value: 10, message: 'Phone number must be 10 numbers' },
              maxLength: { value: 10, message: 'Phone number cannot exceed more than 10 numbers' }
            })} />
          {errors.phone && <p className="errorMessage">{errors.phone?.message}</p>}


          <input type="password" placeholder='New password' name='password' {...register('password',
            { required: 'Please enter password', minLength: { value: 8, message: 'Password must be 8 characters' } })} />
          {errors.password && <p className="errorMessage">{errors.password?.message}</p>}


          <input type="password" placeholder='Confirm password' name='p2'{...register('p2', {
            required: 'Please enter Confirm password', validate: (val) => {
              if (watch('password') !== val) {
                return 'Passwords are not match'
              }
            }
          })} />
          {errors.p2 && <p className="errorMessage">{errors.p2?.message}</p>}


          <button type='submit'>Sign up</button>

        </form>
        <p>Already have an account? <span><Link to={'/login'}>Login</Link></span></p>
      </div>
    </div>
  )
}

