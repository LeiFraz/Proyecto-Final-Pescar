import { useState } from 'react'
import style from './styles.module.css'
import servicesAxios from '../../services/axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    //estado para guardar los datos del formulario
    const [form, setForm] = useState({email: '', contrasenia: ''})

    //uso de expresiones regulares para validar
    const emailER = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    const contraseniaER = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //Para aplicar la navegacion
    const navigate = useNavigate()
    const paginaInicio = () => navigate('/')

    //obtener los datos ingresados y setearlo en el estado form
    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}))
        console.log(form.email)
        console.log(form.contrasenia)
    }

    //funcion para realizar el login en la aplicacion
    const login = async(e) => {
        try {
            e.preventDefault()
            //uso de las expresiones regulares para validar
            const isValidEmail = emailER.test(form.email)
            const isValidContrasenia = contraseniaER.test(form.contrasenia)

            console.log(isValidEmail)
            console.log(isValidContrasenia)
            if (isValidContrasenia && isValidEmail) {
                // const response = await servicesAxios.login({email: form.email, contrasenia: form.contrasenia})
                const response = await servicesAxios.login(form)
                
                if (response) {
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('userId', response.data._id)
                    localStorage.setItem('userName', response.data.nombre + ' ' +response.data.apellido)
                    localStorage.setItem('tipoPerfil', response.data.rol)
                    localStorage.setItem('entrepreneurId', response.id_emprendimiento)
                    localStorage.setItem('entrepreneurName', response.nombre_emprendimiento)
                    console.log('Inicio de sesion exitoso')

                    paginaInicio()
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.containerMayra}>
            <div className={style.loginBox}>
                <h1>iniciar sesión en Grow</h1>

                <button className={`${style.btn} ${style.google}`}>Registrese con Google</button>

                <div className={style.divider}>iniciar sesión con email</div>

                <form>
                    <input type="text" onChange={handleForm} name='email'  placeholder="correo electronico" className={style.inputField}/>
                    <input type="password" onChange={handleForm} name='contrasenia'  placeholder="contraseña" className={style.inputField}/>

                    <div className={style.forgotPassword}>
                        <a href="#">¿La olvidó?</a>
                    </div>

                    <button type="submit" className={`${style.btn} ${style.login}`} onClick={login}>iniciar sesión</button>
                </form>

                <div className={style.register}>¿no tienes cuenta? <a href="/registro">regístrate</a></div>
            </div>
            <img src= "src\pages\Login\logo_slogan_verde (1).png" alt="icono de Grow" className={style.imagenLogin}/>
        </div>
    )
}

export default Login;