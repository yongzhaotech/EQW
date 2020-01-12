export const FETCH_DATA = "FETCH_DATA";
export const SET_DATA = "SET_DATA";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_PATH = "SET_PATH";
export const SET_FUZZY = "SET_FUZZY";
export const SET_HIGHLIGHT = "SET_HIGHLIGHT";
export const SET_FUZZY_INPUT = "SET_FUZZY_INPUT";
export const SET_LOADING_INDICATOR = "SET_LOADING_INDICATOR";
export const LOAD_MORE_ROWS = "LOAD_MORE_ROWS";

/*
 * @description action creators
 */
export const fetchData = (path) => ({
  type: FETCH_DATA,
  path
});

export const setData = (stateKey, data = []) => ({
  type: `set_${stateKey}`,
  data: Array.isArray(data) ? data : []
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const setError = (error) => ({
  type: SET_ERROR,
  error
});

export const setPath = (path) => ({
  type: SET_PATH,
  path
});

export const setFuzzy = fuzzy => ({
  type: SET_FUZZY,
  fuzzy
});

export const setHighlight = id => ({
  type: SET_HIGHLIGHT,
  id
});

export const setFuzzyInput = input => ({
  type: SET_FUZZY_INPUT,
  input
});

export const loading = (bool = false) => ({
  type: SET_LOADING_INDICATOR,
  bool
});

export const loadMore = (index) => ({
  type: LOAD_MORE_ROWS,
  index
});

export const loadMoreByPath = (stateKey, index) => ({
  type: `load_more_rows_${stateKey}`,
  index
});

export const loadMoreChartByPath = (stateKey, index) => ({
  type: `chart_more_rows_${stateKey}`,
  index
});