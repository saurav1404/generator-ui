import { Button, Card, Checkbox, Drawer, Input, Select, Table } from 'antd';
import * as React from 'react';
import {useEffect, useState}  from 'react';
import axios from 'axios';
import * as _ from "lodash";

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

type HomepageProps = {
  classNames: any;
  image: string;
};

export default function Homepage(props: HomepageProps) {

  const [menus, setMenus] = useState([]);
  const list = [];
  const [apis, setApi] = useState([]);
  const apiList = [];
  const [columns, setColumn] = useState([]);
  const columnList = [];
  const [config, setConfig] = useState([]);
  const configList = [];

  const [visible, setVisible] = useState(false);
  const [swagger, setSwagger] = useState({});
  const [selectedUrl, setSelectedUrl] = useState('Select Url');
  const [json, setJson] = useState({
    columns: []
  });
  const [properties, setProperty] = useState([]);

  const types = [
    'text', 
    'password',
    'file',
    'dropdown',
    'checkbox',
    'radio',
    'number',
    'decimal',
    'lookup',
    'readonly'
  ]

  useEffect(() => {
    getMenu();
    getApiEndPoint();
    checkConfig();
  }, [props]);

  function getMenu(){
    axios.get(`http://localhost:3002/menu`).then(res => {
      findNodeMenus(res.data.data);
    });
  };

  function checkConfig(){
    let config = JSON.parse(localStorage.getItem('config'));
    if(config){
      setTimeout(() => setConfig(config), 1000);
    }
  }

  function getApiEndPoint(){
    axios.get(`http://localhost:3002/swagger`).then(res => {
      findApi(res.data.data);
    })
  };

  function findNodeMenus(data: any){
    _.forEach(data, function(menu: any){
      if(menu.level === 3 && menu.nodes.length === 0){
        let obj = {
          id: menu.id,
          title: menu.title
        };
        list.push(obj);
        setTimeout(() => setMenus(list) ,1000);
      }else{
        findNodeMenus(menu.nodes);
      }
    })
  };

  function findApi(data: any){
    setSwagger(data);
    let dataWithGets = _.filter(data.paths, function(o){return _.includes(_.keys(o), 'get')});
    let id = 1;
    _.forEach(dataWithGets, function(value){
      var getApi = value['get'];
      if(getApi.tags.length > 0){
        if(getApi.responses[200]){
          let reference = getApi.responses[200].schema.$ref || (getApi.responses[200].schema.items && getApi.responses[200].schema.items.$ref);
          if(reference){
            let parts = reference.split(/[[\]]{1,2}/);
            parts.length--;
            let definition = _.last(parts);
            if(definition){
              if(!_.includes(["Boolean", "Int32", "Guid", "String", "Decimal", "Object", undefined, "", ], definition)){
                apiList.push({
                  id: id,
                  parameters: getApi.parameters,
                  definition: definition,
                  url: getApi.tags[0]
                });
                id++;
                setTimeout(() => setApi(apiList) ,1000);
              }
            }else{
              let parts = reference.split('/');
              definition = _.last(parts);
              apiList.push({
                id: id,
                parameters: getApi.parameters,
                definition: definition,
                url: getApi.tags[0]
              });
              id++;
              setTimeout(() => setApi(apiList) ,1000);
            }
          }
        }
      }
    })
  };

  function createGUID(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  function handleMenuChange(value){
    let menu = _.find(menus, function(o){return o.id === value});
    if(config){
      var selectedConfig = _.find(config, function(o){return o.id === menu.id});
      if(selectedConfig){
        menu = selectedConfig;
        setJson(menu);
        setTimeout(() => setColumn(menu.columns) ,1000);
      }else{
        menu.columns = [];
        setJson(menu);
        setTimeout(() => setColumn([]) ,1000);
      }
    }else{
      menu.columns = [];
      setJson(menu);
      setTimeout(() => setColumn([]) ,1000);
    }
  };

  function handleApiChange (value){
    let apiObject = _.find(apis, function(o){return o.id === value});
    var selectedDefinition = _.find(swagger.definitions, function(o, key){return key === apiObject.definition});
    if(selectedDefinition.properties){
      json.properties = {
        api: apiObject
      }
      setTimeout(() => setJson(json) ,1000);
      setProperty(_.keys(selectedDefinition.properties))
    }
  };

  function openSetting(){
    setVisible(true);
    if(config){
      var selectedConfig = _.find(config, function(o){return o.id === json.id});
      if(selectedConfig){
        setTimeout(() => setSelectedUrl(selectedConfig.properties.api.id) ,1000);
        let apiObject = _.find(apis, function(o){return o.id === selectedConfig.properties.api.id});
        var selectedDefinition = _.find(swagger.definitions, function(o, key){return key === apiObject.definition});
        if(selectedDefinition.properties){
          json.properties = {
            api: apiObject
          }
          setTimeout(() => setJson(json) ,1000);
          setProperty(_.keys(selectedDefinition.properties))
        }
      }
    }
  };

  function onClose(){
    setVisible(false);
    //setTimeout(() => setApi([]) ,1000);
  };

  function onAddColumn(list:any){
    _.forEach(list, function(value){
      var obj = {
        id: createGUID(),
        title: value,
        visible: false,
        label: '',
        type: '',
        dataIndex: value
      }
      obj.key = obj.id;
      columnList.push(obj);
      setTimeout(() => setColumn(columnList) ,1000);
      let index = _.findIndex(json.columns, function(o){ return o.title === obj.title });
      if(index < 0){
        json.columns.push(obj);
      }
    })
    setTimeout(() => setJson(json) ,1000);
  };

  function handleColumnChange(value, label, e){
    if(label === 'label'){
      value[label] = e.target.value;
    }
    if(label === 'visible'){
      value[label] = e.target.checked;
    }
    if(label === 'type'){
      value[label] = e;
    }
  };

  function saveGridInfo(){
    json.columns = columns;
    if(config){
      _.assign(configList, config);
      var existingConfigIndex = _.findIndex(config, function(o){ return o.id === json.id});
      if(existingConfigIndex >= 0){
        configList[existingConfigIndex] = json;
        setTimeout(() => setConfig(configList) ,1000);
        localStorage.setItem('config', JSON.stringify(configList));
      }else{
        configList.push(json);
        setTimeout(() => setConfig(configList) ,1000);
        localStorage.setItem('config', JSON.stringify(configList));
      }
    }else{
      configList.push(json);
      setTimeout(() => setConfig(configList) ,1000);
      localStorage.setItem('config', JSON.stringify(configList));
    }
    setVisible(false);
  };

  function saveConfig(){
    let config = JSON.parse(localStorage.getItem('config'));
    if(config){
      axios.put(`https://api.myjson.com/bins/pr03x`, config).then(function(res){
        console.log(res);
      });
    }
  }

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
      <Button type="primary" onClick={saveConfig} style={{marginRight: '10px'}}>Save</Button>
        <Select defaultValue="Select Menu" style={{ width: 250 }} onChange={handleMenuChange}>
          {menus &&
            menus.map((menu, index) => {
              return <Option key={index} value={menu.id}>{menu.title}</Option>
            })
          }
        </Select>
      </div>
    );
  };

  function renderData() {
    return (
      <div>
        {json && json.id &&
          <div>
            <div className='card-header'>
              <h3>{json.title}</h3>
              <div className="card-setting">
                <Button type="primary" shape="circle" icon="setting" onClick={openSetting}/>
              </div>
            </div>
            <Table columns={columns} />
          </div>
        }
        <Drawer
          title="Table Setting"
          placement="left"
          closable={true}
          maskClosable={false}
          width={500}
          onClose={onClose}
          visible={visible}
        >
          {renderDrawer()}
        </Drawer>
      </div>
    );
  };


  function renderDrawer(){
    return (
      <div>
        <div className="setting-group">
          <Select defaultValue={selectedUrl} style={{ width: '100%'}} onChange={handleApiChange}>
            {apis &&
              apis.map((api, index) => {
                return <Option value={api.id} key={index}>{api.url}</Option>
              })
            }
          </Select>
        </div>
        <div className="setting-group">
          <CheckboxGroup
            options={properties}
            onChange={onAddColumn}
          />
        </div>
        <div className="setting-group">
          {columns.map((column, index) => {
            return <Card key={index} title={column.title} bordered={true} style={{ width: '100%', marginBottom: '10px' }}>
              <div className ="input-group">
                <Input placeholder="Label" defaultValue={column.label} name={"label"+index} onChange={(e) => handleColumnChange(column, "label", e)}/>
              </div>
              <div className ="input-group">
                <Checkbox name={"visible"+index} checked={column.visible} onChange={(e) => handleColumnChange(column, "visible", e)}>Visible</Checkbox>
              </div>
              <div className ="input-group">
              <Select defaultValue="Select Type" defaultValue={column.type} name={"type"+index} style={{ width: '100%'}} onChange={(e) => handleColumnChange(column, "type", e)}>
                {types.map((type, index) => {
                    return <Option value={type} key={index}>{type}</Option>
                  })
                }
              </Select>
              </div>
            </Card>
          })
          }
        </div>
        <div className="setting-group bottom-group">
        <Button type="primary" onClick={saveGridInfo}>Save</Button>
        </div>
      </div>
    );
  }
  
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
