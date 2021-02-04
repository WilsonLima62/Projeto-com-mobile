import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../image/iconw.png';

import '../styles/pages/sidebar.css'

export default function Sidebar() {
    const { goBack } = useHistory();
    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Icon" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
        
    )
}