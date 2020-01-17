import React from "react";
import ReactDOM from "react-dom";
import { createSelector } from "reselect";
import DataTable from "../components/dataTable";
import DataChart from "../components/dataChart";

export const highLightClass = "bg-warning";

export const requestUrl = "http://localhost:888";

export const navTabs = [
  { label: "Daily events", path: "events/daily" },
  { label: "Hourly events", path: "events/hourly" },
  { label: "Daily stats", path: "stats/daily" },
  { label: "Hourly stats", path: "stats/hourly" }
];

export const detailViewScroller = { maxHeight: "25vh", overflowY: "auto", overflowX: "hidden" };

export const viewScroller = { maxHeight: "40vh", overflowY: "auto", overflowX: "hidden" };

export const legendHeight = "20%";

/*
 * #description when Load more... button is clicked, load additional number of rows
 */
export const rowsOfEachLoad = 100;

export const format = {
  name: arg => arg,
  date: arg => new Date(arg).toLocaleString("en-CA", { timeZone: "UTC" }),
  hour: arg => arg,
  events: arg => arg,
  impressions: arg => arg,
  clicks: arg => arg,
  revenue: arg => Math.round(arg)
};

export const stateKey = path => (path || "").replace(/^\//, "").replace(/\//g, "_");

export const fuzzySearch = (fuzzyInput, fuzzyWords) =>
  fuzzyWords
    .filter(fuzzyWord => Reflect.apply(fuzzyWord.fuzzyIsFound, null, [fuzzyInput]));

export const highLightSearchRows = id => {
  document.querySelectorAll(`div[data-poi-id]`)
    .forEach(row => {
      (row.dataset.poiId === "" + id && !row.classList.contains(highLightClass)) ? row.classList.add(highLightClass) : row.classList.remove(highLightClass);
    });
};

export const loadTableRows = (data, pois, loadStartIndex, highlight, domNode) => {
  const portal = document.createElement("div");
  domNode.appendChild(portal);
  ReactDOM.render(
    <DataTable data={data} highlight={highlight} loadStartIndex={loadStartIndex} pois={pois} />,
    portal
  );
};

export const loadChartRows = (data, loadStartIndex, calculator, domNode) => {
  const portal = document.createElement("div");
  domNode.appendChild(portal);
  ReactDOM.render(
    <DataChart data={data} loadStartIndex={loadStartIndex} calculator={calculator} />,
    portal
  );
};

export const getTabLabel = path => {
  const tab = navTabs.find(tab => tab.path === path);
  return !!tab ? tab.label : "Unknown label";
};

export const isControlColumn = key => /^date|hour$/i.test(key);

export const ignore = key => /^poi_id|lat|lon$/i.test(key);

export const isIntereted = key =>
  ["events", "impressions", "clicks", "revenue"].indexOf(key.toLowerCase()) >= 0;

/*
 * @description non-memoized selector to select simple state items from redux store state
 * @param {state} state the only arguement implicitly passed in by redux useSelector hook
 */
export const selectData = stateKey => state => state[stateKey] || [];

export const selectError = state => state.error || null;

export const selectPath = state => state.path || null;

export const selectHighlight = state => state.highlight || null;

/*
 * @description memoized selectors to read items from the state
 *  if arguments are not changed, cached result is returned instead of re-calculation
 *  performance wins
 */
export const selectPOIs = createSelector(
  selectData("everything"),
  data =>
    data
      .reduce((acc, cur) =>
        Reflect.has(acc, cur.poi_id) ? ({
          ...acc,
          [cur.poi_id]: {
            impressions: +cur.impressions + +acc[cur.poi_id].impressions,
            clicks: +cur.clicks + +acc[cur.poi_id].clicks,
            revenue: +cur.revenue + +acc[cur.poi_id].revenue,
            name: cur.name,
            poi_id: cur.poi_id,
            lat: cur.lat,
            lon: cur.lon
          }
        }) : ({
          ...acc,
          [cur.poi_id]: {
            impressions: +cur.impressions,
            clicks: +cur.clicks,
            revenue: +cur.revenue,
            name: cur.name,
            poi_id: cur.poi_id,
            lat: cur.lat,
            lon: cur.lon
          }
        }), {})
);

export const selectStatsPOI = createSelector(
  selectPOIs,
  pois =>
    Object.keys(pois)
      .map(key => pois[key])
);

export const buildFuzzyWords = createSelector(
  selectStatsPOI,
  data =>
    data
      .map(row => ({
        fuzzyIsFound: fuzzyInput => {
          const input = fuzzyInput.replace(/ /g, "");
          return input.length >= 2 && (new RegExp(Array.from(input).join(".*"), "i")).test(row.name);
        },
        text: row.name,
        id: row.poi_id
      }))
);

export const selectInterestCounts = (stateKey, pois) => createSelector(
  selectData(stateKey),
  data => {
    const counts = data
      .reduce((acc, cur) =>
        Reflect.has(acc, cur.poi_id) ? ({
          ...acc,
          [cur.poi_id]: {
            impressions: +cur.impressions || 0 + +acc[cur.poi_id].impressions,
            clicks: +cur.clicks || 0 + +acc[cur.poi_id].clicks,
            revenue: +cur.revenue || 0 + +acc[cur.poi_id].revenue,
            events: +cur.events || 0 + +acc[cur.poi_id].events
          }
        }) : ({
          ...acc,
          [cur.poi_id]: {
            impressions: +cur.impressions || 0,
            clicks: +cur.clicks || 0,
            revenue: +cur.revenue || 0,
            events: +cur.events || 0
          }
        }), {});

    return Object.keys(counts)
      .map(poi_id => ({
        ...counts[poi_id],
        revenue: Math.round(counts[poi_id].revenue),
        lat: pois[poi_id].lat,
        lon: pois[poi_id].lon,
        poi_id: poi_id
      }));
  }
);

export const selectInterestCountsByDateHour = (stateKey, date) => createSelector(
  selectData(stateKey),
  data =>
    data
      .filter(data => typeof data.hour !== "undefined" && data.date === date)
);

export const selectInterestCountsByDate = (stateKey) => createSelector(
  selectData(stateKey),
  data => {
    const dates = data
      .reduce((acc, cur) =>
        Reflect.has(acc, cur.date) ? ({
          ...acc, [cur.date]: [
            ...acc[cur.date], cur
          ]
        }) : ({
          ...acc,
          [cur.date]: [cur]
        }), {});

    return Object.keys(dates)
      .reduce((acc, date) => ({
        ...acc,
        [date]: dates[date]
          .reduce((acc, cur) =>
            Reflect.has(acc, cur.poi_id) ? ({
              ...acc,
              [cur.poi_id]: {
                impressions: +cur.impressions || 0 + +acc[cur.poi_id].impressions,
                clicks: +cur.clicks || 0 + +acc[cur.poi_id].clicks,
                revenue: +cur.revenue || 0 + +acc[cur.poi_id].revenue,
                events: +cur.events || 0 + +acc[cur.poi_id].events
              }
            }) : ({
              ...acc,
              [cur.poi_id]: {
                impressions: +cur.impressions || 0,
                clicks: +cur.clicks || 0,
                revenue: +cur.revenue || 0,
                events: +cur.events || 0
              }
            }), {})
      }), {});
  }
);