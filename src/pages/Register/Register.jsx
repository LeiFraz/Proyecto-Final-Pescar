import { useState } from 'react'
import style from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import servicesAxios from '../../services/axios'

const Register = () => {
    //estado para guardar los datos del formulario
    const [form, setForm] = useState({email: '', contrasenia: '', nombre: '', apellido: '', direccion: '', telefono: ''})

    //uso de expresiones regulares para validar
    const emailER = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    const contraseniaER = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //Para aplicar la navegacion
    const navigate = useNavigate()
    const paginaLogin = () => navigate('/login')

    //obtener los datos ingresados y setearlo en el estado form
    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}))
    }

    //funcion para realizar el login en la aplicacion
    const register = async(e) => {
        try {
            e.preventDefault()
            //uso de las expresiones regulares para validar
            const isValidEmail = emailER.test(form.email)
            const isValidContrasenia = contraseniaER.test(form.contrasenia)

            console.log(isValidEmail)
            console.log(isValidContrasenia)
            if (isValidContrasenia && isValidEmail) {
                // const response = await servicesAxios.login({email: form.email, contrasenia: form.contrasenia})
                const response = await servicesAxios.register(form)
                
                if (response) {
                    // localStorage.setItem('token', response.token)
                    // localStorage.setItem('userId', response.data._id)
                    // localStorage.setItem('tipoPerfil', response.data.rol)

                    console.log('Registro exitoso')

                    paginaLogin()
                }else{
                    console.log(response)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.containerMayra}>
            <div className={style.formSection}>
                <h1>Regístrese con el correo electrónico</h1>
                <form>
                    <div className={style.row}>
                        <div className={style.formGroup}>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" onChange={handleForm} name="nombre"/>
                        </div>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" onChange={handleForm} name="apellido"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" onChange={handleForm} name='email'/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="contrasenia">Contraseña</label>
                        <input type="password" id="contrasenia" onChange={handleForm} name="contrasenia"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="direccion">Direccion</label>
                        <input type="text" id="direccion" onChange={handleForm} name="direccion"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="telefono">telefono</label>
                        <input type="number" id="telefono" onChange={handleForm} name="telefono"/>
                    </div>
                    <div className={style.formGroup}>
                        <button type="submit" onClick={register}>Crear cuenta</button>
                    </div>
                </form>
            </div>
            <div className={style.sideSection}>
                <div className={style.icon}>
                    <img src="src\pages\Register\logo_slogan_verde (1).png" alt="Icono"/>
                </div>
            </div>
        </div>
    )
}

export default Register;