import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);
const pageContentLength: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const total: number = items.length;
  const pageFirstItem = perPage * currentPage - perPage + 1;
  const pageLastItem =
    perPage * currentPage <= total ? perPage * currentPage : total;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (
        {`items ${pageFirstItem} - ${pageLastItem} of ${total}`})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
          >
            {pageContentLength.map(item => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {items
          .filter(
            (item, index) =>
              index < perPage * currentPage &&
              index >= perPage * currentPage - perPage,
          )
          .map(item => {
            return (
              <li data-cy="item" key={item}>
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default App;
