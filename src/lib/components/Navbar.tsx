import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link className='link' to="/">Quotes</Link></li>
          <li><Link className='link' to="/add">Add</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar