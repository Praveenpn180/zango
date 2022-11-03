import React , {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login , reset } from '../../redux/slices/userSlice/userSlice'
import Spinner from '../../components/Spinner/Spinner'
import './auth.scss'
 function Login() {


  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading,  message } = useSelector((state) => state.user)

  useEffect(() => {
    console.log(user, isError, isSuccess, isLoading,  message );
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, user, message, isSuccess,isLoading, navigate, dispatch])

  const onSubmit = (data) => {
    dispatch(login(data))
  }

  if (isLoading) {
    return (<><Spinner /></>)
  }




  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Zango</span>
            <span className="title">Register</span>
        <form onSubmit={handleSubmit(onSubmit)}>
         
            <input type="email" placeholder='Email' name='email'{...register('email', {
              required: 'Please enter email', pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} />
            {errors.email && <p className="errorMessage">{errors.email?.message}</p>}
            <input type="password" placeholder='Password' name='password'{...register('password', { required: 'Please enter password', minLength: { value: 5, message: 'Password must be 8 characters' } })} />
            {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
        
            <button>Login</button>

        </form>
        <p>Dont have an account? <span><Link to={'/signup'}>Signup</Link></span></p>
        </div>
    </div>
  )
}


export default Login