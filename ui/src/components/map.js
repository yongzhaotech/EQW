import React from "react";

const Map = React.memo(({ data }) => (
  <div className="modal fade" id="poi-map" tabIndex={-1} role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="photo-modal-title">Click a poi</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="poi-map">
            {
              data
                .map(row => (
                  <div className={`poi-${row.poi_id}`} tabindex="0" data-toggle="tooltip" title="Disabled tooltip">
                    {" "}
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default Map;