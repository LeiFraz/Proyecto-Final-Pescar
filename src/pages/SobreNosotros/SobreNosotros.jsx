import React from "react";
import "./SobreNosotros.css";


const AboutPage = () => {
    return (
        <div>
            <section className="about">
                <h1 className="about-title">Sobre GROW</h1>
                <div className="about-img">
                    <img src="/img/fondoabout.jpg" alt="fondo about" />
                </div>
                <div className="about-info">
                    <p>
                        GROW es más que una plataforma: es un espacio pensado para apoyar a emprendedores, microemprendimientos y PYMES en su camino hacia el éxito. Nuestro objetivo es simplificar la gestión de tus productos y servicios, ayudarte a conectarte con tus clientes y ofrecerte herramientas que potencien tu negocio. Con funcionalidades como publicaciones interactivas y calculadora de precios, GROW está diseñado para facilitarte la vida y permitirte enfocarte en lo que realmente importa: el crecimiento de tu emprendimiento.
                    </p>
                </div>

                <section className="faq">
                    <h2>Preguntas Frecuentes</h2>

                    <div className="faq-item">
                        <div className="faq-question">
                            ¿Qué servicios ofrece GROW?
                            <span className="arrow">&#x25BC;</span>
                        </div>
                        <p className="faq-answer">
                            GROW te ayuda a gestionar y hacer crecer tu negocio. Ofrecemos herramientas para publicar productos y servicios, gestionar precios, realizar ventas online, y conectar con clientes de manera eficiente. Además, estamos implementando funciones avanzadas como un API de envíos y un API de pagos para simplificar aún más tus operaciones.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            ¿Cómo me ayuda GROW a mejorar mi emprendimiento?
                            <span className="arrow">&#x25BC;</span>
                        </div>
                        <p className="faq-answer">
                            Nuestra plataforma te brinda un espacio para exponer tus productos, calcular costos y manejar tus ventas de forma profesional. También encontrarás consejos exclusivos para emprendedores, desde marketing digital hasta manejo financiero, para ayudarte a tomar mejores decisiones.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            ¿GROW tiene costo?
                            <span className="arrow">&#x25BC;</span>
                        </div>
                        <p className="faq-answer">
                            ¡No! GROW es una plataforma gratuita para que los emprendedores puedan comenzar sin barreras. Sin embargo, algunas funcionalidades avanzadas, como las integraciones con APIs, pueden tener costos asociados en el futuro.
                        </p>
                    </div>
                </section>
            </section>

            <section className="pasos">
                <h1>Cómo funciona GROW</h1>
                <div className="pasos-cards">
                    <div className="card">
                        <div className="card-img">
                            <img src="/img/1paso.jpg" alt="1er paso" />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">1. Regístrate</h2>
                            <p className="card-desc">Crea tu cuenta en minutos y configura tu perfil de emprendedor.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-img">
                            <img src="/img/2paso.jpg" alt="2do paso" />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">2. Publica tus productos o servicios</h2>
                            <p className="card-desc">Sube tus ofertas con descripciones y precios claros para atraer a tus clientes ideales.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-img">
                            <img src="/img/3paso.jpg" alt="3er paso" />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">3. Conecta y crece</h2>
                            <p className="card-desc">Gestiona tus ventas, consulta estadísticas y utiliza nuestras herramientas para optimizar tu negocio.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-us">
                <div className="header">
                    <h1>¿Consultas? Contactanos</h1>
                    <h3>¡Escribenos y en breve nos pondremos en contacto!</h3>
                </div>
                <form action="#" method="POST">
                    <ul>
                        <li>
                            <label htmlFor="first_name">Nombre<span className="req">*</span></label>
                            <input type="text" id="first_name" name="first_name" placeholder="John" required />
                        </li>
                        <li>
                            <label htmlFor="last_name">Apellido<span className="req">*</span></label>
                            <input type="text" id="last_name" name="last_name" placeholder="Smith" required />
                        </li>
                        <li>
                            <label htmlFor="email">Email<span className="req">*</span></label>
                            <input type="email" id="email" name="email" placeholder="john.smith@gmail.com" required />
                        </li>
                        <li>
                            <label htmlFor="comments">Comentarios</label>
                            <textarea id="comments" name="comments" cols="46" rows="3"></textarea>
                        </li>
                        <li>
                            <button type="submit" className="btn btn-submit">Submit</button>
                        </li>
                    </ul>
                </form>
            </section>

            <script>
                {`
                document.querySelectorAll('.faq-item').forEach(item => {
                    const question = item.querySelector('.faq-question');
                    question.addEventListener('click', () => {
                        item.classList.toggle('open');
                    });
                });
                `}
            </script>
        </div>
    );
};

export default AboutPage;
