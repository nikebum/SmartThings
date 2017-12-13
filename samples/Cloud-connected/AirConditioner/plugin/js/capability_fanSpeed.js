/*
 * Copyright (c) 2015 - 2017 Samsung Electronics Co., Ltd All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var capabilityFanspeed = {
	'href' : "/capability/fanSpeed/main/0",

	'update' : function() {
		ocfDevice.getRemoteRepresentation(this.href, this.onRepresentCallback);
	},

	'onRepresentCallback' : function(result, deviceHandle, uri, rcsJsonString) {
		scplugin.log.debug(className, arguments.callee.name, result);
		scplugin.log.debug(className, arguments.callee.name, uri);

		if (result == "OCF_OK" || result == "OCF_RESOURCE_CHANGED" || result == "OCF_RES_ALREADY_SUBSCRIBED") {
			if (rcsJsonString["fanSpeed"] <= 25)
				document.getElementById("fanSpeed").innerHTML = "Sleep";
			else if (rcsJsonString["fanSpeed"] <= 50)
				document.getElementById("fanSpeed").innerHTML = "Low";
			else if (rcsJsonString["fanSpeed"] <= 75)
				document.getElementById("fanSpeed").innerHTML = "Medium";
			else
				document.getElementById("fanSpeed").innerHTML = "High";
		}
	},

	'set' : function(speed) {
		scplugin.log.debug(className, arguments.callee.name, "speed : " + speed);
		var setRcsJson = {};

		if (speed == "high")
			setRcsJson["fanSpeed"] = 100;
		else if (speed == "medium")
			setRcsJson["fanSpeed"] = 75;
		else if (speed == "low")
			setRcsJson["fanSpeed"] = 50;
		else
			setRcsJson["fanSpeed"] = 25;

		ocfDevice.setRemoteRepresentation(this.href, setRcsJson, this.onRepresentCallback);
		this.closeListbox();
	},

	'closeListbox' : function() {
		var list = document.getElementsByClassName("listbox-content");
		var i;
	  for (i = 0; i < list.length; i++) {
	    var openList = list[i];
	    if (openList.classList.contains('show')) {
	      openList.classList.remove('show');
	    }
	  }
	}
}
