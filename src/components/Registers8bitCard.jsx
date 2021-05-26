import React from "react";
import Card from "./Card";

const reg8BitArr = [
  [
    { name: "AH", value: 0 },
    { name: "AL", value: 0 },
  ],
  [
    { name: "BH", value: 0 },
    { name: "BL", value: 0 },
  ],
  [
    { name: "CH", value: 0 },
    { name: "CL", value: 0 },
  ],
  [
    { name: "DH", value: 0 },
    { name: "DL", value: 0 },
  ],
];

//convert decimal to binary 16 bit
const dec2bin = (dec) => {
  let binaryStr = (dec >>> 0).toString(2);

  while (binaryStr.length < 16) {
    binaryStr = "0" + binaryStr;
  }

  return binaryStr;
};

//convert decimal to binary 8 bit
const dec2bin8 = (dec) => {
  let binaryStr = (dec >>> 0).toString(2);

  while (binaryStr.length < 8) {
    binaryStr = "0" + binaryStr;
  }

  if(binaryStr.length >= 8){
    binaryStr = binaryStr.slice(binaryStr.length-8, binaryStr.length)
  }

  return binaryStr;
};

//convert decimal to hexadecimal
const dec2hex = (dec) => {
  return dec.toString(16);
};

//convert binary to decimal
const bin2dec = (bin) => {
  //return parseInt(bin, 2);
  let value = parseInt(bin, 2);
  if (value > 127) {
    value = value - 256;
  }
  return value;
};

const Registers8bitCard = React.memo(({ registers }) => {
  const [regs8bit, setRegs8bit] = React.useState([...reg8BitArr]);

  React.useEffect(() => {
    if (registers.length === 0) {
      setRegs8bit(JSON.parse(JSON.stringify(reg8BitArr)));
    } else {
      let registersCopy = JSON.parse(JSON.stringify(registers));
      registersCopy = registersCopy.slice(0, 4);

      registersCopy.forEach((r) => (r.value = dec2bin(r.value)));

      let nextRegs8bit = [...reg8BitArr];

      nextRegs8bit.forEach((r, index) => {
        r[0].value = bin2dec(registersCopy[index].value.slice(0, 8));
        r[1].value = bin2dec(registersCopy[index].value.slice(8, 16));
      });

      setRegs8bit(nextRegs8bit);
    }
  }, [registers]);

  const [format, setFormat] = React.useState(1);

  const handleChangeFormat = (event) => {
    setFormat(parseInt(event.target.value));
  };

  return (
    <Card style={{ minHeight: 240, maxHeight: 240 }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 style={{ marginBottom: 0 }}>8Bit Registers</h5>
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
          {/*<div className="col text-center">Binary</div>*/}
        </div>
        {regs8bit.map((reg, index) => (
          <div
            className="row mt-2"
            key={index}
            style={{
              borderBottom:
                index !== regs8bit.length - 1 ? "1px solid white" : "",
            }}
          >
            <div className="col text-center">{reg[0].name}</div>
            {format === 1 && (
              <div className="col text-center">{reg[0].value}</div>
            )}
            {format === 2 && (
              <div className="col text-center">{dec2bin8(reg[0].value)}</div>
            )}
            {format === 3 && (
              <div className="col text-center">{dec2hex(reg[0].value)}</div>
            )}

            <div className="col text-center">{reg[1].name}</div>
            {format === 1 && (
              <div className="col text-center">{reg[1].value}</div>
            )}
            {format === 2 && (
              <div className="col text-center">{dec2bin8(reg[1].value)}</div>
            )}
            {format === 3 && (
              <div className="col text-center">{dec2hex(reg[1].value)}</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
});

export default Registers8bitCard;
