import React, { useEffect, useState } from 'react';
import styles from './Entrepreneurs.module.css';
import Select from 'react-select';
import axios from 'axios';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

function Entrepreneurs() {

    const options = [
        { value: "", label: <><i className="icon-th-list"></i> Ordenar por</> },
        { value: "A-Z", label: "A - Z" },
        { value: "Z-A", label: "Z - A" },
    ];
    const types = [
        { value: "", label: <><i className="icon-sliders"></i> Tipos</>},
        { value: "Productos", label: "Productos" },
        { value: "Servicios", label: "Servicios" },
    ];

    const [emprendimientos, setEmprendimientos] = useState([]);
    const [paginacion, setPaginacion] = useState({
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 30
    });
    const [filtros, setFiltros] = useState({
        tipo: '',
        nombre: '',
        ordenar: ''
    });

    const getPaginationGroup = () => {
        const { currentPage, totalPages } = paginacion;
        const maxDisplayPages = 5;
        
        // Si el total de páginas es menor o igual a maxDisplayPages, mostrar todas
        if (totalPages <= maxDisplayPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        // Calcular el inicio de la ventana de páginas
        let start = Math.max(1, Math.min(
            currentPage - Math.floor(maxDisplayPages / 2), 
            totalPages - maxDisplayPages + 1
        ));
        
        return Array.from({ length: maxDisplayPages }, (_, i) => start + i);
    };

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= paginacion.totalPages) {
            obtenerEmprendimientos(nuevaPagina);
        }
    };

    const manejarCambioFiltro = (e) => {
        const { name, value} = e.target;
    
        setFiltros(prevFiltros => {
            const nuevosFiltros = {
                ...prevFiltros,
                [name]: value,
            };
    
            return nuevosFiltros;
        });
    };
    const manejarCambioTipo = (opcionSeleccionada) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            tipo: opcionSeleccionada.value
        }));
    }
    const manejarCambioOrden = (opcionSeleccionada) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            ordenar: opcionSeleccionada.value
        }));
    };

    const obtenerEmprendimientos = async (pagina = 1) => {
        try {
            const response = await axios.get('https://grow-backend.up.railway.app/api/emprendimiento/filtros', {
                params: {
                    ...filtros,
                    page: pagina,
                    limit: paginacion.itemsPerPage
                },
            });
            setEmprendimientos(response.data.data);
            setPaginacion(response.data.pagination);
        } catch (error) {
            console.error('Error al obtener los emprendimientos:', error);
        }
    };
    useEffect(() => {

    }, []);

    useEffect(() => {
        obtenerEmprendimientos(1); // Reset a la primera página cuando cambian los filtros
    }, [filtros]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.filterProductsContainer}>
                <div className={styles.postsContainer}>
                    <div className={styles.browser}>
                        <input 
                            className={styles.browseName} 
                            type="text" 
                            placeholder='Buscar palabras clave...'
                            name="nombre"
                            value={filtros.nombre}
                            onChange={manejarCambioFiltro}
                        />
                        <Select 
                            className={styles.orderByZ}
                            options={types}
                            value={types.find(option => option.value === filtros.tipo) || types[0]}
                            onChange={manejarCambioTipo}
                            placeholder="Seleccionar"
                        />
                        <Select 
                            className={styles.orderBy}
                            options={options}
                            value={options.find(option => option.value === filtros.ordenar) || options[0]}
                            onChange={manejarCambioOrden}
                            placeholder="Seleccionar"
                        />
                    </div>

                    {emprendimientos && emprendimientos.length > 0 ? (
                        <div className={styles.emprendimientosContenedor}>
                            {emprendimientos.map((emp) => (
                                <ProfileCard
                                className={styles.cardIndex}
                                key={emp._id}
                                profileName={emp.nombre_emprendimiento}
                                description={emp.descripcion}
                                imageUrl={emp.foto_perfil}
                                id_emprendimiento={emp._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No se encontraron emprendimientos con estos filtros.</p>
                    )}

                    {/* Paginación mejorada */}
                    {paginacion.totalPages > 0 && (
                        <div className={styles.pagination}>
                            <button
                                className={styles.pageBtn}
                                onClick={() => cambiarPagina(1)}
                                disabled={paginacion.currentPage === 1}
                            >
                                {'<<'}
                            </button>
                            <button
                                className={styles.pageBtn}
                                onClick={() => cambiarPagina(paginacion.currentPage - 1)}
                                disabled={paginacion.currentPage === 1}
                            >
                                {'<'}
                            </button>
                            
                            {getPaginationGroup().map((item) => (
                                <button
                                    key={item}
                                    className={`${styles.pageBtn} ${
                                        paginacion.currentPage === item ? styles.active : ''
                                    }`}
                                    onClick={() => cambiarPagina(item)}
                                >
                                    {item}
                                </button>
                            ))}
                            
                            <button
                                className={styles.pageBtn}
                                onClick={() => cambiarPagina(paginacion.currentPage + 1)}
                                disabled={paginacion.currentPage === paginacion.totalPages}
                            >
                                {'>'}
                            </button>
                            <button
                                className={styles.pageBtn}
                                onClick={() => cambiarPagina(paginacion.totalPages)}
                                disabled={paginacion.currentPage === paginacion.totalPages}
                            >
                                {'>>'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Entrepreneurs;