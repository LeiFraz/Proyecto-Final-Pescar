import style from './styles.module.css'

const Login = () => {
    
    return (
        <div className={style.containerMayra}>
            <div className={style.loginBox}>
                <h1>iniciar sesión en Grow</h1>

                <button className={`${style.btn} ${style.google}`}>Registrese con Google</button>

                <div className={style.divider}>iniciar sesión con email</div>

                <form>
                    <input type="text" placeholder="nombre de usuario o correo electrónico" className={style.inputField}/>
                    <input type="password" placeholder="contraseña" className={style.inputField}/>

                    <div className={style.forgotPassword}>
                        <a href="#">¿La olvidó?</a>
                    </div>

                    <button type="submit" className={`${style.btn} ${style.login}`}>iniciar sesión</button>
                </form>

                <div className={style.register}>¿no tienes cuenta? <a href="/registro">regístrate</a></div>
            </div>
            <img src= "src\pages\Login\logo_slogan_verde (1).png" alt="icono de Grow" className={style.imagenLogin}/>
        </div>
    )
}

export default Login;