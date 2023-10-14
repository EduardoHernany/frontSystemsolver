import React from 'react';

const MatrixColumn = ({ vector= null, l }) => {
  return (
    <>{ vector === null  && l=== "y" ?
      <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mrow>
        <mo>[</mo>
          <mtable>
            <mtr >
                <mtd>
                <mn>y1</mn>
                </mtd>
            </mtr>
            <mtr >
              <mtd>
              <mn>y2</mn>
              </mtd>
            </mtr>
            <mtr >
              <mtd>
              <mn>y3</mn>
              </mtd>
            </mtr>
          </mtable>
        <mo>]</mo>
      </mrow>
    </math>

    : vector === null  && l=== "x" ?
<math xmlns="http://www.w3.org/1998/Math/MathML">
      <mrow>
        <mo>[</mo>
          <mtable>
            <mtr >
                <mtd>
                <mn>x1</mn>
                </mtd>
            </mtr>
            <mtr >
              <mtd>
              <mn>x2</mn>
              </mtd>
            </mtr>
            <mtr >
              <mtd>
              <mn>x3</mn>
              </mtd>
            </mtr>
          </mtable>
        <mo>]</mo>
      </mrow>
    </math>

    :

    
      <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mrow>
          <mo>[</mo>
          <mtable>
            {vector.map((value, index) => (
              <mtr key={index}>
                <mtd>
                  <mn>{value}</mn>
                </mtd>
              </mtr>
            ))}
          </mtable>
          <mo>]</mo>
        </mrow>
      </math>
}
    </>
  );
};

export default MatrixColumn;
