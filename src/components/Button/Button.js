import React, { useRef } from "react";

const Button = (props) => {
  const { type, style, onClick, children } = props;

  // useImperativeHandle(ref, () => {
  //   return {
  //     activate: activate,
  //   };
  // });

  return (
    <button type={type} className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
