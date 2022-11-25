import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }

    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS'
    })

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {       
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`http://api.github.com/search/users?${params}`,{
            headers: {
                
            }
        })
       const {items} = await response.json()

      dispatch({
        type: 'GET_USERS',
        payload: items
      })
    }

    const getUserRepos = async (login) => {       
        setLoading()

        const response = await fetch(`http://api.github.com/search/users/${login}/repos`,{
            headers: {
                
            }
        })
       const data = await response.json()

      dispatch({
        type: 'GET_REPOS',
        payload: data
      })
    }

    const getUser = async (login) => {       
        setLoading()

        const response = await fetch(`http://api.github.com/users/${login}`,{
            headers: {
                  
            }
        })
        if(response.status === 404){
            window.location = '/notfound'
        } else {
            const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data
      })
    }      
}

return <GithubContext.Provider value={{
    users: state.users, 
    loading: state.loading,
    searchUsers,
    clearUsers,
    user: state.user,
    getUser,
    repos: state.repos,
    getUserRepos
}}>
    {children}
</GithubContext.Provider>

}

export default GithubContext

