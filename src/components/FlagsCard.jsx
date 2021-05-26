import React from "react";
import Card from "./Card";
import Table from "./Table";

const flagsArr = [
  { name: "OF", value: 0 },
  { name: "DF", value: 0 },
  { name: "IF", value: 0 },
  { name: "TF", value: 0 },
  { name: "SF", value: 0 },
  { name: "ZF", value: 0 },
  { name: "AF", value: 0 },
  { name: "PF", value: 0 },
  { name: "CF", value: 0 },
];

const FlagsCard = ({ flags }) => {
  if (flags.length === 0) flags = flagsArr;

  return (
    <Card style={{ maxHeight: 150, minHeight: 150 }}>
      <h5 style={{ marginBottom: 15 }}>Flags</h5>
      <Table className="table table-dark">
        <thead>
          <tr>
            {flags.map((flag) => (
              <th style={{ textAlign: "center" }} key={flag.name}>
                {flag.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {flags.map((flag) => (
              <td style={{ textAlign: "center" }} key={flag.name}>
                {flag.value ? flag.value : "0"}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default FlagsCard;
