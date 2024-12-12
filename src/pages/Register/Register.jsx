import style from './styles.module.css'

const Register = () => {

    return (
        <div className={style.containerMayra}>
            <div className={style.formSection}>
                <h1>Regístrese con el correo electrónico</h1>
                <form>
                    <div className={style.row}>
                        <div className={style.formGroup}>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre"/>
                        </div>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="usuario">Direcion</label>
                        <input type="text" id="usuario" name="usuario"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="usuario">telefono</label>
                        <input type="text" id="usuario" name="usuario"/>
                    </div>
                    <div className={style.formGroup}>
                        <button type="submit">Crear cuenta</button>
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