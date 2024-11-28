import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardPublications from '../../components/CardPublications/CardPublications';
import styles from './Publications.module.css';
import Select from 'react-select';
import axios from 'axios';

const obtenerCategorias = async (setCategorias) => {
    try {
        const response = await axios.get('http://localhost:5000/api/categoria');
        const categoriasData = response.data.map(categoria => ({
            id: categoria._id,
            nombre: categoria.nombre
        }));
        setCategorias(categoriasData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

function Publications() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tipo = params.get('tipo');  // Obtiene el valor del parámetro "tipo"
    const descuento=params.get('descuento');
    const orden=params.get('orden');
    const categoria=params.get('categoria');
    const options = [
        { value: "", label: <><i className="icon-th-list"></i> Ordenar por</> },
        { value: "A-Z", label: "A - Z" },
        { value: "Z-A", label: "Z - A" },
        { value: "Baratos", label: "Más baratos primero" },
        { value: "Caros", label: "Más caros primero" },
        { value: "MasDescuento", label: "Mayor descuento" },
        { value: "Convenir", label: "A convenir primero" },
    ];

    const [categorias, setCategorias] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const [paginacion, setPaginacion] = useState({
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 15
    });
    const [filtros, setFiltros] = useState({
        tipo: '',
        categoria: '',
        rangoPrecio: '',
        descuento: '',
        nombre: '',
        ordenar: ''
    });
    const [values, setValues] = useState({
        min: "",
        max: "",
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
            obtenerPublicaciones(nuevaPagina);
        }
    };

    const manejarCambioFiltro = (e) => {
        const { name, value, type, checked } = e.target || { name: 'categoria', value: e?.value };
    
        setFiltros(prevFiltros => {
            const nuevosFiltros = {
                ...prevFiltros,
                [name]: value,
            };
    
            // Limpiar inputs personalizados al seleccionar un rango predefinido
            if (name === 'rangoPrecio') {
                setValues({ min: "", max: "" });
            }
    
            // Eliminar filtro si el checkbox se desmarca
            if (type === "checkbox" && !checked) {
                delete nuevosFiltros[name];
            }
    
            return nuevosFiltros;
        });
    };

    const manejarCambioOrden = (opcionSeleccionada) => {
            setFiltros(prevFiltros => ({
                ...prevFiltros,
                ordenar: opcionSeleccionada.value
            }));
        
    };


    const limpiarFiltros = (e) => {
        e.preventDefault();
        setFiltros({
            tipo: '',
            categoria: '',
            rangoPrecio: '',
            descuento: '',
            nombre: '',
            ordenar: ''
        });
    };

    const obtenerPublicaciones = async (pagina = 1) => {
        try {
            const response = await axios.get('http://localhost:5000/api/publicacion/filtros', {
                params: {
                    ...filtros,
                    page: pagina,
                    limit: paginacion.itemsPerPage
                },
            });
            setPublicaciones(response.data.data);
            setPaginacion(response.data.pagination);
        } catch (error) {
            console.error('Error al obtener las publicaciones:', error);
        }
    };
    const manejarRango = () => {
        const { min, max } = values;
        
        // Limpiar checkboxes predefinidos
        setFiltros(prevFiltros => {
            const nuevosFiltros = { ...prevFiltros };
            delete nuevosFiltros.rangoPrecio;
            
            // Agregar rango personalizado si hay valores
            if (min && max) {
                nuevosFiltros.rangoPrecio = `${min}-${max}`;
            }
            
            return nuevosFiltros;
        });
        
        // Opcional: Limpiar inputs después de buscar
        setValues({ min: "", max: "" });
    };
    const comprobarNegativo = (e) => {
        const { name, value } = e.target;
    
        // Valida que el valor no sea negativo
        if (value === "" || (Number(value) >= 1 && !isNaN(value))) {
            setValues((prevValues) => ({
            ...prevValues,
            [name]: value, // Actualiza solo el input correspondiente
            }));
        }
    };

    useEffect(() => {
        obtenerCategorias(setCategorias);
        
        if(tipo){
            filtros.tipo=tipo
        }
        if(descuento && orden){
            filtros.descuento=descuento
            filtros.ordenar=orden
        }
        if(categoria){
            filtros.categoria=categoria
        }
    }, []);

    useEffect(() => {
        obtenerPublicaciones(1); // Reset a la primera página cuando cambian los filtros
    }, [filtros]);
    const categoriasOptions = [
        { value: "", label: "Todas" },
        ...categorias.map(categoria => ({
            value: categoria.id,
            label: categoria.nombre,
        }))
    ];
    return (
        <div className={styles.mainContainer}>
            <div className={styles.filterProductsContainer}>
                <div className={styles.filterContainer}>
                    <div className={styles.filters}>
                        <div className={`${styles.mainTitle} ${styles.filter}`}>
                            <h1 className="title"><i className="icon-sliders"></i>Filtros</h1>
                            <a href="" onClick={limpiarFiltros}><i className="icon-cancel"></i> Borrar Filtros</a>
                        </div>
                        
                        <div className={`${styles.typePost} ${styles.filter}`}>
                            <h2 className={styles.subtitle}>Tipo</h2>
                            <select 
                                name="tipo" 
                                onChange={manejarCambioFiltro}
                                value={filtros.tipo}
                            >
                                <option value="">Todo</option>
                                <option value="producto">Productos</option>
                                <option value="servicio">Servicios</option>
                            </select>
                        </div>

                        <div className={`${styles.categories} ${styles.filter}`}>
                            <h2 className={styles.subtitle}>Categorias</h2>
                            <Select
                                options={categoriasOptions}
                                name="categoria"
                                value={categoriasOptions.find(option => option.value === filtros.categoria)}
                                onChange={(selectedOption) =>
                                    manejarCambioFiltro({ target: { name: "categoria", value: selectedOption?.value } })
                                }
                                placeholder="Todas"
                                isClearable
                            />
                        </div>

                        <div className={`${styles.price} ${styles.filter}`}>
                            <h2 className={styles.subtitle}>Precio</h2>
                            <div className={styles.checkboxContainer}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="rangoPrecio"
                                        value="200-300"
                                        checked={filtros.rangoPrecio === "200-300"}
                                        onChange={manejarCambioFiltro}
                                    />
                                    $200 - $300
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="rangoPrecio"
                                        value="1000-2000"
                                        checked={filtros.rangoPrecio === "1000-2000"}
                                        onChange={manejarCambioFiltro}
                                    />
                                    $1000 - $2000
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="rangoPrecio"
                                        value="5000-10000"
                                        checked={filtros.rangoPrecio === "5000-10000"}
                                        onChange={manejarCambioFiltro}
                                    />
                                    $5000 - $10000
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="rangoPrecio"
                                        value="0-0"
                                        checked={filtros.rangoPrecio === "0-0"}
                                        onChange={manejarCambioFiltro}
                                    />
                                    $ A convenir
                                </label>
                                
                                <div className={styles.rangoPrecioInput}>
                                    <input type="number" placeholder="Desde" name='min' value={values.min} onChange={comprobarNegativo}/> <h3>-</h3> <input type="number" placeholder="Hasta" name='max' value={values.max} onChange={comprobarNegativo}/>
                                </div>
                                <button className={styles.buscarRangoPrecio} onClick={manejarRango}>Buscar</button>
                            </div>
                        </div>

                        <div className={`${styles.offers} ${styles.filter}`}>
                            <h2 className={styles.subtitle}>Ofertas</h2>
                            <select 
                                name="descuento" 
                                onChange={manejarCambioFiltro}
                                value={filtros.descuento}
                            >
                                <option value="">Ninguna</option>
                                <option value="5">Desde 5% OFF</option>
                                <option value="10">Desde 10% OFF</option>
                                <option value="20">Desde 20% OFF</option>
                                <option value="30">Desde 30% OFF</option>
                                <option value="40">Desde 40% OFF</option>
                                <option value="50">Desde 50% OFF</option>
                                <option value="60">Desde 60% OFF</option>
                                <option value="70">Desde 70% OFF</option>
                                <option value="80">Desde 80% OFF</option>
                                <option value="90">Desde 90% OFF</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.postsContainer}>
                    <div className={styles.browser}>
                        <input 
                            className={styles.browseName} 
                            type="text" 
                            placeholder='Buscar por nombre...'
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

                    {publicaciones && publicaciones.length > 0 ? (
                        <div className={styles.publicacionesLista}>
                            {publicaciones.map((pub) => (
                                <CardPublications
                                    key={pub._id}
                                    nombre={pub.nombre}
                                    precio={pub.precio}
                                    descuento={pub.descuento}
                                    imagen={pub.imagenes[0]}
                                    id_emprendimiento={pub.id_emprendimiento}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No se encontraron publicaciones con estos filtros.</p>
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

export default Publications;