/*global google*/
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../action";
import * as utils from "../utils";

const Map = React.memo(({ data }) => {
  const dispatch = useDispatch(),
    interests = Object.keys(data[0])
      .filter(key => utils.isIntereted(key)),
    interest = useSelector(state => state.interest);

  React.useEffect(() => {
    if (!interest) {
      dispatch(actions.setInterest(interests[0]));
    }
  }, []);


  React.useEffect(() => {
    if (interest && typeof google !== "undefined") {
      const EQToronto = new google.maps.LatLng(43.651070, -79.347015),
        heatMapData = [],
        map = new google.maps.Map(document.getElementById("indensity-map"), {
          center: EQToronto,
          zoom: 4,
          mapTypeId: "satellite"
        });

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
      });

      heatmap.setMap(map);
    }
  });

  return (
    <div className="modal fade" id="poi-map" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <div className="form-group">
                <select
                  className="form-control"
                  value={interest}
                  onChange={e => {
                    dispatch(actions.setInterest(e.target.value))
                  }}
                >
                  {
                    interests
                      .map(interest => (
                        <option key={interest} value={interest}>{interest}</option>
                      ))
                  }
                </select>
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