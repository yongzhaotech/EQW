import { combineReducers } from "redux";
import * as actions from "../action";

const events_hourly = (state = [], action) => {
  switch (action.type) {
    case "set_events_hourly":
      return action.data;
    default:
      return state;
  }
};

const events_daily = (state = [], action) => {
  switch (action.type) {
    case "set_events_daily":
      return action.data;
    default:
      return state;
  }
};

const everything = (state = [], action) => {
  switch (action.type) {
    case "set_everything":
      return action.data;
    default:
      return state;
  }
};

const stats_daily = (state = [], action) => {
  switch (action.type) {
    case "set_stats_daily":
      return action.data;
    default:
      return state;
  }
};

const stats_hourly = (state = [], action) => {
  switch (action.type) {
    case "set_stats_hourly":
      return action.data;
    default:
      return state;
  }
};

const events = (state = [], action) => {
  switch (action.type) {
    case "set_events":
      return action.data;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case actions.SET_ERROR:
      return action.error;
    case actions.CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};

const path = (state = "", action) => {
  switch (action.type) {
    case actions.SET_PATH:
      return action.path;
    default:
      return state;
  }
};

const fuzzy = (state = [], action) => {
  switch (action.type) {
    case actions.SET_FUZZY:
      return action.fuzzy;
    default:
      return state;
  }
};

const fuzzy_input = (state = "", action) => {
  switch (action.type) {
    case actions.SET_FUZZY_INPUT:
      return action.input;
    default:
      return state;
  }
};

const highlight = (state = "", action) => {
  switch (action.type) {
    case actions.SET_HIGHLIGHT:
      return action.id;
    default:
      return state;
  }
};

const is_loading = (state = false, action) => {
  switch (action.type) {
    case actions.SET_LOADING_INDICATOR:
      return action.bool;
    default:
      return state;
  }
};

const load_start_index = (state = 0, action) => {
  switch (action.type) {
    case actions.LOAD_MORE_ROWS:
      return action.index;
    default:
      return state;
  }
};

const load_start_index_stats_daily = (state = 0, action) => {
  switch (action.type) {
    case "load_more_rows_stats_daily":
      return action.index;
    default:
      return state;
  }
};

const load_start_index_stats_hourly = (state = 0, action) => {
  switch (action.type) {
    case "load_more_rows_stats_hourly":
      return action.index;
    default:
      return state;
  }
};

const load_start_index_events_daily = (state = 0, action) => {
  switch (action.type) {
    case "load_more_rows_events_daily":
      return action.index;
    default:
      return state;
  }
};

const load_start_index_events_hourly = (state = 0, action) => {
  switch (action.type) {
    case "load_more_rows_events_hourly":
      return action.index;
    default:
      return state;
  }
};

const chart_start_index_stats_daily = (state = 0, action) => {
  switch (action.type) {
    case "chart_more_rows_stats_daily":
      return action.index;
    default:
      return state;
  }
};

const chart_start_index_stats_hourly = (state = 0, action) => {
  switch (action.type) {
    case "chart_more_rows_stats_hourly":
      return action.index;
    default:
      return state;
  }
};

const chart_start_index_events_daily = (state = 0, action) => {
  switch (action.type) {
    case "chart_more_rows_events_daily":
      return action.index;
    default:
      return state;
  }
};

const chart_start_index_events_hourly = (state = 0, action) => {
  switch (action.type) {
    case "chart_more_rows_events_hourly":
      return action.index;
    default:
      return state;
  }
};

const interest = (state = "", action) => {
  switch (action.type) {
    case actions.SET_INTEREST:
      return action.interest;
    default:
      return state;
  }
};

const date = (state = "", action) => {
  switch (action.type) {
    case actions.SET_INTEREST_DATE:
      return action.date;
    default:
      return state;
  }
};

const hour = (state = "", action) => {
  switch (action.type) {
    case actions.SET_INTEREST_HOUR:
      return action.hour;
    default:
      return state;
  }
};

const heatmap = (state = false, action) => {
  switch (action.type) {
    case actions.HEAT_MAP:
      return action.render;
    default:
      return state;
  }
};

const RootReducer = combineReducers({
  error,
  everything,
  events,
  events_daily,
  events_hourly,
  stats_daily,
  stats_hourly,
  path,
  fuzzy,
  highlight,
  fuzzy_input,
  is_loading,
  interest,
  date,
  hour,
  heatmap,
  load_start_index,
  load_start_index_stats_daily,
  load_start_index_stats_hourly,
  load_start_index_events_daily,
  load_start_index_events_hourly,
  chart_start_index_stats_daily,
  chart_start_index_stats_hourly,
  chart_start_index_events_daily,
  chart_start_index_events_hourly
});

export default RootReducer;