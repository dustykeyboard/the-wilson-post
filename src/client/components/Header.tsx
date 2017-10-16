import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component<object, object> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="site-header">
        <div className="branding-container">
          <a href="/" className="branding" />
        </div>
        <nav className="site-nav">
          <ul>
            <li>
              <Link to="/">Articles</Link>
            </li>
            <li>
              <Link to="/schedule-post">Plannifier un article</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
