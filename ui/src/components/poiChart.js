import React from "react";
import { useSelector } from "react-redux";
import * as utils from "../utils";

const POIChart = React.memo(() => {
	const assets = useSelector(utils.selectStatsPOI),
		pois = useSelector(utils.selectPOIs),
		clicks = [...assets].sort((a, b) => +a.clicks - +b.clicks),
		impressions = [...assets].sort((a, b) => +a.impressions - +b.impressions),
		revenue = [...assets].sort((a, b) => +a.revenue - +b.revenue),
		maxClick = clicks.length ? clicks[clicks.length - 1].clicks : 0,
		maxImpression = impressions.length ? impressions[impressions.length - 1].impressions : 0,
		maxRevenue = revenue.length ? revenue[revenue.length - 1].revenue : 0;

	return assets.length ? (
		<React.Fragment>
			<div className="col-4 pt-3">
				<h6 className="mx-3">Clicks</h6>
				{
					clicks
						.map(asset => (
							<React.Fragment key={asset.poi_id}>
								<div className="col-12 my-1 pt-1" style={{ height: utils.legendHeight }}>
									<div className="bg-info" style={{ height: utils.legendHeight, width: `${(+asset.clicks / +maxClick) * 100}%` }}>
										<small className="mx-1">{pois[asset.poi_id] ? pois[asset.poi_id].name : ""} ({asset.clicks})</small>
									</div>
								</div>
							</React.Fragment>
						))
				}
			</div>
			<div className="col-4 pt-3">
				<h6 className="mx-3">Impressions</h6>
				{
					impressions
						.map(asset => (
							<React.Fragment key={asset.poi_id}>
								<div className="col-12 my-1 pt-1" style={{ height: utils.legendHeight }}>
									<div className="bg-danger" style={{ height: utils.legendHeight, width: `${(+asset.impressions / +maxImpression) * 100}%` }}>
										<small className="mx-1">{pois[asset.poi_id] ? pois[asset.poi_id].name : ""} ({asset.impressions})</small>
									</div>
								</div>
							</React.Fragment>
						))
				}
			</div >
			<div className="col-4 pt-3">
				<h6 className="mx-3">Revenue</h6>
				{
					revenue
						.map(asset => (
							<React.Fragment key={asset.poi_id}>
								<div className="col-12 my-1 pt-1" style={{ height: utils.legendHeight }}>
									<div className="bg-success" style={{ height: utils.legendHeight, width: `${(+asset.revenue / +maxRevenue) * 100}%` }}>
										<small className="mx-1">{pois[asset.poi_id] ? pois[asset.poi_id].name : ""} ({Math.round(asset.revenue)})</small>
									</div>
								</div>
							</React.Fragment >
						))
				}
			</div >
		</React.Fragment >
	) : null;
});

export default POIChart;
