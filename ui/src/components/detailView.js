import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../utils";
import * as actions from "../action";
import DataTable from "./dataTable";
import DataChart from "./dataChart";

const DetailView = React.memo(() => {
  const dispatch = useDispatch(),
    tableRef = React.useRef(null),
    chartRef = React.useRef(null),
    path = useSelector(utils.selectPath),
    pois = useSelector(utils.selectPOIs),
    data = useSelector(utils.selectData(utils.stateKey(path))),
    stateKey = utils.stateKey(path),
    loadStartIndex = useSelector(state => state[`load_start_index_${stateKey}`]),
    chartStartIndex = useSelector(state => state[`chart_start_index_${stateKey}`]),
    highlight = useSelector(utils.selectHighlight),
    size = data.length,
    remainingRows = size - (loadStartIndex + utils.rowsOfEachLoad),
    allRowsAreRendered = remainingRows <= 0,
    poiData = data.filter(row => row.poi_id === highlight),
    poiSize = poiData.length,
    remainingCharts = poiSize - (chartStartIndex + utils.rowsOfEachLoad),
    allChartsAreRendered = remainingCharts <= 0,
    viewId = path ? stateKey : "",
    chartCalculator = {
      events: [...poiData].sort((a, b) => +a.events - +b.events),
      clicks: [...poiData].sort((a, b) => +a.clicks - +b.clicks),
      impressions: [...poiData].sort((a, b) => +a.impressions - +b.impressions),
      revenue: [...poiData].sort((a, b) => +a.revenue - +b.revenue)
    };
  chartCalculator.max_events = chartCalculator.events.length ? chartCalculator.events[chartCalculator.events.length - 1].events : 0;
  chartCalculator.max_clicks = chartCalculator.clicks.length ? chartCalculator.clicks[chartCalculator.clicks.length - 1].clicks : 0;
  chartCalculator.max_impressions = chartCalculator.impressions.length ? chartCalculator.impressions[chartCalculator.impressions.length - 1].impressions : 0;
  chartCalculator.max_revenue = chartCalculator.revenue.length ? chartCalculator.revenue[chartCalculator.revenue.length - 1].revenue : 0;

  React.useEffect(() => {
    utils.enterView(viewId, data);
  });

  return data.length ? (
    <React.Fragment>
      {
        highlight && (
          <React.Fragment>
            <div className="col-12 pt-4 px-0">
              <div className="col">
                <span className={`badge badge-pill ${utils.highLightClass}`}>
                  <span className="font-weight-bolder">{pois[highlight].name}</span>{" "}
                  {utils.getTabLabel(path)} ({poiSize})
                </span>
              </div>
            </div>
            {
              poiSize > 0 && (
                <div className="col-12 pt-2 px-0">
                  <div className="row my-2">
                    {
                      Object.keys(poiData[0])
                        .map(key =>
                          utils.ignore(key) || key === "poi" ? null : (
                            <div className="col font-weight-bolder" key={key}>
                              {key}
                            </div>
                          ))
                    }
                  </div>
                  <div className="bg-light p-2" style={utils.detailViewScroller} ref={chartRef}>
                    <div>
                      <DataChart data={poiData} loadStartIndex={0} calculator={chartCalculator} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link"
                    disabled={allChartsAreRendered}
                    onClick={
                      () => {
                        dispatch(actions.loadMoreChartByPath(utils.stateKey(path), chartStartIndex + utils.rowsOfEachLoad));
                        utils.loadChartRows(data, chartStartIndex + utils.rowsOfEachLoad, chartCalculator, chartRef.current);
                      }}
                  >
                    {allChartsAreRendered ? `All ${poiSize} chart rows have been loaded` : `Load more (${remainingCharts} remaining)...`}
                  </button>
                </div>
              )
            }
          </React.Fragment>
        )
      }
      <div className="col-12 pt-4 px-0" id={viewId}>
        <div className="font-weight-bolder pb-2">Data table - {utils.getTabLabel(path)} ({data.length})</div>
        {
          <div className="row my-2">
            {
              Object.keys(data[0])
                .map(key =>
                  utils.ignore(key) ? null : (
                    <div className="col font-weight-bolder" key={key}>
                      {key}
                    </div>
                  ))
            }
          </div>
        }
        <div className="bg-light p-2" style={utils.detailViewScroller} ref={tableRef}>
          <div>
            <DataTable data={data} loadStartIndex={0} highlight={highlight} pois={pois} />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-link"
          disabled={allRowsAreRendered}
          onClick={
            () => {
              dispatch(actions.loadMoreByPath(utils.stateKey(path), loadStartIndex + utils.rowsOfEachLoad));
              utils.loadTableRows(data, pois, loadStartIndex + utils.rowsOfEachLoad, highlight, tableRef.current);
            }}
        >
          {allRowsAreRendered ? `All ${size} rows have been loaded` : `Load more (${remainingRows} remaining)...`}
        </button>
      </div>
    </React.Fragment >
  ) : null;
});

export default DetailView;