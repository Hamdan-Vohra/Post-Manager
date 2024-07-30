import './App.css';
import {Routes,Route}from 'react-router-dom'
import Post from './features/Posts/Post'
import AddPostForm from './features/Posts/AddPostForm';
import About from './features/Components/About';
import Header from './features/Components/Header';
import Footer from './features/Components/Footer';
import Nav from './features/Components/Nav';
function App() {
  return (
    <div className="App">
      <Header title={'Post Manager'}/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Post/>}/>
        <Route path='/post' element={<AddPostForm/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
