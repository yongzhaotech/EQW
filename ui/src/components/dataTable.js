import React from "react";
import * as utils from "../utils";

/*
 * @description memoization of this heavy component to enhance performance
 * 	load fixed number of rows per click on Load more... button
 */
const DataTable = React.memo(({ highlight, data, loadStartIndex, pois }) => (
	<React.Fragment>
		{
			data.slice(loadStartIndex, loadStartIndex + utils.rowsOfEachLoad)
				.map((row, index) => (
					<div className={`row mt-1 ${row.poi_id === highlight ? utils.highLightClass : ""}`} key={index} data-poi-id={row.poi_id}>
						{
							Object.keys(row)
								.map(key =>
									utils.ignore(key) ? null : (
										<div className="col" key={key}>
											<small>{key === "poi" ? pois[row.poi_id].name : Reflect.apply(utils.format[key], null, [row[key]])}</small>
										</div>
									))
						}
					</div>
				))
		}
	</React.Fragment>
));

export default DataTable;