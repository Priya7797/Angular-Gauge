(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<table>
				<tr>
					<td>Chart Title</td>
					<td><input id="chart_title" type="text"></td>
				</tr>
				<tr>
					<td>Chart Title Font Size</td>
					<td><input id="chart_title_fontsize" type="number" size="2" maxlength="2"></td>
				</tr>
				<tr>
				<td><B> Measurement 1 </B></td>
				</tr>
				<tr>
				<td><label for="fmin1">Minimum Value:</label></td>
				<td><input type="text" id="fmin1" name="min1"></td>
				</tr>
				<tr>
				<td><label for="fmax1">Maximum Value:</label></td>
				<td><input type="text" id="fmax1" name="max1"></td>
				</tr>
				<tr>
				<td><label for="factual1">Actual Value:</label></td>
				<td><input type="text" id="factual1" name="actual1"></td>
				</tr>

				<tr>
				<td> <B>Measurement 2 </B></td>
				</tr>
				<tr>
				<td><label for="fmin2">Minimum Value:</label></td>
				<td><input type="text" id="fmin2" name="min2"></td>
				</tr>
				<tr>
				<td><label for="fmax2">Maximum Value:</label></td>
				<td><input type="text" id="fmax2" name="max2"></td>
				</tr>
				<tr>
				<td><label for="factual2">Actual Value:</label></td>
				<td><input type="text" id="factual2" name="actual2"></td>
				</tr>

			</table>
			<input type="submit" style="display:none;">
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class RadialBarChartBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							titlefontsize: this.titlefontsize,
							min1: this.min1,
							max1: this.max1,
							actual1: this.actual1,
							min2: this.min2,
							max2: this.max2,
							actual2: this.actual2


						}
					}
			}));
		}



		set min1(newMin1) {
			this._shadowRoot.getElementById("fmin1").value = newMin1;
		}

		get min1() {
			return this._shadowRoot.getElementById("fmin1").value;
		}
		set max1(newMax1) {
			this._shadowRoot.getElementById("fmax1").value = newMax1;
		}

		get max1() {
			return this._shadowRoot.getElementById("fmax1").value;
		}
		set actual1(newActual1) {
			this._shadowRoot.getElementById("factual1").value = newActual1;
		}

		get actual1() {
			return this._shadowRoot.getElementById("factual1").value;
		}
		set min2(newMin2) {
			this._shadowRoot.getElementById("fmin2").value = newMin2;
		}

		get min2() {
			return this._shadowRoot.getElementById("fmin2").value;
		}
		set max2(newMax2) {
			this._shadowRoot.getElementById("fmax2").value = newMax2;
		}

		get max2() {
			return this._shadowRoot.getElementById("fmax2").value;
		}
		set actual2(newActual2) {
			this._shadowRoot.getElementById("factual2").value = newActual2;
		}

		get actual2() {
			return this._shadowRoot.getElementById("factual2").value;
		}
	


		set title(newTitle) {
			this._shadowRoot.getElementById("chart_title").value = newTitle;
		}

		get title() {
			return this._shadowRoot.getElementById("chart_title").value;
		}
		
		set titlefontsize(newTitleFontSize) {
			this._shadowRoot.getElementById("chart_title_fontsize").value = newTitleFontSize;
		}

		get titlefontsize() {
			return this._shadowRoot.getElementById("chart_title_fontsize").value;
		}
	}

	customElements.define("com-ipg2kor-sac-angulargauge-builder", RadialBarChartBuilderPanel);
})();
