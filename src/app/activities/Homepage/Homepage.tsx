import { Button, Card, Select, Table } from 'antd';
import * as React from 'react';

const { Option } = Select;

type HomepageProps = {
  classNames: any;
  image: string;
};

export default function Homepage(props: HomepageProps) {

  function renderTitle() {
    return (
      <div className='page-header'>
        <h2>ERP Generator</h2>
      </div>
    );
  };

  function renderExtra() {
    const {} = props;
    return (
      <div className='page-header-extra'>
        <Select defaultValue="Select Menu" style={{ width: 250 }}>
          <Option value="jack">PO Entry</Option>
          <Option value="lucy">Order Entry</Option>
          <Option value="Yiminghe">Item Master</Option>
        </Select>
      </div>
    );
  };

  function renderData() {
    return (
      <div></div>
    );
  };
  
  return (
    <div className={props.classNames.homepage}>
      <div className='container-fluid'>
        <div className='row bottom-padded-row page'>
          <div className='col-lg-12'>
            <Card size='small' title={renderTitle()} extra={renderExtra()}>
              <div className='card-container'>
                {renderData()}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
