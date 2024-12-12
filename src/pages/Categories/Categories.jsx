import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import Select from 'react-select';
import axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

function Categories() {

    const options = [
        { value: "", label: <><i className="icon-th-list"></i> Ordenar por</> },
        { value: "A-Z", label: "A - Z" },
        { value: "Z-A", label: "Z - A" },
    ];

    const [categorias, setCategorias] = useState([]);
    const [paginacion, setPaginacion] = useState({
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 15
    });
    const [filtros, setFiltros] = useState({
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
            obtenerCategorias(nuevaPagina);
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
    const manejarCambioOrden = (opcionSeleccionada) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            ordenar: opcionSeleccionada.value
        }));
    };

    const obtenerCategorias = async (pagina = 1) => {
        try {
            const response = await axios.get('http://localhost:5000/api/categoria/filtros', {
                params: {
                    ...filtros,
                    page: pagina,
                    limit: paginacion.itemsPerPage
                },
            });
            setCategorias(response.data.data);
            setPaginacion(response.data.pagination);
        } catch (error) {
            console.error('Error al obtener las categorias:', error);
        }
    };
    useEffect(() => {

    }, []);

    useEffect(() => {
        obtenerCategorias(1); // Reset a la primera página cuando cambian los filtros
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
                            className={styles.orderBy}
                            options={options}
                            value={options.find(option => option.value === filtros.ordenar) || options[0]}
                            onChange={manejarCambioOrden}
                            placeholder="Seleccionar"
                        />
                    </div>

                    {categorias && categorias.length > 0 ? (
                        <div className={styles.categoriasContenedor}>
                            {categorias.map((cat) => (
                                <CategoryCard
                                key={cat._id}
                                categoryName={cat.nombre}
                                imageUrl={cat.imagen}
                                id={cat._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No se encontraron categorias con estos filtros.</p>
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

export default Categories;