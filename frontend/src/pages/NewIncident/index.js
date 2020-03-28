import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()
    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            const response = await api.post('incident', data, {
                headers: {
                    Authorization: ongId
                }
            })

            alert('Cadastro realizado com sucesso')

            history.push('/profile')
        } catch(err) {
            alert('Erro ao cadastrar')
        }
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="backlink" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form action="" onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Título do Caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="textarea" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value)} />

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}