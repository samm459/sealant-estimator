import { createRoot } from 'react-dom/client'
import { Estimator } from './components/estimator'
import '../styles.css'

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
