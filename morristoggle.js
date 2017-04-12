
(function () {

    var morrisToggle = {};

    if (!window.morrisToggle) {
        window.morrisToggle = morrisToggle;
    }

    morrisToggle.Line = function (morrisConfigObj, drawSelectCheckBox) {
        return constructor("Line", morrisConfigObj, drawSelectCheckBox);
    };

    morrisToggle.Bar = function (morrisConfigObj, drawSelectCheckBox) {
        return constructor("Bar", morrisConfigObj, drawSelectCheckBox);
    };

    morrisToggle.Donut = function (morrisConfigObj) {
        return constructor("Donut", morrisConfigObj, false);
    };

    function constructor(morrisGraphType, morrisConfigObj, drawSelectCheckBox) {

        if (!morrisGraphType || !morrisConfigObj) {
            console.log("Please make sure morris obj is correct");
            return;
        }

        if (!Morris) {
            console.log("Missing morris.js");
            return;
        }

        function Graph(morrisGraphType, morrisConfigObj) {
            this.container = document.querySelector("#" + morrisConfigObj.element);
            this.containerSelect = document.querySelector("#_morrislineselectopt");
            if (this.containerSelect)
                this.containerSelect.remove();
            this.origData = morrisConfigObj.data;
            this.xkey = morrisConfigObj.xkey;
            this.origYKeys = morrisConfigObj.ykeys;

            this.labels = morrisConfigObj.labels;
            this.origLineColors = morrisConfigObj.lineColors;
            this.morris = Morris[morrisGraphType](morrisConfigObj);

            this.viewObject = [];
            for (var i = 0, iSize = morrisConfigObj.ykeys.length; i < iSize; i++) {
                var obj = {};
                obj.ykey = this.origYKeys[i];
                obj.color = this.origLineColors[i];
                obj.isVisible = true;

                this.viewObject.push(obj);
            }


        }

        var self = new Graph(morrisGraphType, morrisConfigObj);

        Graph.prototype.initSelectYKeys = function () {
            var keys = self.origYKeys,
                buttonsContainer = "";
            buttonsContainer = document.createElement("div"),
                buttonsContainer.setAttribute("id", "_morrislineselectopt");
            graphParentElem = this.container.parentNode;
            buttonsContainer.className = "buttonsContainer";
            buttonsContainer.setAttribute("data-parent-graph", this.container.id);

            for (var keyIndex in keys) {
                var currCheckBox = document.createElement('input'),
                    btnWrapper = document.createElement("span");
                btnWrapper.className = "yKeyButton";
                if (keys.hasOwnProperty(keyIndex)) {
                    currCheckBox.setAttribute("type", "checkbox");
                    currCheckBox.setAttribute("checked", "checked");
                    currCheckBox.checked = true;
                     currCheckBox.defaultChecked = true;
                    
                    currCheckBox.style.cursor = 'pointer';
                    btnWrapper.style.cursor = 'pointer';
                    currCheckBox.setAttribute("data-key-name", keys[keyIndex]);




                    currCheckBox.addEventListener("click", function (evt) {
                       
                         evt.preventDefault();
                    });


                    btnWrapper.addEventListener("click", function () {
                        var checkBoxElem = this.childNodes[0],
                            clickedKeyName = checkBoxElem.getAttribute("data-key-name");

                        if (clickedKeyName) {
                            if (checkBoxElem.checked) {

                                self.viewStateChange(clickedKeyName, false);
                            } else {

                                self.viewStateChange(clickedKeyName, true);
                            }

                            checkBoxElem.checked = !checkBoxElem.checked;
                            var newYKeys = [];
                            self.viewObject.forEach(function (ob) {
                                if (ob.isVisible) {
                                    newYKeys.push(ob.ykey);

                                }
                            });

                            self.setYKeys(newYKeys);
                        }
                    });

                    btnWrapper.appendChild(currCheckBox);
                    btnWrapper.appendChild(document.createTextNode("Display " + keys[keyIndex]));
                    buttonsContainer.appendChild(btnWrapper);
                  
                }
            }
            graphParentElem.insertBefore(buttonsContainer, this.container.nextSibling);
            this.buttonsContainer = buttonsContainer;
        };

        Graph.prototype.viewStateChange = function (ykey, state) {
           

            var objIndex = self.viewObject.map(function (e) { return e.ykey; }).indexOf(ykey);

            if (objIndex >= 0) {
                 
                self.viewObject[objIndex].isVisible = state;
            }
        };

        Graph.prototype.show = function () {
            this.container.style.display = 'inline-block';
        };

        Graph.prototype.hide = function () {
            this.container.style.display = 'none';
        };

        Graph.prototype.getMorrisObj = function () {
            return this.morris;
        };

        Graph.prototype.setData = function (data) {
            if (data && data.length > 0) {
                this.morris.setData(data);

                this.origData = data;
                this.setYKeys(this.origYKeys);
            }
        };

        Graph.prototype.setYKeys = function (yKeys) {
            var data = this.filterData(this.origData, yKeys);

            this.morris.setData(data);

        };

        Graph.prototype.filterData = function (data, yKeysToShow) {

            var resultObj = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var innerObj = data[key],
                        newObj = {},
                        isNewObjCreated = false;

                    for (var innerObjKey in innerObj) {
                        if (innerObj.hasOwnProperty(innerObjKey)) {
                            for (var i = 0, size = yKeysToShow.length; i < size; i++) {
                                if (this.xkey === innerObjKey || innerObjKey === yKeysToShow[i]) {
                                    newObj[innerObjKey] = data[key][innerObjKey];
                                    isNewObjCreated = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (isNewObjCreated) {
                        resultObj.push(newObj);
                    }
                }
            }

            return resultObj;
        };

        if (drawSelectCheckBox) {
            self.initSelectYKeys();
        }

        return self;
    }
}());
