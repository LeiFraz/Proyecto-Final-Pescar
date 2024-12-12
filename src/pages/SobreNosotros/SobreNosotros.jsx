import React from "react";
import styles from "./SobreNosotros.module.css";
import { useState } from "react";

const AboutPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
    {
        question: '¿Qué servicios ofrece GROW?',
        answer:
        'GROW te ayuda a gestionar y hacer crecer tu negocio. Ofrecemos herramientas para publicar productos y servicios, gestionar precios, realizar ventas online, y conectar con clientes de manera eficiente. Además, estamos implementando funciones avanzadas como un API de envíos y un API de pagos para simplificar aún más tus operaciones.',
    },
    {
        question: '¿Cómo me ayuda GROW a mejorar mi emprendimiento?',
        answer:
        'Nuestra plataforma te brinda un espacio para exponer tus productos, calcular costos y manejar tus ventas de forma profesional. También encontrarás consejos exclusivos para emprendedores, desde marketing digital hasta manejo financiero, para ayudarte a tomar mejores decisiones.',
    },
    {
        question: '¿GROW tiene costo?',
        answer:
        '¡No! GROW es una plataforma gratuita para que los emprendedores puedan comenzar sin barreras. Sin embargo, algunas funcionalidades avanzadas, como las integraciones con APIs, pueden tener costos asociados en el futuro.',
    },
    ];
    return (
        <>
        <div className={styles['about-img']}>
            
        </div>
        <div className={styles['about-container']}>
            <section className={styles.about}>
                <h1 className={styles['about-title']}>Sobre GROW</h1>
                
                <div className={styles['about-info']}>
                    <p>
                        GROW es más que una plataforma: es un espacio pensado para apoyar a emprendedores, microemprendimientos y PYMES en su camino hacia el éxito. Nuestro objetivo es simplificar la gestión de tus productos y servicios, ayudarte a conectarte con tus clientes y ofrecerte herramientas que potencien tu negocio. Con funcionalidades como publicaciones interactivas y calculadora de precios, GROW está diseñado para facilitarte la vida y permitirte enfocarte en lo que realmente importa: el crecimiento de tu emprendimiento.
                    </p>
                </div>

                <section className={styles.faq}>
                    <h2>Preguntas Frecuentes</h2>
                    {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles['faq-item']} ${
                        openIndex === index ? styles.open : ''
                        }`}
                    >
                        <div
                        className={styles['faq-question']}
                        onClick={() => toggleItem(index)}
                        >
                        {item.question}
                        <span className={styles.arrow}>
                            {openIndex === index ? '▲' : '▼'}
                        </span>
                        </div>
                        {openIndex === index && (
                        <p className={styles['faq-answer']}>{item.answer}</p>
                        )}
                    </div>
                    ))}
                </section>
            </section>

            <section className={styles.pasos}>
                <h1>Cómo funciona GROW</h1>
                <div className={styles['pasos-cards']}>
                    <div className={styles['card']}>
                        <div className={styles['card-img']}>
                            <img src="src\pages\SobreNosotros\img\1paso.jpg" alt="1er paso" />
                        </div>
                        <div className={styles['card-info']}>
                            <h2 className={styles['card-name']}>1. Regístrate</h2>
                            <p className={styles['card-desc']}>Crea tu cuenta en minutos y configura tu perfil de emprendedor.</p>
                        </div>
                    </div>

                    <div className={styles['card']}>
                        <div className={styles['card-img']}>
                            <img src="src\pages\SobreNosotros\img\2paso.jpg" alt="2do paso" />
                        </div>
                        <div className={styles['card-info']}>
                            <h2 className={styles['card-name']}>2. Publica tus productos o servicios</h2>
                            <p className={styles['card-desc']}>Sube tus ofertas con descripciones y precios claros para atraer a tus clientes ideales.</p>
                        </div>
                    </div>

                    <div className={styles['card']}>
                        <div className={styles['card-img']}>
                            <img src="src\pages\SobreNosotros\img\3paso.jpg" alt="3er paso" />
                        </div>
                        <div className={styles['card-info']}>
                            <h2 className={styles['card-name']}>3. Conecta y crece</h2>
                            <p className={styles['card-desc']}>Gestiona tus ventas, consulta estadísticas y utiliza nuestras herramientas para optimizar tu negocio.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles['contact-us']}>
                <div className={styles.header}>
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
                            <button type="submit" className={styles['btn-submit']}>Enviar correo</button>
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
        </>
    );
};

export default AboutPage;
