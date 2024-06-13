import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import '../Styles/UserTable.css'; // Import CSS file for styling

const UserTable = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mypurecloud.com/api/v2/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.entities);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [token]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={`header-${headerGroup.id}`}>
              {headerGroup.headers.map(column => (
                <th key={`header-${column.id}`}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr key={`row-${row.id}`}>
                {row.cells.map(cell => (
                  <td key={`cell-${cell.column.id}`}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;