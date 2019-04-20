import React from "react";

import { Table, Button } from "react-bootstrap";

const List = ({ headers, items = [], remove, empty }) => {
  let headerLength = headers.length + (remove ? 1 : 0);
  return (
    <Table striped hover>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h.key}>{h.title}</th>
          ))}
          {remove && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {!items.length && (
          <tr>
            <td colSpan={headerLength}>{empty}</td>
          </tr>
        )}
        {items.map((item, idx) => (
          <tr key={idx}>
            {headers.map(h => (
              <td key={h.key}>
                {h.format ? h.format(item[h.key]) : item[h.key]}
              </td>
            ))}
            {remove && (
              <td>
                <Button type="button" onClick={() => remove(item)} size="sm">
                  Remover
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;
