import React from 'react';

const PageNav = ({pages, pageChangeHandler}) => (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => {
          return <li className="page-item" key={page}>
            <a className="page-link" onClick={() => {
              pageChangeHandler(page)
            }}>
              {page}
            </a>
        </li>})};
      </ul>
    </nav>
);

export default PageNav;
