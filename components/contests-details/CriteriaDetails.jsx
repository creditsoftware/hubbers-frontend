import React from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
export const CriteriaDetails = props => {
  const [titleNum, setTitleNum] = React.useState(0);
  const titleNumChange = (num) => {
    setTitleNum(num);
  };
  return (
    <React.Fragment>
      <div className="bg-white w-100 p-5" style={{ borderTop: '1px solid #bbb' }}>
        <p>To win the contest, the products must adhere to the following {props.data.criterias.length} criteria.</p>
        <p>The Awards judges will evaluate entries based on how the product performs according to the requirements of the specific contest.</p>
      </div>
      {
        props.data.criterias.map((item, index) => {
          return <div key={index}>
            <div
              onClick={()=>{titleNumChange(index);}}
              style={{
                cursor: 'pointer',
                color: 'white',
                padding: '24px',
                backgroundColor: titleNum == index ? '#333' : '#75AC2A'
              }}
            >
              {titleNum == index ? <MinusOutlined /> : <PlusOutlined /> }
              &nbsp;&nbsp;&nbsp;{item.title}
            </div>
            {
              titleNum == index ? <div className="bg-white p-5" dangerouslySetInnerHTML={{__html: item.description}}></div> : null
            }
          </div>;
        })
      }
      <div className="w-100 p-5" style={{ backgroundColor: 'rgb(255 252 247)' }}>
        <h1>* SOME FRIENDLY RECOMMENDATIONS:</h1>
        <p>hubbers.io is not the one choosing the winner. (see Contest Policy), the winning contestant is chosen by the Hubbers community. However, let us give you some advice to help increase your chances to win this contest. We recommend all Contestants and Award Judges to read the article of “Tips for Contestants”.</p>
        <p>- The challenge of this contest is to create a beautiful piece of furniture with an interesting and functional, connected design. Take note all parts of this sentence! We are looking for it all in one piece, not just part of the solution.</p>
        <p>- Connected Function(s) can be something that exists already or you are free to create something completely new. Our community welcomes new ideas with open arms, however, we ask you not to propose technologies that are beyond capabilities (time travel does not exist...)</p>
        <p>- Entries with classic or existing connected functions can be interesting, but they should offer some kind of innovation at least in the area of design, or those products will have trouble winning this challenge.</p>
      </div>
    </React.Fragment>
  );
};