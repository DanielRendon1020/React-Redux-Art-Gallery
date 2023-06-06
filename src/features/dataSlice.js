import { createSlice } from "@reduxjs/toolkit";

const getApiUrl = artId => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`

const initialState = {
    artId: 10205,
    apiData: {},

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        loadData: (state, {payload}) => {
            state.apiData = payload
        },
        nextImg: state => {
            state.artId++
        },
        prevImg: state => {
            state.artId--
        },
        setArtId: (state, {payload}) => {
            state.artId = payload
        },
        reset: () => initialState
    }
})

export const {loadData, nextImg, prevImg, setArtId, reset} = dataSlice.actions

export default dataSlice.reducer

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        const stateData = getState()
        const {artId} = stateData.data
        const response = await fetch(getApiUrl(artId))
        const json = await response.json()
        dispatch(loadData(json))
    }
    return dataThunk
}