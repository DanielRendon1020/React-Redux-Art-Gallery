import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { useEffect } from 'react';
import { fetchData, setArtId, reset, nextImg, prevImg } from './features/dataSlice'

const mapStateToProps = (state) => state.data

function App({artId}) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data?.apiData) {
      return <img style={{'width': '80vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  
  },[artId, dispatch])

  return (
    <div className="App">
      <div>
        <button onClick={() => {
          dispatch(fetchData())
        }}>Thunk!</button>
        <button onClick={() => {
          dispatch(reset())
        }}>Clear</button>
        <button onClick={() => {
          dispatch(nextImg())
        }}>Next</button>
        <button onClick={() => {
          dispatch(prevImg())
        }}>Back</button>
      </div>
      <input value={ data?.artId } onChange={(e) => {
        dispatch(setArtId(e.target.value))
      }} />
      <div>
        {data?.artId}
        {renderImg()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);