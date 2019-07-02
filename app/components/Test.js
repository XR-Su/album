/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';

const Test = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>count: {count}</p>
      <button type="button" onClick={()=>setCount(count + 1)}>add</button>
    </div>
  );
};

export default Test;
