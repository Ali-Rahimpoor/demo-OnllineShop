import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { Bounce, ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      hideProgressBar
      autoClose={1000}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
      newestOnTop
    />
    </Provider>
  </StrictMode>,
)
