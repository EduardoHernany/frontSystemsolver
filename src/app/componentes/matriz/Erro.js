import React from 'react';

const Error = ({ num , numm}) => {
  return (
   
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mfrac>
        <mrow>
          <mi>||K{num} - K{numm}||∞</mi>
        </mrow>
        <mrow>
          <mi>||K{num}||∞</mi>
        </mrow>
      </mfrac>
    </math>
  );
};

export default Error;
