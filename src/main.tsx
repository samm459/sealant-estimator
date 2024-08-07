import { createRoot } from 'react-dom/client'
import '../styles.css'
import { Estimator } from './estimator'

(function main() {
    const mountElementId = 'sealant-estimator-root'
    const mountElement = document.getElementById(mountElementId)

    if (!mountElement) {
        console.error(`Element with id ${mountElementId} not found`)
        return
    }

    createRoot(mountElement).render(
        <Estimator />
    )
})()
