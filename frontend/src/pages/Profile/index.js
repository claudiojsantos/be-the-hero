import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(() => {
        api.get('incidents', {
            headers: {
                Authorization: {ongId}
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incidents.id !== id))
        } catch(err) {
            alert('Erro ao deletar')
        }
    }

    function handleLogout(){
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem-vinda {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            
            </ul>

        </div>
    )
}