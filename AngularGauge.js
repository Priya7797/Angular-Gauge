/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */
 
(function() { 
	
	let _series1Color;
	let _chartTitle;
	let _chartTitleFontSize;
	const amchartscorejs = "https://cdn.amcharts.com/lib/4/core.js";
	const amchartschartsjs = "https://cdn.amcharts.com/lib/4/charts.js";
	const amchartsanimatedjs = "https://cdn.amcharts.com/lib/4/themes/animated.js"
	
	let template = document.createElement("template");
	template.innerHTML = `
		<div id="chartTitle" style=""></div><br/>
		<div id="chartdiv"></div>
	`;

	function loadScript(src) {
		return new Promise(function(resolve, reject) {
			let script = document.createElement('script');
			script.src = src;

			script.onload = () => {
				resolve(script);
			}
			script.onerror = () => reject(new Error(`Script load error for ${src}`));

			document.head.appendChild(script)
		});
	}
	
	class RadialBarChart extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
			this._firstConnection = 0;
		}
		
		connectedCallback() {
			if (this._firstConnection === 0) {
				async function LoadLibs(that) {
					try {
						await loadScript(amchartscorejs);
						await loadScript(amchartschartsjs);
						await loadScript(amchartsanimatedjs);
					} catch (e) {
						console.log(e);
					} finally {
						that._firstConnection = 1;
						that.loadthis();
					}
				}
				LoadLibs(this);
			}
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}
		
		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this._series1Color = changedProperties["color"];
			}
			if ("title" in changedProperties) {
				this._chartTitle = changedProperties["title"];
			}
			if ("titlefontsize" in changedProperties) {
				this._chartTitleFontSize = changedProperties["titlefontsize"];
			}
			if (this._firstConnection === 1) {
				this.loadthis();
			}
		}
		
		onCustomWidgetResize(width, height){
			if (this._firstConnection === 1) {
				this.loadthis();
			}
        }
		
		loadthis() {
			
			let myChart = this.shadowRoot.getElementById('chartdiv');
			myChart.style.height = this.shadowRoot.host.clientHeight - 20 + "px";
			myChart.style.width = this.shadowRoot.host.clientWidth - 20 + "px";
			
			if(this._chartTitle && this._chartTitle.trim() !== "") {
				var chartTitle = this.shadowRoot.getElementById('chartTitle');
				chartTitle.innerText = this._chartTitle.trim();
				if(this._chartTitleFontSize && this._chartTitleFontSize > 0) {
					chartTitle.style.fontSize = this._chartTitleFontSize + "px";
				}
				myChart.style.height = myChart.clientHeight - chartTitle.clientHeight - 10 + "px";
				myChart.style.top = chartTitle.clientHeight - 10 + "px"; 
			}
			
							// Themes begin
				am4core.useTheme(am4themes_animated);
				// Themes end

				// create chart
				var chart = am4core.create("chartdiv", am4charts.GaugeChart);
				chart.hiddenState.properties.opacity = 0;

				var axis = chart.xAxes.push(new am4charts.ValueAxis());

			if(this.datasourceString.trim() === "{}") {
				axis.min = 0;
				axis.max = 160;
			} else {
				var newDataSourceObj = JSON.parse(this.datasourceString);
				var newChartData = [];
				for(var i = 0; i < newDataSourceObj.length; i++) {
					var dimMemberID = newDataSourceObj[i].dimensions[0].member_id;
					var dimMemberDesc = newDataSourceObj[i].dimensions[0].member_description;
					var msrObj = newDataSourceObj[i].measure;
					if(!newChartData.find(x => x.category_id === dimMemberID)) {
						var newDataObject = {};
						newDataObject.category_id = dimMemberID;
						newDataObject.category = dimMemberDesc;
						newDataObject.measuredescriptions = [];
						newDataObject.measuredescriptions.push(msrObj.measure_description);
						newDataObject.value1 = msrObj.formattedValue;
						newChartData.push(newDataObject);
					} else {
						var existingObj = newChartData.find(x => x.category_id === dimMemberID);
						existingObj.measuredescriptions.push(msrObj.measure_description);
						var newProp = "value"+existingObj.measuredescriptions.length;
						existingObj[newProp] = msrObj.formattedValue;
					}
				}
				chart.data = newChartData;
			}
			
			
			axis.strictMinMax = true;
			axis.renderer.inside = true;
			//axis.renderer.ticks.template.inside = true;
			//axis.stroke = chart.colors.getIndex(3);
			axis.renderer.radius = am4core.percent(97);
			//axis.renderer.radius = 80;
			axis.renderer.line.strokeOpacity = 1;
			axis.renderer.line.strokeWidth = 5;
			axis.renderer.line.stroke = chart.colors.getIndex(0);
			axis.renderer.ticks.template.disabled = false
			axis.renderer.ticks.template.stroke = chart.colors.getIndex(0);
			axis.renderer.labels.template.radius = 35;
			axis.renderer.ticks.template.strokeOpacity = 1;
			axis.renderer.grid.template.disabled = true;
			axis.renderer.ticks.template.length = 10;
			axis.hiddenState.properties.opacity = 1;
			axis.hiddenState.properties.visible = true;
			axis.setStateOnChildren = true;
			axis.renderer.hiddenState.properties.endAngle = 180;
			
			var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
			axis2.min = 0;
			axis2.max = 240;
			axis2.strictMinMax = true;
			
			axis2.renderer.line.strokeOpacity = 1;
			axis2.renderer.line.strokeWidth = 5;
			axis2.renderer.line.stroke = chart.colors.getIndex(3);
			axis2.renderer.ticks.template.stroke = chart.colors.getIndex(3);
			
			axis2.renderer.ticks.template.disabled = false
			axis2.renderer.ticks.template.strokeOpacity = 1;
			axis2.renderer.grid.template.disabled = true;
			axis2.renderer.ticks.template.length = 10;
			axis2.hiddenState.properties.opacity = 1;
			axis2.hiddenState.properties.visible = true;
			axis2.setStateOnChildren = true;
			axis2.renderer.hiddenState.properties.endAngle = 180;
			
			var hand = chart.hands.push(new am4charts.ClockHand());
			hand.fill = axis.renderer.line.stroke;
			hand.stroke = axis.renderer.line.stroke;
			hand.axis = axis;
			hand.pin.radius = 14;
			hand.startWidth = 10;
			
			var hand2 = chart.hands.push(new am4charts.ClockHand());
			hand2.fill = axis2.renderer.line.stroke;
			hand2.stroke = axis2.renderer.line.stroke;
			hand2.axis = axis2;
			hand2.pin.radius = 10;
			hand2.startWidth = 10;
			
			setInterval(function() {
			  hand.showValue(Math.random() * 160, 1000, am4core.ease.cubicOut);
			  label.text = Math.round(hand.value).toString();
			  hand2.showValue(Math.random() * 160, 1000, am4core.ease.cubicOut);
			  label2.text = Math.round(hand2.value).toString();
			}, 2000);
			
			var legend = new am4charts.Legend();
			legend.isMeasured = false;
			legend.y = am4core.percent(100);
			legend.verticalCenter = "bottom";
			legend.parent = chart.chartContainer;
			legend.data = [{
			  "name": "Measurement #1",
			  "fill": chart.colors.getIndex(0)
			}, {
			  "name": "Measurement #2",
			  "fill": chart.colors.getIndex(3)
			}];
			
			legend.itemContainers.template.events.on("hit", function(ev) {
			  var index = ev.target.dataItem.index;
			
			  if (!ev.target.isActive) {
				chart.hands.getIndex(index).hide();
				chart.xAxes.getIndex(index).hide();
				labelList.getIndex(index).hide();
			  }
			  else {
				chart.hands.getIndex(index).show();
				chart.xAxes.getIndex(index).show();
				labelList.getIndex(index).show();
			  }
			});
			
			var labelList = new am4core.ListTemplate(new am4core.Label());
			labelList.template.isMeasured = false;
			labelList.template.background.strokeWidth = 2;
			labelList.template.fontSize = 25;
			labelList.template.padding(10, 20, 10, 20);
			labelList.template.y = am4core.percent(50);
			labelList.template.horizontalCenter = "middle";
			
			var label = labelList.create();
			label.parent = chart.chartContainer;
			label.x = am4core.percent(40);
			label.background.stroke = chart.colors.getIndex(0);
			label.fill = chart.colors.getIndex(0);
			label.text = "0";
			
			var label2 = labelList.create();
			label2.parent = chart.chartContainer;
			label2.x = am4core.percent(60);
			label2.background.stroke = chart.colors.getIndex(3);
			label2.fill = chart.colors.getIndex(3);
			label2.text = "0";

		}
	
	}

	customElements.define("com-bva4kor-sac-radialbarchart", RadialBarChart);
})();