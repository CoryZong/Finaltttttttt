import React, { useEffect, useState } from "react";
import "../css/main.css";
import Axios from "axios";
import { Tabs, Switch, Button } from "antd";
import "antd/dist/antd.css";
const { TabPane } = Tabs;
import { arrayMoveImmutable } from "array-move";

export default function App() {
  const [tabName, setTabName] = useState([]);
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    getTabName();
    getListItem();
  }, []);

  function getTabName() {
    Axios.get("http://localhost:3000/category")
      .then((res) => {
        setTabName(res.data);
      })
      .catch((error) => console.log(error));
  }
  function getListItem() {
    Axios.get("http://localhost:3000/reason")
      .then((res) => {
        setListItem(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="app-top">
        <h1>原因管理</h1>
        <Button type="primary" size="large" className="myBtn">
          新增原因
        </Button>
      </div>

      <div className="card-container">
        <Tabs type="card" className="myTabes" tabBarGutter="15px">
          {tabName.map((tab) => {
            return (
              <TabPane tab={tab.name} key={tab.id} className="myTabPane">
                <table>
                  <thead>
                    <tr>
                      <th>排序</th>
                      <th className="reason">原因項目</th>
                      <th>狀態</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItem.map((item, index) => {
                      return item.category == tab.id ? (
                        <tr key={item.id}>
                          <td>
                            <i className="fa-solid fa-bars" style={{ fontSize: "1.5rem" }}></i>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.status ? <Switch defaultChecked /> : <Switch />}</td>
                          <td>
                            <button style={{ color: "rgb(64, 163, 229)", backgroundColor: "white" }}>編輯</button>
                            <button style={{ color: "rgb(225, 56, 138)", backgroundColor: "white" }}>刪除</button>
                          </td>
                        </tr>
                      ) : (
                        ""
                      );
                    })}
                  </tbody>
                </table>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
