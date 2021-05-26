import React from "react";
import Card from "./Card";

const regArr = [
  { name: "EAX", value: 0 },
  { name: "EBX", value: 0 },
  { name: "ECX", value: 0 },
  { name: "EDX", value: 0 },
  { name: "EBP", value: 0 },
  { name: "ESP", value: 0 },
  { name: "ESI", value: 0 },
  { name: "EDI", value: 0 },
];

//convert decimal to binary
const dec2bin = (dec) => {
  let binaryStr = (dec >>> 0).toString(2);

  while (binaryStr.length < 16) {
    binaryStr = "0" + binaryStr;
  }

  return binaryStr;
};

//convert decimal to hexadecimal
const dec2hex = (dec) => {
  return dec.toString(16);
};

const RegistersCard = React.memo(({ registers }) => {
  if (registers.length === 0) registers = regArr;
  const [format, setFormat] = React.useState(1);
  const [regs, setRegs] = React.useState([...regArr]);

  React.useEffect(() => {
    if (registers.length === 0) setRegs([...regArr]);
    else setRegs([...registers]);
  }, [registers])

  const handleChangeFormat = (event) => {
    setFormat(parseInt(event.target.value));
  };


  return (
    <Card style={{ minHeight: 365, maxHeight: 365 }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 style={{marginBottom:0}}>Registers</h5>
        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: 10, fontSize: 18 }}>Value: </span>
          <select
            className="form-select h-50"
            aria-label="Default select example"
            value={format}
            onChange={(event) => handleChangeFormat(event)}
          >
            <option value="1">Decimal</option>
            <option value="2">Binary</option>
            <option value="3">Hexadecimal</option>
          </select>
        </div>
      </div>

      <div className="container mt-1">
        <div className="row mt-2 " style={{ borderBottom: "1px solid white" }}>
          <div className="col text-center">Name</div>
          <div className="col text-center">Value</div>
        </div>
        {regs.map((reg, index) => (
          <div
            className="row mt-2"
            key={reg.name}
            style={{
              borderBottom:
                index !== registers.length - 1 ? "1px solid white" : "",
            }}
          >
            <div className="col text-center">{reg.name}</div>
            {format === 1 && <div className="col text-center">{reg.value}</div>}
            {format === 2 && (
              <div className="col text-center">{dec2bin(reg.value)}</div>
            )}
            {format === 3 && (
              <div className="col text-center">{dec2hex(reg.value)}</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
});

export default RegistersCard;
