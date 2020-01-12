import React from "react";
import * as utils from "../utils";

/*
 * @description memoization of this heavy component to enhance performance
 * 	load fixed number of rows per click on Load more... button
 */
const DataTable = React.memo(({ data, loadStartIndex, calculator }) => (
	<React.Fragment>
		{
			data.slice(loadStartIndex, loadStartIndex + utils.rowsOfEachLoad)
				.map((row, idx) => (
					<div className={`row py-1 ${(idx % 2) ? "bg-white" : ""}`} key={idx}>
						{
							Object.keys(row)
								.map(key =>
									utils.ignore(key) || key === "poi" ? null : (
										<div className="col" key={key}>
											<div className={`${utils.isControlColumn(key) ? "" : "bg-success"}`} style={{ height: utils.legendHeight, width: `${utils.isControlColumn(key) ? "100%" : `${(+row[key] / +calculator[`max_${key}`]) * 100}%`}` }}>
												<small className="mx-1">{Reflect.apply(utils.format[key], null, [row[key]])}</small>
											</div>
										</div>
									))
						}
					</div>
				))
		}
	</React.Fragment>
));

export default DataTable;