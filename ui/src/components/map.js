/*global google*/
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../action";
import * as utils from "../utils";

const Map = React.memo(({ data, pois }) => {

  const dispatch = useDispatch(),
    path = useSelector(utils.selectPath),
    heatmap = useSelector(state => state.heatmap),
    interestedCounts = useSelector(utils.selectInterestCounts(utils.stateKey(path), pois)),
    interestedCountsByDate = useSelector(utils.selectInterestCountsByDate(utils.stateKey(path))),
    interests = Object.keys(data[0])
      .filter(key => utils.isIntereted(key)),
    interest = useSelector(state => state.interest),
    dates = Object.keys(interestedCountsByDate),
    date = useSelector(state => state.date),
    hours = useSelector(utils.selectInterestCountsByDateHour(utils.stateKey(path), date)),
    hour = useSelector(state => state.hour);

  React.useEffect(() => {
    if (interests.indexOf(interest) < 0) {
      dispatch(actions.setInterest(interests[0]));
    }
  });

  React.useEffect(() => {

    if (heatmap && interest && typeof google !== "undefined") {
      const EQToronto = new google.maps.LatLng(43.651070, -79.347015),
        map = new google.maps.Map(document.getElementById("indensity-map"), {
          center: EQToronto,
          zoom: 3,
          mapTypeId: "satellite"
        }),
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: interestedCounts.map(point => {
            let location = new google.maps.LatLng(point.lat, point.lon),
              weight = 0;
            if (date) {
              if (hour !== "") {
                const row = hours.find(row => row.poi_id === +point.poi_id && row.hour === +hour);

                if (!!row) {
                  weight = row[interest];
                }
              } else if (interestedCountsByDate[date][point.poi_id]) {
                weight = interestedCountsByDate[date][point.poi_id][interest];
              }
            } else {
              weight = point[interest];
            }
            return {
              location,
              weight
            }
          })
        });

      heatmap.setMap(map);
    }

  }, [interest, interestedCounts]);


  return (
    <div className="modal fade" id="poi-map" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <div className="form-group mb-0">
                {
                  interests.length === 1 ? (
                    <span className="font-weight-bolder">{interests[0]}</span>
                  ) : (
                      <select
                        className="form-control"
                        value={interest}
                        onChange={e => {
                          dispatch(actions.setInterest(e.target.value));
                          dispatch(actions.setInterestDate());
                          dispatch(actions.setInterestHour())
                        }}
                      >
                        {
                          interests
                            .map(interest => (
                              <option key={interest} value={interest}>{interest}</option>
                            ))
                        }
                      </select>
                    )
                }
                <select
                  className="form-control mt-1"
                  value={date}
                  onChange={e => {
                    dispatch(actions.setInterestDate(e.target.value));
                    dispatch(actions.setInterestHour())
                  }}
                >
                  <option value="">Select a date...</option>
                  {
                    dates
                      .map(date => (
                        <option key={date} value={date}>{utils.format.date(date)}</option>
                      ))
                  }
                </select>
                {
                  hours.length > 0 && (
                    <select
                      className="form-control mt-1"
                      value={hour}
                      onChange={e => {
                        dispatch(actions.setInterestHour(e.target.value))
                      }}
                    >
                      <option value="">Select an hour...</option>
                      {
                        hours
                          .map((hourRow, index) => (
                            <option key={index} value={hourRow.hour}>{hourRow.hour}</option>
                          ))
                      }
                    </select>
                  )
                }
              </div>
            </div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div id="indensity-map">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default Map;