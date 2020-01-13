import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../action";
import * as utils from "../utils";

const Tabs = React.memo(() => {
  const dispatch = useDispatch(),
    data = useSelector(utils.selectData("everything")),
    path = useSelector(utils.selectPath),
    enableMap = Boolean(path);

  return (
    <div className="row justify-content-start fixed-top eq-tabs">
      {
        data.length ? (
          <ul className="nav nav-tabs mx-3">
            {
              utils.navTabs
                .map(tab => (
                  <li className="nav-item" key={tab.path}>
                    <a
                      className={`nav-link ${tab.path === path ? "active not-clickable" : ""}`}
                      href={tab.path}
                      onClick={
                        tab.path === path ? (e) => { e.preventDefault(); } : (e) => {
                          e.preventDefault();
                          dispatch(actions.setPath(tab.path));
                          dispatch(actions.fetchData(tab.path));
                          dispatch(actions.loadMoreByPath(utils.stateKey(tab.path), 0)); /** reduce row loading headache */
                          dispatch(actions.loadMoreChartByPath(utils.stateKey(tab.path), 0)); /** reduce row loading headache */
                        }
                      }
                    >
                      {tab.label}
                    </a>
                  </li>
                ))
            }
            <li className="nav-item">
              <a
                className={`nav-link ${enableMap ? "" : "not-clickable"}`}
                href="map"
                disabled={!enableMap}
                data-toggle="modal"
                data-target="#poi-map"
                onClick={
                  e => {
                    e.preventDefault();
                  }
                }
              >
                {enableMap ? `${utils.getTabLabel(path)} ` : ""}Map
							</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" disabled><small>20 requests allowed per second per ip</small></a>
            </li>
          </ul>
        ) : (
            <button
              type="button"
              className="btn btn-link"
              data-toggle="modal"
              data-target="#poi-map"
              onClick={() => { }}//window.location.reload(true)}
            >
              Reload
						</button>
          )
      }
    </div >
  );
});

export default Tabs;