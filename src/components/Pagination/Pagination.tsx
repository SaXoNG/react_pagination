import cn from 'classnames';
import React from 'react';

import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPagesAmount = Math.ceil(total / perPage);
  const pagesAmount: number[] = getNumbers(1, maxPagesAmount);

  return (
    <ul className="pagination">
      <li
        onClick={() =>
          currentPage > 1 ? onPageChange(currentPage - 1) : onPageChange(1)
        }
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {pagesAmount.map(page => {
        return (
          <li
            onClick={() => onPageChange(page)}
            className={cn('page-item', {
              active: currentPage === page,
            })}
            key={page}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        );
      })}
      <li
        onClick={() =>
          currentPage < total / perPage
            ? onPageChange(currentPage + 1)
            : onPageChange(currentPage)
        }
        className={cn('page-item', {
          disabled: currentPage === maxPagesAmount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
