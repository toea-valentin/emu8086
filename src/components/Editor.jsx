import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-assembly_x86";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";

const Editor = ({ handleCodeTextChange }) => {
  const onChange = (newValue) => {
    handleCodeTextChange(newValue);
  };

  return (
    <div style={{ height: "100%", width: '100%', marginRight: 25 }}>
      <AceEditor
        mode="assembly_x86"
        theme="tomorrow_night_eighties"
        onChange={onChange}
        name="Ace_Editor"
        fontSize={18}
        editorProps={{ $blockScrolling: true }}
        height="100%"
        width="100%"
        style={{
          border: "1px solid black",
          borderRadius: 5,
          boxShadow: "0px 2px 15px rgb(0 0 0 / 50%)",
        }}
      />
    </div>
  );
};

export default Editor;
