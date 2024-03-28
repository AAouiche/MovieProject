
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from 'react-redux'
import store from './redux/Store.ts'
import { router } from './routing/Routes.tsx'
import { RouterProvider } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
