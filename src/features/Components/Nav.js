import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='Nav'>
            {/* <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='search'>Search Posts</label>
                <input
                    id='search'
                    type='text'
                    placeholder='Search Posts'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

            </form> */}
            <ul className='Nav'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Add Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav