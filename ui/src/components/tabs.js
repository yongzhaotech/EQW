import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../action";
import * as utils from "../utils";

const Tabs = React.memo(() => {
	const dispatch = useDispatch(),
		data = useSelector(utils.selectData("everything")),
		path = useSelector(utils.selectPath);

	return (
		<div className="row justify-content-start fixed-top eq-tabs">
			{
				data.length ? (
					<ul className="nav nav-tabs mx-3">
						{
							utils.navTabs
								.map(tab => (
									<li className="nav-item" key={tab.path}>
										<a
											className={`nav-link ${tab.path === path ? "active" : ""}`}
											href={tab.path}
											onClick={
												tab.path === path ? (e) => { e.preventDefault(); } : (e) => {
													e.preventDefault();
													dispatch(actions.setPath(tab.path));
													dispatch(actions.fetchData(tab.path));
													dispatch(actions.loadMoreByPath(utils.stateKey(tab.path), 0)); /** reduce row loading headache */
													dispatch(actions.loadMoreChartByPath(utils.stateKey(tab.path), 0)); /** reduce row loading headache */
												}
											}
										>
											{tab.label}
										</a>
									</li>
								))
						}
					</ul>
				) : (
						<button
							type="button"
							className="btn btn-link"
							onClick={() => window.location.reload(true)}
						>
							Resend your request
						</button>
					)
			}
		</div >
	);
});

export default Tabs;