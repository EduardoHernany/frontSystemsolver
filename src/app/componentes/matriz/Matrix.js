import React from 'react';

const MathMLMatrix = ({ matrix , div=true }) => {
  return (
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mrow>
        <mo>[</mo>
        {div == true ?
        <mtable>
          {matrix.map((row, rowIndex) => (
            <mtr key={rowIndex}>
              {row.map((value, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && colIndex === row.length - 1 ? (
                    <mo>|</mo>
                  ) : null}
                  <mtd>
                  <mn>{Number.isInteger(value) ? value : value.toFixed(2)}</mn>
                  </mtd>
                </React.Fragment>
              ))}
            </mtr>
          ))}
        </mtable>
        : 
        
        <mtable>
          {matrix.map((row, rowIndex) => (
            <mtr key={rowIndex}>
              {row.map((value, colIndex) => (
                <React.Fragment key={colIndex}>
                  <mtd>
                  <mn>{Number.isInteger(value) ? value : value.toFixed(2)}</mn>
                  </mtd>
                </React.Fragment>
              ))}
            </mtr>
          ))}
        </mtable>
        
        
        }
        <mo>]</mo>
      </mrow>
    </math>
  );
};

export default MathMLMatrix;
