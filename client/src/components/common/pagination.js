import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagination({
  contentPerPage,
  contentCount,
  changePageHandler,
}) {
  const [pageCount, setPageCount] = useState(
    Math.ceil(contentCount / contentPerPage)
  );

  const [paginationContent, setPaginationContent] = useState();

  useEffect(() => {
    let prevContent = [];
    for (let i = 1; i <= pageCount; i++) {
      prevContent.push(
        <li class="page-item">
          <Link
            class="page-link"
            to="#"
            onClick={() => changePageHandler(i)}>
            {i}
          </Link>
        </li>
      );
    }
    setPaginationContent(prevContent);
  }, []);

  if (pageCount > 1) {
    return (
      <nav className="Page Navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {paginationContent}
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
