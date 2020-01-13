"use strict";

const rateLimit = require("./ratelimit"),
  { Pool } = require("pg"),
  pool = new Pool(),
  query = {
    "/events/hourly": "SELECT poi_id, '' AS poi, date, hour, events FROM public.hourly_events ORDER BY date, hour",
    "/events/daily": "SELECT date, poi_id, '' AS poi, SUM(events) AS events FROM public.hourly_events GROUP BY date, poi_id ORDER BY date",
    "/stats/hourly": "SELECT poi_id, '' AS poi, date, hour, impressions, clicks, revenue FROM public.hourly_stats ORDER BY date, hour",
    "/stats/daily": "SELECT poi_id, '' AS poi, date, SUM(impressions) AS impressions, SUM(clicks) AS clicks, SUM(revenue) AS revenue FROM public.hourly_stats GROUP BY date, poi_id ORDER BY date",
    "/stats/poi": "SELECT poi_id, SUM(impressions) AS impressions, SUM(clicks) AS clicks, SUM(revenue) AS revenue FROM public.hourly_stats GROUP BY poi_id ORDER BY poi_id",
    "/poi": "SELECT * FROM public.poi",
    "/stats": "SELECT * FROM public.hourly_stats",
    "/events": "SELECT * FROM public.hourly_events",
    "/everything": `
			select 
				p.poi_id,
				p.name,
				p.lat,
				p.lon,
				h.date,
				h.hour,
				h.impressions,
				h.clicks,
				h.revenue
			from 
				public.poi p,
				public.hourly_stats h
			where
				p.poi_id=h.poi_id
			`
  };

const fetch = (path) => {
  return Reflect.has(query, path) ?
    pool
      .query(query[path])
      .then(promise => promise.rows)
      .catch(e => ({ error: `Error occured, try again later: ${e}` })) :
    Promise.reject({ error: `Invalid request: ${path}` });
};

exports.sql = {
  fetch
};