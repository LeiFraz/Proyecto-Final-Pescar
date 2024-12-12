import apiClient from './apiClient'

const servicesAxios = {

	login: async form => {
		try {
			/* form = {
				"email": "TestUsuario@gmail.com",
				"contrasenia": "TestUsuario1"
			} */
			const response = await apiClient.post(`/api/usuario/login`, form)
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}
	},
	register: async(form)=>{
		try {
			/* form = {
				"nombre": "TestUsuario",
				"apellido": "Test",
				"email": "TestUsuario@gmail.com",
				"contrasenia": "TestUsuario1",
				"direccion": "Avenida siempre viva",
				"telefono": 2222222222
			} */
			const response = await apiClient.post(`/api/usuario/registro`,form)
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}	
	},


	//ejemplos
	status: async() => {
		try {
			const response = await apiClient.get(`/api/plants/status`)
			return response.data
		} catch (error) {
			console.log(error,error.response.data.message)
		}
	},
	plants: async() => {
		try {
			const response = await apiClient.get(`/api/plants`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	createPlant: async form => {
		try {
			const response = await apiClient.post(`/api/plants/create`, form)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	deletePlant: async id => {
		try {
			const response = await apiClient.delete(`/api/plants/delete/${id}`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	editPlant: async planta => {
		try {
			const response = await apiClient.put(`/api/plants/edit`, planta)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	traerPaises: async() => {
		try {
			const response = await apiClient.get(`/api/paises`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},
	conditions: async() => {
		try {
			const response = await apiClient.get(`/api/conditions`)
			return response.data
		} catch (error) {
			console.log(error, error.response.data.message)
		}
	},


}

export default servicesAxios