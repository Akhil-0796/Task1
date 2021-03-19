import React, { useMemo,useState,useEffect } from "react";
import { useTable ,useGlobalFilter,usePagination} from "react-table";
import { getUserList } from "./api";
import { COLUMNS } from "./columns";
import { GlobalSearch } from "./GlobalSearch";
import './table.css';


export const PaginationTable = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
      getUserList().then((data) => {
        setUserList(data);
        console.log(data);
      });
    }, []);


  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => userList, []);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    setPageSize,    
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
  },useGlobalFilter,usePagination);

  const {globalFilter,pageIndex,pageSize}=state


  return (
      <>
      <GlobalSearch input={globalFilter} setInput= {setGlobalFilter} />
    <table {...getTableProps()}>
      <thead>
       <tr>
           <th>Id</th>
           <th>Email</th>
           <th>First Name</th>
           <th>Last Name</th>
       </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
                               
            <tr {...row.getRowProps()}>
             
              {row.cells.map((cell) => {
                
                  return <td
                {...cell.getCellProps()}>
                  {cell.render("Cell")}
                  </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
        <span>
             <select value={pageSize} onChange={(event)=> setPageSize(Number(event.target.value))}>
                 {
                     [2,3,4,6,8].map((pageSize)=>(
                         <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                     ))
                 }
             </select>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
        </span>

        <button onClick={()=>previousPage()} disabled={!canPreviousPage} >Previous</button>
        <button onClick={()=> nextPage()} disabled={!canNextPage}>Next</button>
    </div>
    </>
  );
};
