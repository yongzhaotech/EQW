import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../action";
import * as utils from "../utils";
import DetailView from "./detailView";
import POIChart from "./poiChart";
import DataTable from "./dataTable";
import Error from "./error";
import Tabs from "./tabs";
import "../style/scroll.css";

const View = () => {
	const dispatch = useDispatch(),
		loadStartIndex = useSelector(state => state.load_start_index),
		fuzzyInput = useSelector(state => state.fuzzy_input || ""),
		tableRef = React.useRef(null),
		path = useSelector(utils.selectPath),
		pois = useSelector(utils.selectPOIs),
		data = useSelector(utils.selectData("everything")),
		fuzzy = useSelector(utils.selectData("fuzzy")),
		highlight = useSelector(utils.selectHighlight),
		fuzzyWords = useSelector(utils.buildFuzzyWords),
		size = data.length,
		remainingRows = size - (loadStartIndex + utils.rowsOfEachLoad),
		allRowsAreRendered = remainingRows <= 0;

	React.useEffect(() => {
		dispatch(actions.fetchData("everything"));
	}, [dispatch]);

	return (
		<React.Fragment>
			<Error />
			<Tabs />
			{
				size > 0 && (
					<React.Fragment>
						<div className="row justify-content-start mt-5">
							<POIChart />
							<div className="w-100 p-2 mt-2 border-bottom"></div>
						</div >
						<React.Fragment>
							<div className="form-group row mt-3 mb-2">
								<label className="col-5 col-form-label">Enter part of a poi name to search <small>(minimum two characters, e.g. <strong>or</strong>):</small></label>
								<div className="col-2">
									<input
										className="form-control"
										maxLength={20}
										value={fuzzyInput}
										placeholder="fuzzy search"
										onChange={
											e => {
												dispatch(actions.setFuzzyInput(e.target.value));
												dispatch(actions.setFuzzy(utils.fuzzySearch(e.target.value, fuzzyWords)));
											}
										}
									/>
								</div>
								{
									fuzzy.length > 0 && (
										<div className="col-5 px-0">
											<button type="button" className="btn btn-link p-0" disabled style={{ opacity: 1, color: "#000000" }}>
												<small>Do you mean?</small>
											</button>
											{
												fuzzy
													.map(word => (
														<button
															key={word.id}
															type="button"
															className="btn btn-link"
															onClick={
																() => {
																	dispatch(actions.setHighlight(highlight !== word.id ? word.id : ""));
																	utils.highLightSearchRows(word.id);
																}
															}
														>
															<small>{word.text}</small>
														</button>
													))
											}
										</div>
									)
								}
							</div>
							<div className="row py-1">
								<div className="col-3  font-weight-bolder">Data table - all stats ({data.length})</div>
								{
									highlight && (
										<div className={`col`}>
											<span className={`badge badge-pill ${utils.highLightClass}`}>
												{pois[highlight].name} ({data.reduce((acc, cur) => cur.poi_id === highlight ? acc + 1 : acc, 0)} occurrences)
										</span>
										</div>
									)
								}
							</div>
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
							<div className="bg-light p-2" style={utils.viewScroller} ref={tableRef}>
								<div>
									<DataTable data={data} loadStartIndex={0} highlight={highlight} />
								</div>
							</div>
							<button
								type="button"
								className="btn btn-link"
								disabled={allRowsAreRendered}
								onClick={
									() => {
										dispatch(actions.loadMore(loadStartIndex + utils.rowsOfEachLoad));
										utils.loadTableRows(data, loadStartIndex + utils.rowsOfEachLoad, highlight, tableRef.current);
									}}
							>
								{allRowsAreRendered ? `All ${size} rows have been loaded` : `Load more (${remainingRows} remaining)...`}
							</button>
							<div className="w-100 p-2 border-bottom"></div>
							{path && <DetailView />}
						</React.Fragment>
					</React.Fragment >
				)
			}
		</React.Fragment>
	);
};

export default View;